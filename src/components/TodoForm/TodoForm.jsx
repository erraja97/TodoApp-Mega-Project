import React, { useEffect, useState } from "react";
import todoService from "../../appwrite/config";
import { useDispatch, useSelector } from "react-redux";
import { addedTodo, storeTodoCategory } from "../../store/todoSlice";
import { Query } from "appwrite";

function TodoForm({ onComponentChange }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("pending");
  const [customCategory, setCustomCategory] = useState("");
  const user = useSelector((state) => state.auth.userData);
  const dropdownCategory = useSelector((state) => state.todo.todos_category);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTodosByCategory = async () => {
      try {
        // Check if the user is still valid
        if (user) {
          const response = await todoService.readTodos([
            Query.equal("user", [user.name]),
          ]);
          if (response) {
            const getTodo = response.documents;
            // push category to redux store
            getTodo.forEach((todo) => {
              const category = todo.category || "Uncategorized"; // Use "Uncategorized" if category is not defined
  
              // push category to redux store
              dispatch(storeTodoCategory(category));
            });
          }
        }
      } catch (error) {
        console.error("Error fetching todos category:", error);
      }
    };
  
    fetchTodosByCategory();
  }, [user, handleCreateTodo]); // Dependency on user to run the effect when the user changes
  

  const handleCreateTodo = async () => {
    try {
      // Determine the category value based on user input
      const todoCategory = customCategory || category;

      // Call the createTodo function with the todo details
      const response = await todoService.createTodo({
        title,
        category: todoCategory,
        status,
        user: user.name,
      });

      // Handle the response as needed
      if (response) {
        dispatch(addedTodo(true));
        console.log("Todo created successfully:", response);
      }

      // Optionally, you can reset the form fields
      setTitle("");
      setCategory("");
      setCustomCategory("");

      // Set default status
      setStatus("pending");

      //handle onchange event
      onComponentChange();
    } catch (error) {
      // Handle errors
      console.error("Error creating todo:", error);
    }
  };

  return (
    <div className="flex-col space-y-5 px-5 py-5">
      <h1 className="text-center">Add Todo</h1>
      <form className="flex flex-col space-y-5">
        <input
          type="text"
          placeholder="Write Todo.."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex space-x-3">
          <label>
            Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={customCategory !== ""}
            >
              <option value=""></option>
              {dropdownCategory.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label>
            Custom Category:
            <input
              type="text"
              placeholder="Enter Category"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              disabled={category !== ""}
            />
          </label>
        </div>
        <button
          className="px-2 py-2 bg-green-400 rounded-md"
          type="button"
          onClick={handleCreateTodo}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
