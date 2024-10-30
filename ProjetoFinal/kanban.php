<?php
// Configuração inicial do banco de dados
$rootHost = 'localhost';
$rootUser = 'root';
$rootPass = ''; // Senha do root do seu MySQL/MariaDB

// Primeiro, conectar como root
$rootConn = new mysqli($rootHost, $rootUser, $rootPass);

if ($rootConn->connect_error) {
    die("Conexão root falhou: " . $rootConn->connect_error);
}

// Criar banco de dados se não existir
$rootConn->query("CREATE DATABASE IF NOT EXISTS kanban_db");

// Criar usuário se não existir
$rootConn->query("CREATE USER IF NOT EXISTS 'david'@'localhost' IDENTIFIED BY 'kanban1234'");

// Garantir privilégios
$rootConn->query("GRANT ALL PRIVILEGES ON kanban_db.* TO 'david'@'localhost'");
$rootConn->query("FLUSH PRIVILEGES");

// Selecionar o banco de dados
$rootConn->select_db('kanban_db');

// Criar tabela se não existir
$rootConn->query("CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    priority ENUM('low', 'medium', 'high') NOT NULL,
    status ENUM('todo', 'doing', 'done') NOT NULL DEFAULT 'todo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");

$rootConn->close();

// Conectar com o usuário normal
$conn = new mysqli('localhost', 'david', 'kanban1234', 'kanban_db');

// Processar formulário de adição de tarefa
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    if ($_POST['action'] === 'add' && isset($_POST['title']) && isset($_POST['priority'])) {
        $stmt = $conn->prepare("INSERT INTO tasks (title, priority, status) VALUES (?, ?, 'todo')");
        $stmt->bind_param("ss", $_POST['title'], $_POST['priority']);
        $stmt->execute();
        $stmt->close();
        header('Location: ' . $_SERVER['PHP_SELF']);
        exit();
    }
    
    if ($_POST['action'] === 'delete' && isset($_POST['id'])) {
        $stmt = $conn->prepare("DELETE FROM tasks WHERE id = ?");
        $stmt->bind_param("i", $_POST['id']);
        $stmt->execute();
        $stmt->close();
        header('Location: ' . $_SERVER['PHP_SELF']);
        exit();
    }
    
    if ($_POST['action'] === 'update' && isset($_POST['id']) && isset($_POST['status'])) {
        $stmt = $conn->prepare("UPDATE tasks SET status = ? WHERE id = ?");
        $stmt->bind_param("si", $_POST['status'], $_POST['id']);
        $stmt->execute();
        $stmt->close();
        exit();
    }
}

// Buscar tarefas do banco de dados
$tasks = [];
$columns = ['todo' => [], 'doing' => [], 'done' => []];

$result = $conn->query("SELECT * FROM tasks ORDER BY created_at DESC");
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $columns[$row['status']][] = $row;
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kanban Board</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
        }

        .board {
            display: flex;
            gap: 20px;
            margin-top: 20px;
        }

        .column {
            flex: 1;
            background-color: #e2e2e2;
            border-radius: 5px;
            padding: 10px;
            min-height: 500px;
        }

        .column-header {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            padding: 10px;
            background-color: #fff;
            border-radius: 3px;
        }

        .task {
            background-color: #fff;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 3px;
            cursor: move;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .task.low-priority {
            border-left: 5px solid #4CAF50;
        }

        .task.medium-priority {
            border-left: 5px solid #FFC107;
        }

        .task.high-priority {
            border-left: 5px solid #f44336;
        }

        .new-task-form {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
        }

        input, select, button {
            padding: 8px;
            margin: 5px;
        }

        button {
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        }

        button:hover {
            background-color: #45a049;
        }

        .delete-btn {
            float: right;
            background-color: #f44336;
            color: white;
            border: none;
            border-radius: 3px;
            padding: 2px 6px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="new-task-form">
        <form method="POST">
            <input type="hidden" name="action" value="add">
            <input type="text" name="title" placeholder="Título da tarefa" required>
            <select name="priority">
                <option value="low">Baixa Prioridade</option>
                <option value="medium">Média Prioridade</option>
                <option value="high">Alta Prioridade</option>
            </select>
            <button type="submit">Adicionar Tarefa</button>
        </form>
    </div>

    <div class="board">
        <?php foreach ($columns as $status => $tasks): ?>
        <div class="column" id="<?php echo $status; ?>">
            <div class="column-header">
                <?php
                echo $status === 'todo' ? 'A Realizar' : 
                    ($status === 'doing' ? 'Em Andamento' : 'Feito');
                ?>
            </div>
            <?php foreach ($tasks as $task): ?>
                <div class="task <?php echo $task['priority']; ?>-priority" 
                     id="task-<?php echo $task['id']; ?>" 
                     draggable="true">
                    <?php echo htmlspecialchars($task['title']); ?>
                    <form method="POST" style="display:inline;">
                        <input type="hidden" name="action" value="delete">
                        <input type="hidden" name="id" value="<?php echo $task['id']; ?>">
                        <button type="submit" class="delete-btn">×</button>
                    </form>
                </div>
            <?php endforeach; ?>
        </div>
        <?php endforeach; ?>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const tasks = document.querySelectorAll('.task');
            const columns = document.querySelectorAll('.column');

            tasks.forEach(task => {
                task.addEventListener('dragstart', dragStart);
                task.addEventListener('dragend', dragEnd);
            });

            columns.forEach(column => {
                column.addEventListener('dragover', dragOver);
                column.addEventListener('drop', drop);
            });
        });

        function dragStart(e) {
            e.dataTransfer.setData('text/plain', e.target.id);
            e.target.classList.add('dragging');
        }

        function dragEnd(e) {
            e.target.classList.remove('dragging');
        }

        function dragOver(e) {
            e.preventDefault();
        }

        function drop(e) {
            e.preventDefault();
            const id = e.dataTransfer.getData('text/plain');
            const draggable = document.getElementById(id);
            const dropZone = e.target.closest('.column');
            
            if (dropZone && draggable) {
                dropZone.appendChild(draggable);
                
                const taskId = draggable.id.replace('task-', '');
                const newStatus = dropZone.id;
                
                // Enviar atualização para o servidor
                const formData = new FormData();
                formData.append('action', 'update');
                formData.append('id', taskId);
                formData.append('status', newStatus);
                
                fetch(window.location.href, {
                    method: 'POST',
                    body: formData
                });
            }
        }
    </script>
</body>
</html>
