
import "./input.css";
import TodoListing from "./components/Todo-Listing"


function App() {


  return (
    <div className="bg-white w-full h-screen flex-col flex ">
      <h1 className="text-center font-bold text-3xl mt-8 mb-[-40px]">To-do List</h1>
      <div className="flex w-full justify-center h-full p-16">
      <div className="flex h-full bg-[#f4f4f4] w-10/12 flex-col rounded-2xl p-3 relative shadow">
        <div className=" w-full h-64 rounded-xl bg-cover bg-center " style={{ backgroundImage: "url('/assets/wp510798.jpg')" }}></div>

        <div className="w-full  h-[80%] flex justify-center z-100 absolute mt-32">
        <div className=" w-2/3 h-[100%] rounded-xl flex justify-center">
          <TodoListing/>
        </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
