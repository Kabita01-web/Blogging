import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
import Dashboard from "./pages/Dashboard";
import EditPost from "./pages/EditPost";
import Layout from "./components/Layout.jsx";
import Contact from "./pages/Contact.jsx";
import AboutUs from "./pages/Aboutus.jsx";
import Blogs from "./pages/blogs.jsx";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="posts/:id" element={<PostDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="blogs" element={<Blogs />} />
          <Route
            path="create"
            element={token ? <CreatePost /> : <Navigate to="/login" />}
          />
          <Route
            path="dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="edit/:id"
            element={token ? <EditPost /> : <Navigate to="/login" />}
          />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
