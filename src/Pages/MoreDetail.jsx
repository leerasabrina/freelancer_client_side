import { useLoaderData } from "react-router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../Contexts/AuthContext";
import { ModeContext } from "../DarkLightMode/ModeContext";

const MoreDetail = () => {
  const task = useLoaderData();
  const { darkMode } = useContext(ModeContext);
  const { user } = useContext(AuthContext);

  const [hasBid, setHasBid] = useState(false);
  const [bidCount, setBidCount] = useState(task.bids?.length || 0);

  useEffect(() => {
    if (task.bids?.includes(user?.email)) {
      setHasBid(true);
    }
  }, [task, user]);

  const handleBid = async () => {
    try {
      const res = await fetch(`https://freelancer-server-three.vercel.app/tasks/${task._id}/bid`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: user.email })
      });

      if (res.ok) {
        setHasBid(true);
        setBidCount(prev => prev + 1);
        toast.success("Bid added successfully!");
      } else {
        const data = await res.json();
        toast.error(data.message || "Already bid");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className={`p-8 max-w-4xl mx-auto mt-10  ${darkMode ? "bg-gray-900 shadow-2xl text-white" : "bg-slate-100 shadow-2xl text-black"}`}>
      <div className="flex justify-between">
        <h2 className="text-3xl text-blue-700 font-bold mb-2">{task.title}</h2>
      
      <h2 className="mb-2 text-lg font-medium">You bid for {bidCount} opportunities</h2>
      </div>
      
      <p className="mb-2 text-xl text-gray-500">{task.description}</p>
      <p><span className="font-semibold text-xl">Deadline:</span> {task.deadline}</p>
      <p><span className="font-semibold text-xl">Category:</span> {task.category}</p>
      <p><span className="font-semibold  text-xl">Minimum Price:</span> ${task.budget}</p>
      <p><span className="font-semibold text-xl">Posted By:</span> {task.email}</p>

      <div className="mt-4">
        
        <button
          onClick={handleBid}
          disabled={hasBid}
          className={`px-4 py-2 rounded ${hasBid ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"} transition duration-300`}
        >
          {hasBid ? "Already Bidded" : "Bid Now"}
        </button>
      </div>
    </div>
  );
};

export default MoreDetail;
