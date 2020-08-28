var todolist = $("#todolist");
var todo = $("#todo");
var done_undone = $("#done_undone");
var add_btn = $("#add_btn");
var todos = [];
var todoDisplayed = -1;

addTodo = (todoText) => {
    todos.push({id: todos.length, text: todoText, isDone: false});
    todoDisplayed = -1;
    refreshTodoList();
    refreshTodoForm();
}

refreshTodoList = () => {
    todolist.html("");
    todos.forEach(el => {
        todolist.append(`<a data-id="${el.id}" class="dropdown-item ${(el.isDone? "bg-success": "")}" href="#">${el.text}</a>`);
    });
}

setDone = (id, isDone) => {
    todos[id].isDone = isDone;
    todoDisplayed = -1;
    refreshTodoList();
    refreshTodoForm();
}

refreshTodoForm = () => {
    if(todoDisplayed == -1){
        todo.val("");
        todo.prop( "disabled", false );

        done_undone.hide();
        add_btn.show();
    }
    else{
        let to = todos[todoDisplayed];
        todo.val(to.text);
        todo.prop( "disabled", true );

        done_undone.show();
        done_undone.html(`Mark as ${(to.isDone)?"undone":"done"}`);
        add_btn.hide();
    }
}

add_btn.click(() => {
    addTodo(todo.val());
});
done_undone.click((el) => {
    let isDone = todos[todoDisplayed].isDone;
    setDone(todoDisplayed, !isDone);
});
todolist.on("click", ".dropdown-item", (el) => {
    todoDisplayed = $(el.target).data("id");
    refreshTodoForm();
});

refreshTodoForm();