import React, { useContext, useEffect, useState } from 'react';
import { ModeContext } from '../DarkLightMode/ModeContext';
import { Link } from 'react-router';

const Browse = () => {
    const [tasks, setTasks] = useState([]);
      const { darkMode } = useContext(ModeContext);
    
      useEffect(() => {
        fetch("https://freelancer-server-three.vercel.app/tasks")
          .then((res) => res.json())
          .then((data) => {
            
            setTasks(data);
          })
          .catch((err) => console.error("Failed to fetch tasks:", err));
      }, []);
    
      return (
        <div className="max-w-7xl my-10 mx-auto p-4 min-h-screen">
          
          {tasks.length === 0 && <p>No tasks found.</p>}
    
    
          <ul className="space-y-4 grid  grid-cols-1 ">
            {tasks.map((task) => (
              <li key={task._id} className={darkMode?"bg-slate-800 space-y-4 text-white  drop-shadow-lg  p-4 rounded shadow":"drop-shadow-lg bg-gray-100 space-y-4  p-4 rounded shadow"}>
                <h3 className=" h1 font-semibold text-blue-700 text-lg">{task.title}</h3>
                <p>Category: {task.category}</p>
                {/* <p>Description: {task.description}</p> */}
                <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
                <p>Budget: ${task.budget}</p>
                {/* <p>Posted by: {task.name} ({task.email})</p> */}
                <Link to={`/browse/${task._id}`}><button className='btn btn-primary'>See detail</button></Link>
              </li>
            ))}
          </ul>
        </div>
      );
};

export default Browse;