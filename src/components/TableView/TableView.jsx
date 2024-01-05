import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import todoService from "../../appwrite/config";
import { storeTodoTableView, todoChecked } from "../../store/todoSlice";
import { Query } from "appwrite";

const TableView = ({ onComponentChange }) => {
  const dispatch = useDispatch();
  const getTodo = useSelector((state) => state.todo.todos_tableView);
  const user = useSelector((state) => state.auth.userData);

  const [editableTodos, setEditableTodos] = useState({});
  const [newTodosTitle, setNewTodoTitle] = useState({});
  const [isTodoCompleted, setIsTodoCompleted] = useState(false);

  const toggleEditable = (todo) => {
    const todoId = todo.$id;
    setEditableTodos((prev) => ({
      ...prev,
      [todoId]: !prev[todoId],
    }));

    setNewTodoTitle((prev) => ({ ...prev, [todoId]: todo.title }));
  };

  const handleInputChange = (e, todoId, todoTitle) => {
    setNewTodoTitle((prev) => ({ ...prev, [todoId]: e.target.value }));

    setEditableTodos((prev) => ({
      ...prev,
      [todoId]: true,
    }));
  };

  const toggleCompleted = (todo) => {
    try {
      setIsTodoCompleted((prevIsTodoCompleted) => !prevIsTodoCompleted);

      if (!setIsTodoCompleted) {
        setEditableTodos((prev) => ({
          ...prev,
          [todo.$id]: true,
        }));
      }

      dispatch(todoChecked(!isTodoCompleted));
      handleChecked(todo.$id, !isTodoCompleted);
      onComponentChange();
    } catch (error) {
      console.log("Error toggling Todo Status", error);
    }
  };

  const handleChecked = async (id, updatedStatus) => {
    try {
      const response = await todoService.updateStatus(
        id,
        updatedStatus ? "completed" : "pending"
      );

      if (response) {
        console.log("Todo Status updated Successfully");
        onComponentChange();
      }
    } catch (error) {
      console.log("Error updating Todo Status", error);
    }
  };

  const handleTodoEdit = async (todo) => {
    try {
      const response = await todoService.updateTodo(todo.$id, {
        title: newTodosTitle[todo.$id],
        category: todo.category,
        status: todo.status,
        user: todo.user,
      });

      if (response) {
        setEditableTodos((prev) => ({
          ...prev,
          [todo.$id]: false,
        }));
        onComponentChange(); // Trigger component change after editing
      }
    } catch (error) {
      console.log("Error in updating todo", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await todoService.deleteTodo(id);
      if (response) {
        console.log("Todo Deleted Successfully");
        onComponentChange(); // Trigger component change after editing
      }
    } catch (error) {
      console.log("Error in deleting todo", error);
    }
  };

  useEffect(() => {
    const fetchTodosByCategory = async () => {
      try {
        const response = await todoService.readTodos([
          Query.equal("user", [user.name]),
        ]);

        if (response) {
          dispatch(storeTodoTableView(response.documents));
        }
      } catch (error) {
        console.error("Error reading todos:", error);
      }
    };

    if (user) {
      fetchTodosByCategory();
    }
  }, [getTodo, user, dispatch]);

  const renderTodos = () => {
    const todosByCategory = {};

    getTodo.forEach((todo) => {
      const category = todo.category || "Uncategorized";

      if (!todosByCategory[category]) {
        todosByCategory[category] = [];
      }

      todosByCategory[category].push(todo);
    });

    return Object.entries(todosByCategory).map(([category, todos]) => (
      <div key={category} className="border p-4 rounded-md shadow-md mb-4">
        <h1 className="text-lg font-bold mb-2">{category}</h1>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {todos.map((todo) => (
            <div
              key={todo.todoId}
              className="bg-green-400 p-4 rounded-md text-white flex justify-between items-center"
            >
              <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.status === "completed"}
                onChange={() => toggleCompleted(todo)}
              />

              <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg font-medium ${
                  editableTodos[todo.$id]
                    ? "border-black/10 px-2"
                    : "border-transparent"
                } ${todo.status === "completed" ? "line-through" : ""}`}
                value={`${
                  !editableTodos[todo.$id]
                    ? todo.title
                    : newTodosTitle[todo.$id]
                }`}
                onChange={(e) => handleInputChange(e, todo.$id, todo.title)}
                readOnly={!editableTodos[todo.$id]}
              />

              <div className="flex space-x-2">
                <button
                  className="px-3 py-1 bg-blue-500 rounded-md"
                  onClick={() => {
                    if (isTodoCompleted) return;
                    if (editableTodos[todo.$id]) {
                      handleTodoEdit(todo);
                    } else toggleEditable(todo);
                  }}
                  disabled={todo.status === "completed"}
                >
                  {editableTodos[todo.$id] ? "📁" : "✏️"}
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo.$id)}
                  className="px-3 py-1 bg-red-300 rounded-md"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Table View</h1>
      <div className="overflow-x-auto overflow-y-auto h-80">
        <div className="flex flex-col space-y-4 p-6">{renderTodos()}</div>
      </div>
    </div>
  );
};

export default TableView;
