import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToken("fake-token");
    setUser(email);
  };

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-90 shadow-2xl rounded-2xl backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Bienvenido de nuevo
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
