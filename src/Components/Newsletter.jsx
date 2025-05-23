import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { ModeContext } from '../DarkLightMode/ModeContext';


const Newsletter = () => {
  const [email, setEmail] = useState('');
  const { darkMode } = useContext(ModeContext);

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.includes('@')) {
      toast.error('Please enter a valid email!');
      return;
    }
    toast.success('Subscribed Successfully!');
    setEmail('');
  };
// max-w-7xl mx-auto my-16 p-8 bg-blue-50 rounded-lg text-center
  return (
    <div className={darkMode?"max-w-7xl mx-auto my-16 p-8 rounded-lg text-center  text-white bg-slate-800":"max-w-7xl mx-auto my-16 p-8 bg-blue-50 rounded-lg text-center"}>
      <h2 className="text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
      <p className={darkMode?"mb-6 text-white":"mb-6 text-gray-600"}>
        Get updates about  tasks directly in your inbox.
      </p>
      <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4 items-center justify-center">
        <input 
          type="email" 
          placeholder="Enter your email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={darkMode?"p-3 placeholder-white rounded-md border  border-gray-300 w-72":"p-3 rounded-md border  border-gray-300 w-72"}
          required
        />
        <button 
          type="submit"
          className="bg-[#005cbc] hover:bg-blue-400 text-white px-6 py-3 rounded-md transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
