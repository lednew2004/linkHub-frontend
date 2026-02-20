import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home"; // Importe a Home
import { Register } from "./pages/Register"; // Importe o Register
import { Profile } from "./pages/Profile";
import { Admin } from "./pages/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Agora a raiz é a Home! */}
        <Route path="/" element={<Home />} />

        {/* Nova rota de cadastro */}
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/:username" element={<Profile />} />

        <Route
          path="*"
          element={
            <div className="flex h-screen items-center justify-center text-white bg-black">
              404 - Não encontrado
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
