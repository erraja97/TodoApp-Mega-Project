import React, { useState } from "react";
import Container from "../components/container/Container";
import TabView from "../components/TabView/TabView";
import TodoForm from "../components/TodoForm/TodoForm";
import TableView from "../components/TableView/TableView";

function Home() {
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const handleComponentChange = () => {
    setUpdateTrigger((prevTrigger) => prevTrigger + 1);
  };

  return (
    <div className="w-full">
      <Container>
        <div className="px-10 py-10 mx-16">
          <div className="flex py-16 items-start w-full justify-between">
            <div className=" bg-gray-300">
              <TodoForm onComponentChange={handleComponentChange} />
            </div>
            <div className="bg-gray-300">
              <TabView onComponentChange={handleComponentChange} />
            </div>
          </div>
          <div className="mx-auto text-center bg-gray-300 scroll">
            <TableView onComponentChange={handleComponentChange} />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
