import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "./navbar";

function TodoListing() {
  const inputRef = useRef([]);
  const initialTodoList = JSON.parse(localStorage.getItem("todoList")) || [];
  const [todoList, setTodoList] = useState(initialTodoList);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedTodo, setEditedTodo] = useState({
    id: null,
    taskname: "",
    checked: false,
  });
  const setInputRef = (index, ref) => {
      inputRef.current[index] = ref;
      
  };
  
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const task = {
        id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
        taskname: inputValue,
        checked: false,
        starred: false,
      };
      setTodoList([...todoList, task]);
      setInputValue("");
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
    setEditIndex(null);
  };

  const handleEditTodo = (index, newValue) => {
    const newTodoList = [...todoList];
    newTodoList[index] = newValue;
    setTodoList(newTodoList);
    setEditIndex(null);
  };

  const handleEditButtonClick = (index) => {
    setEditIndex(index);
    console.log(inputRef.current);
    setEditedTodo({ ...todoList[index] });
if(inputRef.current[index]){
    inputRef.current[index].focus();
}
  };

  const handleCompleteTask = (index) => {
    const newTodoList = [...todoList];
    newTodoList[index].checked = !newTodoList[index].checked;
    setTodoList(newTodoList);
  };
  const handleStarredTask = (index) => {
    const newTodoList = [...todoList];
    newTodoList[index].starred = !newTodoList[index].starred;
    setTodoList(newTodoList);
  };

  const handleFilterChange = (type) => {
    setFilter(type);
  };

  const pendingTasksCount = todoList.filter((todo) => !todo.checked).length;

  const filteredTodoList = filter === "all"
  ? todoList
  : filter === "completed"
  ? todoList.filter((todo) => todo.checked)
  : filter === "starred"
  ? todoList.filter((todo) => todo.starred)
  : todoList.filter((todo) => !todo.checked);


  return (
    <div>
      <div className="bg-white w-[673px] rounded-lg flex justify-between items-center pr-2 ">
        <input
          className="h-10 rounded-xl outline-none border-none w-[50vw] ml-3"
          type="text"
          placeholder="Enter the tasks..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAddTodo();
            }
          }}
        />
        <button
          className="bg-blue-600 text-white rounded-lg h-8 w-24 ml-4"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </div>
      <ul
        className="bg-white max-w-2xl relative rounded-lg mt-6 h-96 pt-3 overflow-scroll shadow-lg flex flex-col justify-between"
        style={{ scrollbarWidth: "none", "-ms-overflow-style": "none" }}
      >
        <div>
          {filteredTodoList.map((todo, index) => (
            <div className="p-1 border-b border-gray-200" key={index}>
              <li className="h-10 hover:bg-blue-100  rounded-lg mr-5 outline-none pl-2 pr-2 ml-3 bg-white text-black flex flex-row justify-between">
                <div
                  style={{
                    overflow: "scroll",
                    scrollbarWidth: "none",
                    "-ms-overflow-style": "none",
                    width: "620px",
                    marginRight: "6px",
                  }}
                >
                  {editIndex === index ? (
                    <input
                      className="mt-1 w-96 p-1 rounded-md"
                      type="text"
                      value={editedTodo.taskname}
                      key={index}
                      ref={(ref) => setInputRef(index, ref)}
                      onChange={(e) =>
                        setEditedTodo({
                          ...editedTodo,
                          taskname: e.target.value,
                        })
                      }
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          editedTodo.taskname.trim() !== ""
                        ) {
                          handleEditTodo(index, editedTodo);
                        }
                      }}
                    />
                  ) : (
                    <div className="flex flex-row items-center">
                      <img
                        className={`w-5 cursor-pointer mr-4 mt-2 ${
                          todo.checked ? "hidden" : ""
                        }`}
                        src="/assets/check-mark.png"
                        alt=""
                        onClick={() => handleCompleteTask(index)}
                      />
                      {todo.checked && (
                        <img
                          className={`w-5 cursor-pointer mr-4 mt-2 ${
                            todo.checked ? "" : "hidden"
                          }`}
                          src="/assets/check.png"
                          alt=""
                        />
                      )}
                      <span
                        className={`font-normal text-base mt-2 ${
                          todo.checked ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {todo.taskname}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-row gap-4 items-center">
                  {todo.starred ? (
                    <img
                      className="w-4 cursor-pointer"
                      src="/assets/star (1).png"
                      alt=""
                      onClick={
                        todo.checked ? null : () => handleStarredTask(index)
                      }
                    />
                  ) : (
                    <img
                      className="w-4 cursor-pointer"
                      src="/assets/star.png"
                      alt=""
                      onClick={
                        todo.checked ? null : () => handleStarredTask(index)
                      }
                    />
                  )}

                  {!todo.checked && (
                    <img
                      className="w-4 cursor-pointer"
                      src="/assets/edit.png"
                      alt=""
                      onClick={() => handleEditButtonClick(index)}
                    />
                  )}
                  <img
                    className="w-4 cursor-pointer"
                    src="/assets/bin.png"
                    alt=""
                    onClick={() => handleDeleteTodo(index)}
                  />
                </div>
              </li>
            </div>
          ))}
        </div>
        <Navbar handleFilterChange={handleFilterChange} filter={filter} pendingTasksCount={pendingTasksCount} />
      </ul>
    </div>
  );
}

export default TodoListing;
