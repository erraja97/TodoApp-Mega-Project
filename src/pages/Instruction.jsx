import React from "react";

const Instruction = () => {
  return (
    <div className="container mx-auto max-h-full p-6 my-16">
      <h1 className="text-3xl font-bold mb-4">Welcome to My Todo App</h1>
      <p className="text-lg mb-4">
        Hello, and thank you for choosing my Todo App! This application is
        designed to help you manage your tasks with ease and stay organized in
        your day-to-day activities.
      </p>

      <p className="text-lg mb-4">
        This app is an ongoing project, and I plan to introduce more features to
        enhance your todo management experience. I invite you to explore the
        app, and if you have any feedback or suggestions, feel free to share
        them.
      </p>
      <p className="text-lg mb-4">
        To get started, head to the "Instruction" below for detailed information
        on using the Todo App effectively.
      </p>

      <h1 className="text-3xl font-bold mb-4">How to Use My Todo App</h1>
      <p className="text-lg mb-4">
        Follow these steps to make the most out of the app:
      </p>
      <ol className="list-decimal pl-6">
        <li>
          <strong>Add a Todo:</strong> Use the "Add Todo" section to add new
          tasks. Enter the task title, choose a category, set the status, and
          click "Add."
        </li>
        <li>
          <strong>Edit a Todo:</strong> To edit a todo, click on the "✏️" (edit)
          button next to the todo. Update the title, category, or status and
          click "Save."
        </li>
        <li>
          <strong>Delete a Todo:</strong> Remove a todo by clicking on the "❌"
          (delete) button next to the todo.
        </li>
        <li>
          <strong>Category Management:</strong> Customize your todo categories
          to suit your needs. Select a category while adding or editing a todo.
        </li>
        <li>
          <strong>Table View:</strong> Explore your todos in the table view for
          a comprehensive overview. Use the table to track and manage your tasks
          efficiently.
        </li>
        <li>
          <strong>Mark as Completed:</strong> Check off completed todos to keep
          your list organized. Simply click the checkbox next to a todo to mark
          it as completed.
        </li>
        <li>
          <strong>Custom Categories:</strong> If you don't find a suitable
          category, use the "Custom Category" field to create a new one.
        </li>
        <li>
          <strong>Instruction Page:</strong> For more detailed information,
          visit the "Instruction" page in the app's menu.
        </li>
      </ol>
      <p className="text-lg mb-4">
        Feel free to explore and experiment with the app. If you have any
        questions or feedback, don't hesitate to reach out.
      </p>
      <p className="text-lg mb-4">
        Thank you for using my Todo App! I hope it simplifies your task
        management and brings productivity to your daily routine.
      </p>
    </div>
  );
};

export default Instruction;
