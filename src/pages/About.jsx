import React from "react";

const About = () => {
  return (
    <div className="container mx-auto my-16 p-6 max-h-full">
      <h1 className="text-3xl font-bold mb-4">About My Todo App</h1>
      <p className="text-lg mb-4">
        Welcome to my Todo App! This project is a personal initiative to create
        a simple and intuitive task management tool.
      </p>
      <p className="text-lg mb-4">
        <strong>Tech Stack:</strong> React, Redux, Appwrite, Tailwind CSS
      </p>
      <p className="text-lg mb-4">
        <strong>Key Features:</strong>
        <ul className="list-disc pl-6">
          <li>
            Effortless Todo Management: Easily add, edit, and delete your todos.
          </li>
          <li>
            Category Organization: Categorize your todos for better
            organization.
          </li>
          <li>Table View: View your todos in a convenient table format.</li>
          <li>Mark Todos as Completed: Keep track of your completed tasks.</li>
        </ul>
      </p>
      <p className="text-lg mb-4">
        <strong>Future Additions:</strong> Stay tuned for more updates! I have
        exciting features in the pipeline to enhance your todo management
        experience.
      </p>
      <p className="text-lg mb-4">
        For detailed instructions on how to use the app, please refer to the Instruction.
      </p>
      <p className="text-lg mb-4">
        Thank you for using my Todo App! I hope it enhances your productivity
        and makes managing your tasks a breeze.
      </p>
    </div>
  );
};

export default About;
