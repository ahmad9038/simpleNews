import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import NewsPage from "./pages/NewsPage";
import Logo from "./components/Logo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/news/:id" element={<NewsPage />} />
    </Routes>
  );
}

export default App;
