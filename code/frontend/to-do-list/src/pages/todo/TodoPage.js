import React from "react";
import "./todo.css";
import profileImg from "../../images/profileImg.png";
import watchImg from "../../images/watch-img.png";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  _userIsLoggedIn,
  _currentUserId,
  _user,
  _AddTaskIsOpen,
  _FetchTrigger,
} from "../../services/atom";
import AddTask from "../../components/addTask/AddTask";

function Todo() {
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const [todos, setTodos] = useState([]);
  const hours = new Date().getHours();

  const [addTaskIsOpen, setAddTaskIsOpen] = useRecoilState(_AddTaskIsOpen);
  const [fetchTrigger, setFetchTrigger] = useRecoilState(_FetchTrigger);
  const [currentUserId, setCurrentUserId] = useRecoilState(_currentUserId);
  const [userIsLoggedIn, setUserIsLoggedIn] = useRecoilState(_userIsLoggedIn);
  const [userRecoil, setUser] = useRecoilState(_user);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setCurrentUserId(null);
    setUserIsLoggedIn(false);
    setUser(null);
    navigate(`/login`);
  };

  const handleAddTaskIsOpen = () => {
    setAddTaskIsOpen(!addTaskIsOpen);
  };

  let greeting;
  if (hours < 12) {
    greeting = "Good Morning";
  } else if (hours >= 12 && hours < 18) {
    greeting = "Good Afternoon";
  } else if (hours >= 18 && hours < 24) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Night";
  }
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

  // Function to fetch todos
  const fetchTodos = () => {
    const userId = user.id;
    fetch(`http://localhost:3000/todos/getTodoOfUser/${userId}`)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  };

  // useEffect to run on component mount and when fetchTrigger changes
  useEffect(() => {
    fetchTodos();
  }, [fetchTrigger]); // Depend on fetchTrigger

  return (
    <div className="todo-main">
      <div className="todo-firstPart">
        <div className="todo-img">
          <img src={profileImg} />
        </div>
        <div className="todo-name">{user.name}</div>
        <div className="todo-email">{user.email}</div>
        <div className="todo-logout">
          <button className="todo-button" onClick={handleLogOut}>
            Log Out
          </button>
        </div>
      </div>
      <div className="todo-secPart">
        <div className="todo-watch-div">
          <img src={watchImg} />
        </div>
        <div className="todo-good-time">{greeting}</div>
        <div className="todo-tasksList">Tasks List</div>

        {addTaskIsOpen ? (
          <AddTask />
        ) : (
          <div className="todo-task-box">
            <div className="todo-task-mini-title-and-add-button">
              <div className="todo-mini-title">Tasks Lists</div>
              <div className="todo-add-button" onClick={handleAddTaskIsOpen}>
                <AddCircleOutlineOutlinedIcon
                  sx={{ color: "#F4C27FAB", fontSize: "xx-large" }}
                />
              </div>
            </div>
            <div className="todo-list-todo">
              {todos.map((todo) => (
                <div key={todo.id} className="todo-main-map">
                  <div className="todo-item">
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
                    <div className="todo-list-titels">{todo.title}</div>
                  </div>
                  <div>
                    <DeleteOutlineOutlinedIcon />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Todo;
