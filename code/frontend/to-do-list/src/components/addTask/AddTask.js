import React from "react";
import "./AddTask.css";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import {
  _userIsLoggedIn,
  _currentUserId,
  _user,
  _AddTaskIsOpen,
  _FetchTrigger,
} from "../../services/atom";

function AddTask() {
  const [addTaskIsOpen, setAddTaskIsOpen] = useRecoilState(_AddTaskIsOpen);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateList, setUpdateList] = useState(false); // New state to trigger useEffect
  const [todos, setTodos] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useRecoilState(_FetchTrigger); // Initialize a trigger

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);

  const handleAddTaskIsOpen = () => {
    setAddTaskIsOpen(!addTaskIsOpen);
  };

  const handleAddTask = () => {
    fetch("http://localhost:3000/todos/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        UserId: user.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAddTaskIsOpen(!addTaskIsOpen);
        setUpdateList(!updateList); // Toggle updateList to trigger the useEffect
        setFetchTrigger((current) => current + 1); // Increment the trigger
      });
  };

  return (
    <div className="addTask-main">
      <div className="addTask-box">
        <div className="XAndTitle">
          <div className="addTask-title">Add New Task</div>
          <div className="addTask-x" onClick={handleAddTaskIsOpen}>
            <HighlightOffOutlinedIcon
              sx={{ color: "#F4C27FAB", fontSize: "xx-large" }}
            />
          </div>
        </div>
        <div className="addTask-inputs">
          <input
            className="addTask-title-input"
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="addTask-Description-input"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="addTask-button-div" onClick={handleAddTask}>
          <button className="addTask-button" type="submit">
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
