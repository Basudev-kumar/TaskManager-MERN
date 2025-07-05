// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import DashboardLayout from '../../components/layouts/DashboardLayout';
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";
// import { LuFileSpreadsheet } from "react-icons/lu";
// import TaskStatusTabs from "../../components/TaskStatusTabs";
// import TaskCard from "../../components/Cards/TaskCard";
// import toast from "react-hot-toast";


// const ManageTasks = () => {

//   const [allTasks, setAllTasks] = useState([]);
//   const [tabs, setTabs] = useState([]);
//   const [filterStatus, setFilterStatus] = useState("All");
//   const navigate = useNavigate();


//   const getAllTasks = async () => {
//     try {
//       const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS,{
//         params:{
//           status:filterStatus === "All" ? "" : filterStatus,
//         },
//       })

//       // console.log("Full API response:", response.data);

//       setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks : []);

//       // map statusSummary data with fixed labels and order
//       const statusSummary = response.data?.statusSummaty || {};

//       // console.log("statusSummary:", statusSummary);

//       const statusArray = [
//         {label:"All", count:statusSummary.allTasks || 0 },
//         {label:"Pending", count:statusSummary.pendingTasks || 0 },
//         {label:"In Progress", count:statusSummary.inProgressTasks || 0 },
//         {label:"Completed", count:statusSummary.completedTasks || 0 }
//       ];

//       setTabs(statusArray);


//     } catch (error) {
//       console.error("Error fetching users : ",error);
//     }
//   };

//   const handleClick = (taskData) => {
//     navigate(`/admin/create-task`, { state: { taskId: taskData._id } });
//   };

//   // download task report
//   const handleDownloadReport = async () => {
//     try {
//       const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_TASKS , {
//         responseType:"blob",
//       });

//       // create a Url for the blob
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href=url;
//       link.setAttribute("download","task_details.xlsx");
//       document.body.appendChild(link);
//       link.click();
//       link.parentNode.removeChild(link);
//       window.URL.revokeObjectURL(url);
      
//     } catch (error) {
//       console.error("Error downloading expense details:",error);
//       toast.error("Failed to download expense details. Please try again.")
//     }
    
//   };

//   useEffect(() => {
//     getAllTasks(filterStatus);
//     return ()=>{};
//   }, [filterStatus]);



//   return (
//     <DashboardLayout activeMenu="Manage Tasks">
//       <div className="my-5">
//         <div className="flex flex-col lg:flex-row lg:items-center justify-between">
//           <div className="flex items-center justify-between gap-3">
//             <h2 className="text-xl md:text-xl font-medium">My Tasks</h2>

//             <button 
//             onClick={handleDownloadReport}
//             className="flex lg:hidden download-btn">
//               <LuFileSpreadsheet className="text-lg"/>
//               Download Report
//             </button>
//           </div>

//           {tabs?.[0]?.count > 0 && (
//             <div className="flex items-center gap-3">
//               <TaskStatusTabs
//                tabs={tabs}
//                activeTab={filterStatus}
//                setActiveTab={setFilterStatus}
//               />

//               <button className="hidden lg:flex download-btn"
//               onClick={handleDownloadReport}>
//                 <LuFileSpreadsheet className="text-lg" />
//                 Download Report
//               </button>
//             </div>
//           )}

//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//           {allTasks.map((item,index)=>(
//             <TaskCard
//             key={item._id}
//             title={item.title}
//             description={item.description}
//             priority={item.priority}
//             status={item.status}
//             progress={item.progress}
//             createdAt={item.createdAt}
//             dueDate={item.dueDate}
//             assignedTo={item.assignedTo?.map((item)=>item.profileImageUrl)}
//             attachmentCount={item.attachments?.length || 0}
//             completedTodoCount={item.completedTodoCount || 0}
//             todoChecklist={item.todoChecklist || []}
//             onClick={()=>{
//               handleClick(item);
//             }}

//             />
//           ))}
//         </div>


//       </div>
//     </DashboardLayout>
//   )
// }

// export default ManageTasks;










import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuFileSpreadsheet } from "react-icons/lu";
import TaskStatusTabs from "../../components/TaskStatusTabs";
import TaskCard from "../../components/Cards/TaskCard";
import toast from "react-hot-toast";

const ManageTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();

  const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: { status: filterStatus === "All" ? "" : filterStatus },
      });

      setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks : []);

      const statusSummary = response.data?.statusSummaty || {};
      const statusArray = [
        { label: "All", count: statusSummary.allTasks || 0 },
        { label: "Pending", count: statusSummary.pendingTasks || 0 },
        { label: "In Progress", count: statusSummary.inProgressTasks || 0 },
        { label: "Completed", count: statusSummary.completedTasks || 0 }
      ];

      setTabs(statusArray);

    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  };

  const handleClick = (taskData) => {
    navigate(`/admin/create-task`, { state: { taskId: taskData._id } });
  };

  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_TASKS, { responseType: "blob" });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "task_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error downloading task details:", error);
      toast.error("Failed to download task details. Please try again.");
    }
  };

  useEffect(() => {
    getAllTasks(filterStatus);
    return () => { };
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <div className="my-5 px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-2xl font-semibold">Manage Tasks</h2>
            <button
              onClick={handleDownloadReport}
              className="flex lg:hidden items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all"
            >
              <LuFileSpreadsheet className="text-lg" />
              Download Report
            </button>
          </div>

          {tabs?.[0]?.count > 0 && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <TaskStatusTabs
                tabs={tabs}
                activeTab={filterStatus}
                setActiveTab={setFilterStatus}
              />
              <button
                className="hidden lg:flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all"
                onClick={handleDownloadReport}
              >
                <LuFileSpreadsheet className="text-lg" />
                Download Report
              </button>
            </div>
          )}
        </div>

        {/* Task Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-6">
          {allTasks.map((item) => (
            <TaskCard
              key={item._id}
              title={item.title}
              description={item.description}
              priority={item.priority}
              status={item.status}
              progress={item.progress}
              createdAt={item.createdAt}
              dueDate={item.dueDate}
              assignedTo={item.assignedTo?.map((item) => item.profileImageUrl)}
              attachmentCount={item.attachments?.length || 0}
              completedTodoCount={item.completedTodoCount || 0}
              todoChecklist={item.todoChecklist || []}
              onClick={() => { handleClick(item); }}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageTasks;
