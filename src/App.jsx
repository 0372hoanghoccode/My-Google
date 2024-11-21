import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "./utils/ContextApi";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import Settings from "./pages/Settings";
import ErrorPage from "./pages/ErrorPage";
import VoiceSearch from "./pages/VoiceSearch";
import ImageSearch from "./pages/ImageSearch";

function App() {
  return (
    <AppContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:query/:startIndex" element={<SearchResult />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/voice-search" element={<VoiceSearch />} />
          <Route path="/image-search" element={<ImageSearch />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AppContext>
  );
}

export default App;