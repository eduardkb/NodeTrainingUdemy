import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Components
import Navbar from "./components/layout/NavbarPg";
import Footer from "./components/layout/FooterPg";
import Container from "./components/layout/Container";

// Import Pages
import Home from "./components/pages/Home";
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import NotFound from "./components/pages/NotFound";

// Import Context
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
