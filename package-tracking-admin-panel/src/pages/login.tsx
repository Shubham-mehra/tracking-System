// // /pages/login.tsx
// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import { useAuthStore } from '@/store/authStore';
// import { loginUser } from '@/utils/auth';



// export default function LoginPage() {
//   const router = useRouter();
//   const { login } = useAuthStore();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const { token, role } = await loginUser(email, password);
//       login(token, role);
//       if (role === 'admin') router.push('/admin/dashboard');
//       else alert('Access denied: not an admin');
//     } catch (err) {
//       alert('Invalid credentials');
//     }
//   };

//   return (
//     <div className="p-10 max-w-sm mx-auto">
//       <h2 className="text-xl font-bold mb-4">Admin Login</h2>
//       <input className="border w-full p-2 mb-3" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//       <input className="border w-full p-2 mb-3" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2">Login</button>
//     </div>
//   );
// }


import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/authStore';
import { loginUser } from '@/utils/auth';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const { token, role } = await loginUser(email, password);

      // Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Call Zustand store login method
      login(token, role);

      // Redirect if role is admin
      if (role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        alert('Access denied: not an admin');
      }
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="p-10 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <input
        className="border w-full p-2 mb-3"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border w-full p-2 mb-3"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Login
      </button>
    </div>
  );
}
