import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export function Home() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleClaimUsername = (e) => {
    e.preventDefault();
    if (username) navigate(`/register?username=${username.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-green-500/30 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-125 bg-green-500/5 blur-[120px] pointer-events-none" />

      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
          LinkDev<span className="text-green-500">.</span>
        </div>
        <Link
          to="/admin"
          className="text-sm font-bold hover:text-green-400 transition-colors"
        >
          Entrar
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-20 pb-32 text-center relative z-10">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
          Sua presença online em{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-blue-500">
            um só link.
          </span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
          Crie uma página elegante para seus links e acompanhe seus cliques em
          tempo real.
        </p>

        <form
          onSubmit={handleClaimUsername}
          className="flex flex-col md:flex-row items-center gap-3 bg-white/5 p-2 rounded-3xl border border-white/10 max-w-xl mx-auto backdrop-blur-xl shadow-2xl"
        >
          <div className="flex items-center flex-1 pl-6 py-3 md:py-0">
            <span className="text-gray-500 font-bold mr-1 italic">
              linkdev/
            </span>
            <input
              type="text"
              placeholder="seu-nome"
              className="bg-transparent border-none outline-none font-bold text-white placeholder:text-gray-700 w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <button className="w-full md:w-auto px-8 py-4 bg-green-500 hover:bg-green-400 text-black font-black rounded-2xl transition-all">
            Criar minha página
          </button>
        </form>
      </main>
    </div>
  );
}
