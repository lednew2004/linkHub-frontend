import { useEffect, useState } from "react";
import axios from "axios";

export function Admin() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [links, setLinks] = useState([]);
  const [user, setUser] = useState(null);
  const [newLink, setNewLink] = useState({ title: "", url: "" });
  const [copied, setCopied] = useState(false);

  // FUNÇÃO: Logout
  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  // FUNÇÃO: Carregar Dados
  async function loadData() {
    try {
      const meRes = await axios.get("https://linkhub-imac.onrender.com/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(meRes.data.user);

      const linksRes = await axios.get(
        `https://linkhub-imac.onrender.com/links/${meRes.data.user.userName}`,
      );
      setLinks(linksRes.data.links);
    } catch (err) {
      if (err.response?.status === 401) handleLogout();
    }
  }

  useEffect(() => {
    if (token) loadData();
  }, [token]);

  // FUNÇÃO: Criar Link
  async function handleCreateLink(e) {
    e.preventDefault();
    try {
      await axios.post(
        "https://linkhub-imac.onrender.com/create/link",
        newLink,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setNewLink({ title: "", url: "" });
      loadData();
    } catch (err) {
      alert("Erro ao criar link.");
    }
  }

  // FUNÇÃO: Deletar Link
  async function handleDeleteLink(linkId) {
    if (!confirm("Confirmar exclusão?")) return;
    try {
      await axios.delete(`https://linkhub-imac.onrender.com/link/${linkId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLinks(links.filter((l) => l.id !== linkId));
    } catch (err) {
      alert("Erro ao deletar link.");
    }
  }

  // FUNÇÃO: Copiar Link
  function handleCopyLink() {
    const publicUrl = `${window.location.origin}/${user?.userName}`;
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Se não tem token, mostra o formulário de Login simplificado
  if (!token) return <Login setToken={setToken} />;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans">
      {/* Navbar Superior */}
      <nav className=" border-b border-slate-200 px-6 py-4 sticky top-0 z-50 backdrop-blur-md bg-white/80">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">
              L
            </div>
            <span className="font-black text-xl tracking-tighter">
              LinkDev<span className="text-green-500">.</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleCopyLink}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-sm font-bold transition-all"
            >
              {copied ? "✅ Copiado!" : "🔗 Meu Link"}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-full transition-all"
            >
              Sair
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-8 mt-4">
        {/* Formulário */}
        <div className="md:col-span-5">
          <div className="bg-white p-8 rounded-4xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-black mb-6 text-transparent bg-clip-text bg-linear-to-r from-gray-900 to-gray-500">
              Novo Link
            </h2>
            <form onSubmit={handleCreateLink} className="space-y-4">
              <input
                className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Título (Ex: Meu LinkedIn)"
                value={newLink.title}
                onChange={(e) =>
                  setNewLink({ ...newLink, title: e.target.value })
                }
              />
              <input
                className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="URL (https://...)"
                value={newLink.url}
                onChange={(e) =>
                  setNewLink({ ...newLink, url: e.target.value })
                }
              />
              <button className="w-full bg-black text-white p-4 rounded-2xl font-bold shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                Adicionar Link
              </button>
            </form>
          </div>
        </div>

        {/* Lista de Links */}
        <div className="md:col-span-7">
          <h2 className="text-xl font-black mb-6">Links Ativos</h2>
          <div className="grid gap-4">
            {links.map((link) => (
              <div
                key={link.id}
                className="bg-white p-6 rounded-4xl border border-slate-100 flex items-center justify-between group hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col">
                  <span className="font-extrabold text-lg text-slate-800">
                    {link.title}
                  </span>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase italic">
                      ● {link.count} clicks
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteLink(link.id)}
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// Componente Login agora focado apenas em... logar!
function Login({ setToken }) {
  const [data, setData] = useState({ email: "", password: "" });

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://linkhub-imac.onrender.com/sessions",
        data,
      );
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
    } catch (err) {
      alert("Falha no login");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-[2.5rem] shadow-2xl w-full max-w-sm space-y-6"
      >
        <div className="text-center">
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter italic">
            LinkDev<span className="text-green-500">_</span>
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Acesse seu painel administrativo
          </p>
        </div>
        <div className="space-y-3">
          <input
            className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all"
            type="email"
            placeholder="E-mail"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <input
            className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all"
            type="password"
            placeholder="Senha"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <button className="w-full bg-black text-white p-4 rounded-2xl font-bold shadow-lg hover:bg-gray-800 transition-all">
          Entrar no Sistema
        </button>
      </form>
    </div>
  );
}
