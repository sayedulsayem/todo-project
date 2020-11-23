<!DOCTYPE html>
<html>
    <head>
        <title>Todo Project</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="UTF-8">
        <meta name="author" content="sayedulsayem">
        <meta name="keywords" content="to-do list, todo list, sayedulsayem">
        <meta name="description" content="A to do list made using Javascript.">
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.materialdesignicons.com/2.2.43/css/materialdesignicons.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/pretty-checkbox/3.0.3/pretty-checkbox.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/modern-normalize/0.4.0/modern-normalize.css">
        <link rel="stylesheet" type="text/css" href="assets/css/style.css">
    </head>
    <body>

        <section class="todo-section">
            <div id="wrapper" class="wrapper">
                <h1 class="title">todos</h1>
                <!-- <div id="todoApp0" class="todo-app-0"></div>
                <div id="todoApp1" class="todo-app-1"></div> -->
                <div id="todoApp2" class="todo-app-2">
                    <div id="todoAdd" class="todo-add">
                        <button id="toggleAll" class="toggle-all" aria-label="Toggle all to do tasks">
                            <span class="rotate">&#x276F;</span>
                        </button>
                        <input id="addTodoTextInput" class="add-todo-text-input" type="text" placeholder="What do you need to do?" aria-label="Enter to do text" autofocus>
                    </div>
                    <ul id="todos" class="todos" aria-label="List of to do tasks"></ul>
                    <div id="todoSummery" class="todo-summery">
                        <label id="todosLeft" class="todos-left" aria-label="Number of to do tasks left to complete"></label>
                        <div id="todoSummeryButtons" class="todo-summery-buttons">
                            <button id="showAllTodos" class="menu-2-button active" aria-label="Show all to do tasks">All</button>
                            <button id="showUncompletedTodos" class="menu-2-button" aria-label="Show active to do tasks">Active</button>
                            <button id="showCompletedTodos" class="menu-2-button" aria-label="Show completed to do tasks">Completed</button>
                        </div>
                        <button id="deleteCompletedButton" class="delete-completed-button" aria-label="Clear completed to do tasks">Clear completed</button>
                    </div>
                </div>
            </div>
        </section>

        <script src="assets/js/jquery-3.5.1.min.js"></script>
        <script src="assets/js/app.js"></script>
    </body>
</html>