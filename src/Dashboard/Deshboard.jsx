import { useContext } from "react";
import { NavLink, Outlet } from "react-router";
import { ModeContext } from "../DarkLightMode/ModeContext";

const Dashboard = () => {
   const { darkMode, toggleDarkMode } = useContext(ModeContext);
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className={ darkMode?'w-64 p-4 bg-black text-white' :'text-black bg-white w-64 p-4'}>
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <ul>
          <li><NavLink to="/dashboard" end>Overview</NavLink></li>
          <li><NavLink to="/dashboard/all-items">All Items</NavLink></li>
          <li><NavLink to="/dashboard/add-item">Add Item</NavLink></li>
          <li><NavLink to="/dashboard/my-items">My Items</NavLink></li>
        </ul>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
