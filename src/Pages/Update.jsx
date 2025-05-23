import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";
import { ModeContext } from "../DarkLightMode/ModeContext";

const Update = () => {
  const { darkMode } = useContext(ModeContext);
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://freelancer-server-three.vercel.app/mytasks/${id}`)
      .then((res) => res.json())
      .then((data) => setTask(data));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedTask = {
      title: form.title.value,
      deadline: form.deadline.value,
      budget: form.budget.value,
      category: form.category.value,
    };

    fetch(`https://freelancer-server-three.vercel.app/mytasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Updated!", "Task updated successfully.", "success");
          navigate("/mytasks");
        } else {
          Swal.fire("No Change", "N updates were made to the task.", "info");
        }
      });
  };

  if (!task) {
    return (
      <div className="text-center py-10">
       <Loader></Loader>
      </div>
    );
  }
// p-4 max-w-xl mx-auto
// w-full border p-2 rounded
  return (
    <div className={darkMode?"p-4 max-w-xl mx-auto bg-slate-800 text-white":"p-4 max-w-xl mx-auto text-black bg-white"}>
      <h2 className="text-2xl font-bold mb-4">Update Task</h2>
      <form onSubmit={handleUpdate} className={darkMode?"space-y-4 bg-slate-800 text-white":"space-y-4 text-black bg-white"}>
        <input
          type="text"
          name="title"
          defaultValue={task?.title}
          className={darkMode?"w-full border p-2 rounded bg-slate-800 text-white placeholder-white":"w-full border p-2 rounded text-black bg-white"}
          placeholder="Title"
          required
        />
        <input
          type="date"
          name="deadline"
          defaultValue={task?.deadline?.split("T")[0]}
          className={darkMode?"w-full border p-2 rounded bg-slate-800 text-white placeholder-white":"w-full border p-2 rounded text-black bg-white"}
          required
        />
        <input
          type="number"
          name="budget"
          defaultValue={task?.budget}
          className={darkMode?"w-full border p-2 rounded bg-slate-800 text-white placeholder-white":"w-full border p-2 rounded text-black bg-white"}
          placeholder="Price"
          required
        />
        <input
          type="text"
          name="category"
          defaultValue={task?.category}
          className={darkMode?"w-full border p-2 rounded bg-slate-800 text-white placeholder-white":"w-full border p-2 rounded text-black bg-white"}
          placeholder="Category"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default Update;
