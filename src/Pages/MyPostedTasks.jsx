import { useEffect, useState } from "react";
import { useContext } from "react"; 
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/AuthContext";
import { ModeContext } from "../DarkLightMode/ModeContext";
import Loader from "../Loader/Loader";

const MyPostedTasks = () => {
  const { user, loading } = useContext(AuthContext);
   const { darkMode } = useContext(ModeContext);
  const [myTasks, setMyTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

 

  useEffect(() => {
    console.log(user.email)
    if (user?.email) {
      fetch(`https://freelancer-server-three.vercel.app/mytasks?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setMyTasks(data);
          // console.log(myTasks)
        });
    }
  }, [user]);

  const handleDelete = (id) => {
    console.log(id)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://freelancer-server-three.vercel.app/mytasks/${id}`,{
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data)
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your task has been deleted.", "success");
              
            }
            setMyTasks(myTasks.filter((task) => task._id !== id));
          });
      }
    });
  };

  if (loading) return <Loader></Loader>;

  return (
    <div className={darkMode?"p-4 bg-black  text-white":"p-4 bg-white text-black"}>
      <h2 className="text-2xl font-semibold mb-4">My Posted Tasks</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          {/* bg-gray-200 text-gray-800 */}
          <thead className={darkMode?"bg-slate-800 text-white":" bg-gray-200 text-gray-800 "}>
            <tr>
              <th>Title</th>
              <th>Deadline</th>
              <th>Price</th>
              <th>Category</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myTasks.map((task) => (
              <tr key={task._id} className={darkMode?"border-b border-gray-100 bg-slate-800 text-white":"border-b bg-white text-black"}>
                <td>{task.title}</td>
                <td>{task.deadline}</td>
                <td>${task.budget}</td>
                <td>{task.category}</td>
                <td className="flex gap-2 justify-center py-2">
                  <Link to={`/update/${task._id}`}>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  
                    {/* <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                      Bids
                    </button> */}
                    <button
    onClick={() => setSelectedTask(task)}
    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
  >
    Bids
  </button>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Modal */}
{selectedTask && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
    <div className={darkMode ? "bg-slate-800 text-white p-6 rounded shadow-lg w-[90%] md:w-[500px]" : "bg-white text-black p-6 rounded shadow-lg w-[90%] md:w-[500px]"}>
      <h3 className="text-xl font-bold mb-2">Bids for: {selectedTask.title}</h3>
      <p className="mb-2">Total Bids: {selectedTask.bids?.length || 0}</p>

      {selectedTask.bids?.length > 0 ? (
        <ul>
          {selectedTask.bids.map((email, index) => (
            <li key={index} className="text-sm">{email}</li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No one has bid yet.</p>
      )}

      <div className="flex justify-end mt-4">
        <button
          onClick={() => setSelectedTask(null)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


        {myTasks.length === 0 && (
          <p className="text-center mt-4 ">No tasks posted yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyPostedTasks;
