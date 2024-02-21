

export const Navbar=(props)=>{
    return(
        <div className="sticky bottom-0 w-full bg-white pt-2 pb-2 flex flex-row justify-around text-sm font-semibold text-gray-500 shadow-inner">
        <div>
          <span className="cursor-pointer">
            {props.pendingTasksCount} tasks pending
          </span>
        </div>
        <div className="flex flex-row justify-around cursor-pointer ">
          <span
            className={`mr-4 font-semibold cursor-pointer ${
                props.filter === "all" ? "text-blue-600" : ""
            }`}
            onClick={() => props.handleFilterChange("all")}
          >
            All
          </span>
          <span
            className={`mr-4 font-semibold cursor-pointer ${
                props.filter === "completed" ? "text-blue-600" : ""
            }`}
            onClick={() => props.handleFilterChange("completed")}
          >
            Completed
          </span>
          <span
            className={` font-semibold cursor-pointer ${
                props.filter === "pending" ? "text-blue-600" : ""
            }`}
            onClick={() => props.handleFilterChange("pending")}
          >
            Pending
          </span>
        </div>
        <div>
          <span
            className={`cursor-pointer mr-5  ${
                props.filter === "starred" ? "text-blue-600" : ""
            } `}
            onClick={() => props.handleFilterChange("starred")}
          >
            Starred Tasks{" "}
          </span>
        </div>
      </div>
    )
}