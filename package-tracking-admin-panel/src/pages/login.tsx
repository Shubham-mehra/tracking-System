import { useAdminAuth } from "@/hooks/useAdminAuth";
export default function LoginPage() {
  const {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
  } = useAdminAuth();

  return (
    <div className="p-10 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <input
        className="border w-full p-2 mb-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border w-full p-2 mb-3"
        placeholder="Password"
        type="password"
        value={password}
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

