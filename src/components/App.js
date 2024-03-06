import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Chats from "./Chats";
import Login from "./Login";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/chats" element={<Chats/>} />
          <Route path="/" element={<Login/>} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
