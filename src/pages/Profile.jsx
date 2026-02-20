import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export function Profile() {
  const { username } = useParams();
  const [links, setLinks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://linkhub-imac.onrender.com/links/${username}`,
        );
        setLinks(response.data.links);
      } catch (err) {
        console.error("Usuário não encontrado");
      }
    }
    fetchData();
  }, [username]);

  // Implementação correta da rota: app.post("/link/:linkId/click", count)
  async function handleLinkClick(linkId, url) {
    try {
      await axios.post(
        `https://linkhub-imac.onrender.com/link/${linkId}/click`,
      );
    } catch (err) {
      console.error("Erro ao registrar clique");
    }
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center py-16 px-6 relative overflow-hidden">
      {/* Efeito de luz no fundo */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-120 flex flex-col items-center">
        {/* Avatar com borda gradiente */}
        <div className="p-1 rounded-full bg-linear-to-tr from-green-400 to-blue-500 shadow-2xl shadow-green-500/20 mb-6">
          <div className="w-24 h-24 bg-[#111] rounded-full flex items-center justify-center text-3xl font-bold uppercase border-4 border-[#0a0a0a]">
            {username?.charAt(0)}
          </div>
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight mb-2">
          @{username}
        </h1>
        <p className="text-gray-400 font-medium mb-10">
          Design focado em performance
        </p>

        {/* Lista de Links Estilizada */}
        <div className="w-full space-y-4">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id, link.url)}
              className="w-full group relative p-4 bg-white/3 hover:bg-white/8 border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-300 backdrop-blur-md flex items-center justify-between overflow-hidden"
            >
              {/* Efeito de brilho ao passar o mouse */}
              <div className="absolute inset-0 bg-linear-to-r from-green-500/0 via-green-500/5 to-green-500/0 translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <span className="font-semibold text-lg ml-4 text-gray-200 group-hover:text-white transition-colors">
                {link.title}
              </span>

              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mr-2 group-hover:bg-green-500 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 group-hover:text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>

        <footer className="mt-20 flex flex-col items-center gap-6 pb-12">
          {/* Botão de Conversão Viral */}
          <Link
            to="/"
            className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-full transition-all backdrop-blur-sm"
          >
            <span className="text-gray-400 text-sm group-hover:text-white transition-colors">
              Crie sua página também
            </span>
            <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center text-black font-black text-[10px] shadow-[0_0_15px_rgba(34,197,94,0.3)] group-hover:scale-110 transition-transform">
              L
            </div>
          </Link>

          {/* Logo discreta */}
          <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-20 hover:opacity-100 transition-opacity bg-clip-text text-transparent bg-linear-to-r from-green-400 to-blue-500">
            LinkDev Pro
          </span>
        </footer>
      </div>
    </div>
  );
}
