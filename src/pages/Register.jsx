import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import axios from "axios";

export function Register() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    userName: searchParams.get("username") || "",
    email: "",
    password: "",
    biography: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // Enviando exatamente o que o seu Backend (Zod) espera
      await axios.post("https://linkhub-imac.onrender.com/register", formData);

      alert("Conta criada com sucesso! Faça seu login.");
      navigate("/admin");
    } catch (err) {
      console.error("Erro de validação:", err.response?.data);
      const errorMessage =
        err.response?.data?.message ||
        "Verifique se os dados estão corretos (Senha min. 6 caracteres)";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6 text-white selection:bg-green-500/30">
      {/* Background Decorativo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-75 bg-green-500/10 blur-[100px] pointer-events-none" />

      <form
        onSubmit={handleRegister}
        className="bg-white/5 p-8 md:p-10 rounded-[2.5rem] border border-white/10 w-full max-w-xl space-y-6 backdrop-blur-xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black tracking-tighter italic mb-2">
            Junte-se ao LinkDev
          </h2>
          <p className="text-gray-400 text-sm">
            Crie seu perfil profissional em poucos segundos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nome Completo */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-2">
              Nome Completo
            </label>
            <input
              className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all text-white"
              placeholder="Ex: João Silva"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          {/* Username */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-2">
              Username
            </label>
            <input
              className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all text-white"
              placeholder="joaosilva"
              value={formData.userName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  userName: e.target.value.toLowerCase().replace(/\s/g, ""),
                })
              }
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase ml-2">
            E-mail
          </label>
          <input
            className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all text-white"
            type="email"
            placeholder="contato@email.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>

        {/* Senha */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase ml-2">
            Senha (Mín. 6 caracteres)
          </label>
          <input
            className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all text-white"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>

        {/* Biografia */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase ml-2">
            Sua Biografia
          </label>
          <textarea
            className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all text-white h-24 resize-none"
            placeholder="Conte um pouco sobre você..."
            value={formData.biography}
            onChange={(e) =>
              setFormData({ ...formData, biography: e.target.value })
            }
            required
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-400 disabled:bg-green-800 text-black p-5 rounded-2xl font-black text-lg shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          {loading ? "Criando conta..." : "Criar minha página gratuita"}
        </button>

        <p className="text-center text-gray-500 text-sm">
          Já tem uma conta?{" "}
          <Link to="/admin" className="text-green-500 hover:underline">
            Entrar
          </Link>
        </p>
      </form>
    </div>
  );
}
