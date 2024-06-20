import { useState, useEffect } from "react";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    displayed();
  }, [todos, status]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  const displayed = () => {
    if (status === "all") {
      const todosDisplayed = todos.map((todo) => (
        <li key={todo.id} className="todo">
          <button
            className="donebutton"
            onClick={() => {
              statusTodo(todo.id);
            }}
          >
            Done
          </button>
          <div className={todo.status ? "completed" : "active"}>
            {todo.title}
          </div>
          <button
            className="deletebutton"
            onClick={() => {
              deleteTodo(todo.id);
            }}
          >
            Delete
          </button>
        </li>
      ));
      return <ul>{todosDisplayed}</ul>;
    } else if (status === "active") {
      const activeTodos = todos.filter((todo) => !todo.status);
      const todosDisplayed = activeTodos.map((todo) => (
        <li key={todo.id} className="todo">
          <button
            className="donebutton"
            onClick={() => {
              statusTodo(todo.id);
            }}
          >
            Done
          </button>
          <div className={todo.status ? "completed" : "active"}>
            {todo.title}
          </div>
          <button
            className="deletebutton"
            onClick={() => {
              deleteTodo(todo.id);
            }}
          >
            Delete
          </button>
        </li>
      ));
      return <ul>{todosDisplayed}</ul>;
    } else {
      const completedTodos = todos.filter((todo) => todo.status);

      const todosDisplayed = completedTodos.map((todo) => (
        <li key={todo.id} className="todo">
          <button
            className="donebutton"
            onClick={() => {
              statusTodo(todo.id);
            }}
          >
            Done
          </button>
          <div className={todo.status ? "completed" : "active"}>
            {todo.title}
          </div>
          <button
            className="deletebutton"
            onClick={() => {
              deleteTodo(todo.id);
            }}
          >
            Delete
          </button>
        </li>
      ));
      return <ul>{todosDisplayed}</ul>;
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value.length >= 1) {
      const newTodo = [
        ...todos,
        {
          id: Math.floor(Math.random() * 100),
          title: value,
          status: false,
        },
      ];
      setTodos(newTodo);
      localStorage.setItem("todos", JSON.stringify(newTodo));
    }
    setValue("");
  };

  const handleStatusTodo = (event) => {
    event.preventDefault();
    setStatus(event.target.value);
  };

  const statusTodo = (id) => {
    const statusTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, status: !todo.status } : todo
    );
    setTodos(statusTodo);
    localStorage.setItem("todos", JSON.stringify(statusTodo));
  };

  const deleteTodo = (id) => {
    const deleteTodo = todos.filter((todo) => todo.id !== id);
    setTodos(deleteTodo);
    localStorage.setItem("todos", JSON.stringify(deleteTodo));
  };

  return (
    <div className="main">
      <div className="container">
        <div className="statusbuttons">
          <p>Select which state you want to see:</p>
          <button
            className="statusbutton"
            onClick={handleStatusTodo}
            value="all"
          >
            All
          </button>
          <button
            className="statusbutton"
            onClick={handleStatusTodo}
            value="active"
          >
            Active
          </button>
          <button
            className="statusbutton"
            onClick={handleStatusTodo}
            value="completed"
          >
            Completed
          </button>
        </div>
        <div className="todos">{displayed()}</div>
        <ul className="todos">
          <li>
            <form>
              <button onClick={handleSubmit}>Add Todo</button>
              <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="Add new Todo"
              />
            </form>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Todo;
