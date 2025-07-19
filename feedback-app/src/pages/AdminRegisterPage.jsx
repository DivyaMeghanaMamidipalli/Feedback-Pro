// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom'; 
// import axios from 'axios';

// export default function AdminRegisterPage() {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError(''); 

//     try {
//       await axios.post(`${import.meta.env.VITE_API_BASE_URL}/register/`, {
//         username,
//         email,
//         password,
//       });

//       const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/token/`, {
//         username,
//         password,
//       });

//       localStorage.setItem('accessToken', response.data.access);
//       localStorage.setItem('refreshToken', response.data.refresh);
//       navigate('/admin/dashboard');

//     } catch (err) {
//       console.error("Registration failed:", err);
//       if(err.response){
//         const messages = Object.values(err.response.data).flat();
//         setError(messages.join(' ')); 
//       }
//       else{
//         setError('Cannot connect to the server. Please try again later.');
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
//         <h1 className="text-3xl font-bold text-center text-gray-800">Admin Registration</h1>
//         <form onSubmit={handleRegister} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Username</label>
//             <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm"/>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm"/>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm"/>
//           </div>
//           {error && <p className="text-sm text-center text-red-500">{error}</p>}
//           <button type="submit" className="w-full p-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700">Register</button>
//         </form>

//         {/* NEW LINK TO LOGIN PAGE */}
//         <p className="text-sm text-center text-gray-600">
//           Already have an account?{' '}
//           <Link to="/admin/login" className="font-medium text-blue-600 hover:underline">
//             Log In
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function AdminRegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const registerUrl = ${import.meta.env.VITE_API_BASE_URL}/register/;
    const tokenUrl = ${import.meta.env.VITE_API_BASE_URL}/token/;
    
    // For debugging, let's log what we are about to send
    console.log("Submitting registration with:", { username, email, password });

    try {
      await axios.post(registerUrl, {
        username,
        email,
        password,
      });

      const response = await axios.post(tokenUrl, {
        username,
        password,
      });

      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      navigate('/admin/dashboard');

    } catch (err) {
      console.error("Registration failed:", err);

      // ==========================================================
      // THIS IS THE CRUCIAL UPGRADE
      // ==========================================================
      if (err.response && err.response.data) {
        // The server sent back a specific validation error.
        // We will format and display it.
        const errorData = err.response.data;
        let errorMessages = [];
        // Loop through the error object from Django (e.g., { username: ['...'], password: ['...'] })
        for (const key in errorData) {
          if (Array.isArray(errorData[key])) {
            errorMessages.push(${key}: ${errorData[key].join(' ')});
          }
        }
        setError(errorMessages.join(' '));
      } else {
        // This is a network error (server is down, etc.)
        setError('Cannot connect to the server. Please try again later.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">Admin Registration</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm"/>
          </div>
          {/* This error display will now be much more informative */}
          {error && <p className="text-sm text-center text-red-500">{error}</p>}
          <button type="submit" className="w-full p-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700">Register</button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/admin/login" className="font-medium text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
