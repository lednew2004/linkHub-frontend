import { useState } from "react";
import axios from "axios";

export function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://linkhub-imac.onrender.com/sessions",
        {
          email,
          password,
        },
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      onLoginSuccess(token);
    } catch (err) {
      alert("E-mail ou senha incorretos.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Admin Login
        </h2>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="E-mail"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors">
            Entrar no Painel
          </button>
        </div>
      </form>
    </div>
  );
}
