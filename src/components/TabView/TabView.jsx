import React, { useState, useEffect } from "react";
import todoService from "../../appwrite/config";
import { Query } from "appwrite";
import { useDispatch, useSelector } from "react-redux";
import { storeTodo } from "../../store/todoSlice";

const TabView = ({ onComponentChange }) => {
  const [activeTab, setActiveTab] = useState(1);
  // const [todos, setTodos] = useState([]);
  const user = useSelector((state) => state.auth.userData);

  //added this to update tabview whenever new todo is added
  const newTodoAdded = useSelector((state) => state.todo.isTodoAdded);
  const todoChecked = useSelector((state) => state.todo.isTodoChecked);

  //use dispatch and selector for fetcheed todo
  const dispatch = useDispatch();
  const getTodo = useSelector((state) => state.todo.todos_tabView);

  useEffect(() => {
    const handleFetchTodos = async (query) => {
      try {
        if (user) {
          const response = await todoService.readTodos(query);
          if (response) {
            // setTodos(response.documents);
            dispatch(storeTodo(response.documents));
          }
        }
      } catch (error) {
        console.error("Error reading todos:", error);
      }
    };

    let query; // Declare query variable once

    if (activeTab === 1 && user) {
      query = [Query.equal("user", [user.name])];
      handleFetchTodos(query);
    } else if (activeTab === 2 && user) {
      query = [
        Query.equal("user", [user.name]),
        Query.equal("status", ["completed"]),
      ];
      handleFetchTodos(query);
    } else if (activeTab === 3 && user) {
      query = [
        Query.equal("user", [user.name]),
        Query.equal("status", ["pending"]),
      ];
      handleFetchTodos(query);
    }
  }, [activeTab, onComponentChange]);

  const renderTodos = () => (
    <div className="mt-5 h-80 overflow-y-auto scrollbar-hide">
      <ul className="list-none p-0">
        {getTodo.map((todo) => (
          <li key={todo.todoId} className="bg-gray-100 p-3 mb-2 rounded">
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="max-w-md mx-auto">
      <div className="flex">
        <button
          onClick={() => setActiveTab(1)}
          className={`flex-1 py-2 px-4 ${
            activeTab === 1
              ? "bg-green-400 text-black text-normal"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          All Todo
        </button>
        <button
          onClick={() => setActiveTab(2)}
          className={`flex-1 py-2 px-4 ${
            activeTab === 2
              ? "bg-green-400 text-black text-normal"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Completed Todo
        </button>
        <button
          onClick={() => setActiveTab(3)}
          className={`flex-1 py-2 px-4 ${
            activeTab === 3
              ? "bg-green-400 text-black text-normal"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Pending Todo
        </button>
      </div>

      <div className="mt-5">{renderTodos()}</div>
    </div>
  );
};

export default TabView;
