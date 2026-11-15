import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import GenresPage from "./pages/GenresPage.jsx";
import DirectorsPage from "./pages/DirectorsPage.jsx";
import ProducersPage from "./pages/ProducersPage.jsx";
import TypesPage from "./pages/TypesPage.jsx";
import MediaPage from "./pages/MediaPage.jsx";

function App() {
  return (
    <>
      <Navbar />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Navigate to="/media" replace />} />
          <Route path="/genres" element={<GenresPage />} />
          <Route path="/directors" element={<DirectorsPage />} />
          <Route path="/producers" element={<ProducersPage />} />
          <Route path="/types" element={<TypesPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="*" element={<Navigate to="/media" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
