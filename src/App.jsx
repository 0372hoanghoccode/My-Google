import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "./utils/ContextApi";
import Home from "./components/Home";
import SearchResult from "./components/SearchResult";
import Settings from "./components/Settings";
import ErrorPage from "./components/ErrorPage";
import VoiceSearch from "./components/VoiceSearch";
import ImageSearch from "./components/ImageSearch";

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