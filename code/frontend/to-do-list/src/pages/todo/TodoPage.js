import React from "react";
import "./todo.css";
import profileImg from "../../images/profileImg.png";
import watchImg from "../../images/watch-img.png";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { _userIsLoggedIn, _currentUserId, _user } from "../../services/atom";

function Todo() {
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const [todos, setTodos] = useState([]);

  const handleCheckboxChange = (todoId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );

    fetch(`http://localhost:3000/todos/todoIsDone/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          setTodos(
            todos.map((todo) =>
              todo.id === todoId
                ? { ...todo, completed: !todo.completed }
                : todo
            )
          );
          throw new Error("Failed to update todo");
        }
        return response.json();
      })
      .then((updatedTodo) => {})
      .catch((error) => console.error("Error updating todo:", error));
  };

  useEffect(() => {
    const userId = user.id;
    fetch(`http://localhost:3000/todos/getTodoOfUser/${userId}`)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  return (
    <div className="todo-main">
      <div className="todo-firstPart">
        <div className="todo-img">
          <img src={profileImg} />
        </div>
        <div className="todo-name">{user.name}</div>
        <div className="todo-email">{user.email}</div>
        <div className="todo-logout">
          <button className="todo-button">Log Out</button>
        </div>
      </div>
      <div className="todo-secPart">
        <div className="todo-watch-div">
          <img src={watchImg} />
        </div>
        <div className="todo-good-time">Good Afternoon</div>
        <div className="todo-tasksList">Tasks List</div>
        <div className="todo-task-box">
          <div className="todo-task-mini-title-and-add-button">
            <div className="todo-mini-title">Tasks Lists</div>
            <div className="todo-add-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#F4C27F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 8V16"
                  stroke="#F4C27F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 12H16"
                  stroke="#F4C27F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="todo-list-todo">
            {todos.map((todo) => (
              <div key={todo.id} className="todo-item">
                <div className="todo-title">{todo.title}</div>
                {todo.completed ? (
                  <div
                    onClick={() => handleCheckboxChange(todo.id)}
                    className="todoIsCompleted"
                  ></div>
                ) : (
                  <input
                    type="checkbox"
                    className="todo-checkbox"
                    checked={todo.completed}
                    onChange={() => handleCheckboxChange(todo.id)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
