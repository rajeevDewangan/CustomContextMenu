import React, { useState } from "react";

const CustomContextMenu = () => {
  const [menuPosition, setMenuPosition] = useState(null);
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await fetch("https://dummyjson.com/todos?limit=10");
      const data = await response.json();
      setTodos(data.todos.map((todo) => todo.todo));
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodos(["Failed to fetch data"]);
    }
  };

  const handleContextMenu = (event) => {
    event.preventDefault(); 

    const screenWidth = window.innerWidth; 
    const screenHeight = window.innerHeight; 
    const menuWidth = 200; 
    const menuHeight = 150;

    let x = event.pageX;
    let y = event.pageY;

    if (x + menuWidth > screenWidth) {
      x = screenWidth - menuWidth;
    }

    if (y + menuHeight > screenHeight) {
      y = y - (menuHeight + 400); 
    }

    setMenuPosition({ x, y });
    fetchTodos(); 
  };

  const handleClick = () => {
    setMenuPosition(null); 
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      onClick={handleClick}
      style={{
        height: "100vh",
        background: "#f9f9f9",
        position: "relative",
        overflow: "hidden", 
      }}
    >
      <h1>Right-click anywhere to open the context menu!</h1>

      {menuPosition && (
        <ul
          style={{
            position: "absolute",
            top: menuPosition.y,
            left: menuPosition.x,
            backgroundColor: "white",
            border: "1px solid #ccc",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            padding: "10px",
            listStyle: "none",
            zIndex: 1000,
            width: "200px",
          }}
        >
          <li style={{ fontWeight: "bold", marginBottom: "5px" }}>Todos:</li>
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              <li key={index} style={{ padding: "5px 10px", cursor: "pointer" }}>
                {todo}
              </li>
            ))
          ) : (
            <li style={{ padding: "5px 10px", fontStyle: "italic" }}>Loading...</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CustomContextMenu;
