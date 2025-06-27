import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { ModeContext } from "../../DarkLightMode/ModeContext";
// import StatCard from "../../components/StatCard";

const Overview = () => {
    const {user,loading}=useContext(AuthContext);
      const { darkMode, toggleDarkMode } = useContext(ModeContext);
    const [tasks, setTasks] = useState([]);
    const [myTasks, setMyTasks] = useState([]);
  useEffect(() => {
          fetch("https://freelancer-server-three.vercel.app/tasks")
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
              
              setTasks(data);
            })
            .catch((err) => console.error("Failed to fetch tasks:", err));
        }, []);
        
        useEffect(() => {
             if (!user) return;
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
  if (loading || !user) {
    return <span className="loading loading-spinner text-center loading-xl"></span>
  }

  return (
    <div className={ darkMode?' text-white' :'text-black bg-white '}>
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
       
        <div className={ darkMode?' text-white bg-black card  w-96 shadow-lg' :'text-black bg-white card  w-96 shadow-sm '}>
  <div className="card-body">
      <p>Total tasks: {tasks.length}</p>
        <p>My tasks:{myTasks.length}</p> 
    
  </div>
</div>
     
      </div>
    </div>
  );
};

export default Overview;
