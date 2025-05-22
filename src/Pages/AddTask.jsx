import { useContext} from "react";
import './page.css'
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/AuthContext";
import { ModeContext } from "../DarkLightMode/ModeContext";


const AddTask = () => {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ModeContext);
  

  const handleAddTask = (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value;
    const category = form.category.value;
    const description = form.description.value;
    const deadline = form.deadline.value;  
    const budget = parseFloat(form.budget.value);
    const email = user.email;
    const name = user.displayName;
    // console.log(email,budget)
    

    const taskData = {
        title,
        category,
        description,
        deadline: new Date(deadline), 
        budget,
        email,      
       name
      };
      

    fetch("https://freelancer-server-three.vercel.app/tasks", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId || data.acknowledged) {
          Swal.fire("Success!", "Task added successfully.", "success");
          form.reset();
        } else {
          Swal.fire("Oops!", "Something went wrong.", "error");
        }
      })
      .catch(() => {
        Swal.fire("Oops!", "Failed to connect to server.", "error");
      });
  };

  return (
    <div className={darkMode?"max-w-xl mx-auto p-8 mt-10 bg-slate-800 shadow-2xl text-white":"max-w-xl bg-white text-black shadow-2xl mx-auto p-8"}>
      <h2 className="text-2xl font-bold mb-6 text-center">Add Task Page</h2>
      <form onSubmit={handleAddTask} className={darkMode?'text-white bg-slate-800 ':'bg-white text-black'}>
        <input type="text" name="title" placeholder="Task Title" className={darkMode?'text-white bg-black placeholder-white input input-bordered w-full ':'bg-white input input-bordered w-full'} required />

        <select name="category" className={darkMode?'text-white bg-black select select-bordered w-full ':'bg-white select select-bordered w-full'} required>
          <option value="">Select Category</option>
          <option value="Web Development">Web Development</option>
          <option value="Design">Design</option>
          <option value="Writing">Writing</option>
          <option value="Marketing">Marketing</option>
        </select>

        <textarea name="description" className={darkMode?'text-white textarea textarea-bordered w-full bg-black ':'bg-white  textarea textarea-bordered w-full'} placeholder="Task Description" required />

        <input type="date" name="deadline" className={darkMode?'text-white placeholder-white input input-bordered w-full bg-black ':'bg-white input input-bordered w-full'} required />

        <input type="number" name="budget" placeholder="Budget ($)" className={darkMode?'text-white placeholder-white input input-bordered w-full bg-black ':'bg-white input input-bordered w-full'} required />

        <input type="email" value={user?.email} readOnly className={darkMode?'text-white placeholder-white input input-bordered w-full  bg-black ':' input input-bordered w-full bg-gray-100'} />
        <input type="text" className={darkMode?'text-white placeholder-white input input-bordered w-full  bg-black ':' input input-bordered w-full bg-gray-100'} value={user?.displayName} readOnly  />

        <button type="submit" className="btn btn-primary w-full">Add</button>
      </form>
    </div>
  );
};

export default AddTask;
