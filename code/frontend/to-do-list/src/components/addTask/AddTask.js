import React from "react";
import "./AddTask.css";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#F4C27F"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#F4C27F"
                strokeWidth="2"
                stroklinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8V16"
                stroke="#F4C27F"
                strokeWidth="2"
                stroklinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 12H16"
                stroke="#F4C27F"
                strokeWidth="2"
                stroklinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
