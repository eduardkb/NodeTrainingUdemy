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
import Message from "./components/layout/Message";
import Profile from "./components/pages/User/Profile";
import MyPets from "./components/pages/Pet/MyPets";
import AddPet from "./components/pages/Pet/AddPet";

// Import Context
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/pet/mypets" element={<MyPets />} />
            <Route path="/pet/add" element={<AddPet />} />
            <Route path="*" element={<MyPets />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
