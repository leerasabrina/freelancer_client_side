import { FaClipboardList, FaUserTie, FaThList, FaSmile } from "react-icons/fa";
import { ModeContext } from "../DarkLightMode/ModeContext";
import { useContext } from "react";

const Highlights = () => {
    const { darkMode } = useContext(ModeContext);
  const highlights = [
    {
      icon: <FaClipboardList className="text-4xl text-blue-600" />,
      label: "Total Tasks Posted",
      value: "300+",
    },
    {
      icon: <FaUserTie className="text-4xl text-green-600" />,
      label: "Freelancers Registered",
      value: "100+",
    },
    {
      icon: <FaThList className="text-4xl text-purple-600" />,
      label: "Categories",
      value: "5+",
    },
    {
      icon: <FaSmile className="text-4xl text-yellow-500" />,
      label: "Satisfaction Rate",
      value: "98%",
    },
  ];


// p-8 max-w-7xl mx-auto bg-blue-50 rounded-2xl
// bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center transition-transform hover:scale-105
// text-gray-600 mt-1

  return (
<section className={darkMode?"p-8 max-w-7xl mx-auto bg-slate-800 rounded-2xl":"p-8 max-w-7xl mx-auto bg-blue-50 rounded-2xl"}>
      <div className=" px-4 text-center">
        <h2 className="text-3xl font-bold mb-8"> Platform Stats / Highlights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className={darkMode?"bg-[#1b1d2c] text-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center transition-transform hover:scale-105":"bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center transition-transform hover:scale-105"}
            >
              {item.icon}
              <h3 className="text-xl font-semibold mt-4">{item.value}</h3>
              <p className={darkMode?"text-white mt-1":"text-gray-600 mt-1"}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
