import React from "react";
import Container from "../container/Container";

function Footer() {
  return (
    <footer className="bg-green-400 sticky bottom-0">
      <Container>
        <div className=" text-lg font-normal text-center py-2">
          TodoApp | Copyright @ 2024
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
