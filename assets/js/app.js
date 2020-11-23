(function($){

    // call initial todos from database
    getAllTodos();

    // define some selector
    var addTodoTextInput = $("#addTodoTextInput");
    var todosUl = $("#todos");

    var elAllTodoFilter = $("#showAllTodos");
    var elActiveTodoFilter = $("#showUncompletedTodos");
    var elCompletedTodoFilter = $("#showCompletedTodos");

    var todoSummery = $("#todoSummery");
    var todoMainWrapper = $("#todoApp2");

    // todo add event handler 
    addTodoTextInput.on("keyup", function (event) {
        if (event.key === "Enter") {
          addTodo();
        }
    });

    // single todo event to make todo delete/ active/ completed
    todosUl.on("click", function (event) {
        // Get the element that was clicked.
        var elementClicked = event.target;
        // Check if elementClicked is a delete button.
        if (elementClicked.classList.contains("delete-button")) {
            var elDelete = $(elementClicked);

            deleteTodo(elDelete.prev());
        }
        // Check if elementClicked is a checkbox.
        else if (elementClicked.classList.contains("checkbox")) {
            var elChecked = $(elementClicked);
            var elTodo = elChecked.parent().next();

            if(elTodo.hasClass("todo-checked-text")){
                // change todo completed to active
                updateTodo(elTodo, 'active');
                elTodo.removeClass("todo-checked-text");
            }else{
                // change todo active to completed
                updateTodo(elTodo, 'completed');
                elTodo.addClass("todo-checked-text");
            }
        }
    });

    // todo edit event handler
    todosUl.on("focusin", function(event){
        var elementClicked = event.target;

        if(elementClicked.classList.contains("todo-text")){
            var elTodo = $(elementClicked);
            elTodo.css("border", "1px solid #bfbfbf");
            elTodo.css("box-shadow", "0px 0px 3px 1px #cccccc inset");
            elTodo.css("padding-left", "10px");
        }
    });

    // todo update after editing
    todosUl.on("focusout", function(event){
        var elementClicked = event.target;

        if(elementClicked.classList.contains("todo-text")){
            var elTodo = $(elementClicked);
            elTodo.css("border", "");
            elTodo.css("box-shadow", "");
            elTodo.css("padding-left", "");
            updateTodo(elTodo);
        }
    });

    // Show all todo event handler
    elAllTodoFilter.on('click', function(event){
        event.preventDefault();
        $(this).addClass('active');
        elActiveTodoFilter.removeClass('active');
        elCompletedTodoFilter.removeClass('active');

        var todos = $('li.todo');
        showAllTodos(todos);
    });

    // show activated todo event handler
    elActiveTodoFilter.on('click', function(event){
        event.preventDefault();
        $(this).addClass('active');
        elAllTodoFilter.removeClass('active');
        elCompletedTodoFilter.removeClass('active');
        
        var todos = $('li.todo');
        showActiveTodos(todos);
    });

    // show completed todo event handler
    elCompletedTodoFilter.on('click', function(event){
        event.preventDefault();
        $(this).addClass('active');
        elAllTodoFilter.removeClass('active');
        elActiveTodoFilter.removeClass('active');
        
        var todos = $('li.todo');
        showCompletedTodos(todos);
    });

    // delete completed todo event handler
    var elDeleteCompleted = $('#deleteCompletedButton');
    if(elDeleteCompleted.length > 0){
        elDeleteCompleted.on('click', function(event){
            event.preventDefault();
            deleteCompletedTodos();
        });
    }

    // add new todo function
    function addTodo(){
        var data = {
            "action": "insert",
            "data": {
                "name": addTodoTextInput.val(),
            },
        };
        $.ajax({
            url: 'app/Ajax_handler.php',
            type: "post",
            data: data,
            dataType: "json",
            success: function(response) {
                displayTodos(response);
                addTodoTextInput.val('');
                updateTodoUi();
            }
        });
    }

    // update todo function
    function updateTodo(selector, status = 'active'){
        var data = {
            "action": "update",
            "data": {
                "id": selector.attr('data-id'),
                "name": selector.text(),
                "status": status,
            },
        };
        $.ajax({
            url: 'app/Ajax_handler.php',
            type: "POST",
            data: data,
            dataType: "json",
            success: function(response) {
                updateTodoUi();
            }
        });
    }

    // delete todo function
    function deleteTodo(selector){
        var data = {
            "action": "delete",
            "data": {
                "id": selector.attr('data-id'),
                "name": selector.text(),
            },
        };
        $.ajax({
            url: 'app/Ajax_handler.php',
            type: "POST",
            data: data,
            dataType: "json",
            success: function(response) {
                //console.log(response);
            }
        });

        selector.prev().remove();
        selector.next().remove();
        selector.remove();

        updateTodoUi();

    }

    // delete completed todo function
    function deleteCompletedTodos(){
        var data = {
            "action": "deleteCompleted",
        };
        $.ajax({
            url: 'app/Ajax_handler.php',
            type: "POST",
            data: data,
            dataType: "json",
            success: function(response) {
                getAllTodos();
                updateTodoUi();
            }
        });
    }

    // display todo by creating element
    function displayTodos(data){

        var todoLi = document.createElement("li");

        var checkbox = createCheckbox(data);
        var todoLabel = createTodoLabel(data);
        var deleteButton = createDeleteButton();

        todoLi.className = "todo";
        todoLi.appendChild(checkbox);
        todoLi.appendChild(todoLabel);
        todoLi.appendChild(deleteButton);
        todosUl.append(todoLi);

    }

    // initially get all todo function
    function getAllTodos(){
        $.ajax({
            url: 'app/Ajax_handler.php',
            type: "GET",
            success: function(response) {
                var todos = JSON.parse(response);
                //console.log(todos);
                $('#todos').empty();
                $.each( todos, function(index, element){
                    displayTodos(element);
                });
                updateTodoUi();
            }
        });
    }

    // show all todo function
    function showAllTodos(todos) {
        $.each( todos, function(idx, item){
            $(this).show();
        });
    }

    // show active todo function
    function showActiveTodos(todos) {
        $.each( todos, function(idx, item){
            if($(this).find('.todo-text').hasClass("todo-checked-text")){
                $(this).hide();
            }else{
                $(this).show();
            }
        });
    }

    // show completed todo function
    function showCompletedTodos(todos) {
        $.each( todos, function(idx, item){
            if(!$(this).find('.todo-text').hasClass("todo-checked-text")){
                $(this).hide();
            }else{
                $(this).show();
            }
        });
    }

    // always update user interface after completing any event like add, update or delete todos
    function updateTodoUi(){

        var todos = $('.todo-text').length;
        var todosCompleted = $('.todo-checked-text').length;
        var elLeftTodos = ( todos - todosCompleted );
        var elleftTodosLabel = $('#todosLeft');
        var elDeleteCompletedButton = $('#deleteCompletedButton');

        if(todos > 0){
            todoSummery.show();
            todoMainWrapper.css('grid-template-rows', '60px 1fr 45px');
        }else{
            todoSummery.hide();
            todoMainWrapper.css('grid-template-rows', '60px 1fr 0px');
        }

        if( elLeftTodos > 0 ){
            elleftTodosLabel.text(elLeftTodos+((elLeftTodos > 1)? ' items': ' item')+' left');
        }else{
            elleftTodosLabel.text('');
        }

        if(todosCompleted > 0){
            elDeleteCompletedButton.show();
        }else{
            elDeleteCompletedButton.hide();
        }

    }

    function createCheckbox(todo) {
        // for pretty-checkbox.css
        var checkboxMain = document.createElement("div");
        var checkbox = document.createElement("input");
        var checkboxState = document.createElement("div");
        var checkboxIcon = document.createElement("i");
        var checkboxLabel = document.createElement("label");
    
        checkboxMain.className = "pretty p-icon p-round";
        checkboxState.className = "state";
        checkboxIcon.className = "icon mdi mdi-check mdi-18px";
    
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
    
        checkboxState.appendChild(checkboxIcon);
        checkboxState.appendChild(checkboxLabel);
        checkboxMain.appendChild(checkbox);
        checkboxMain.appendChild(checkboxState);

        if(todo.status == 'completed'){
            checkbox.click();
        }

        return checkboxMain;
    }

    function createTodoLabel(todo) {
        var todoLabel = document.createElement("label");
        todoLabel.textContent = todo.name;
        todoLabel.className = "todo-text";
        if(todo.status == 'completed'){
            todoLabel.className = todoLabel.className+" todo-checked-text";
        }
        todoLabel.setAttribute("data-id", todo.id);
        todoLabel.contentEditable = true;
        return todoLabel;
    }

    function createDeleteButton() {
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "×";
        deleteButton.className = "delete-button";
        return deleteButton;
    }


})(jQuery);