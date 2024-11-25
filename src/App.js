import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";  // Import the Home component
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetails";
import CreateBlog from "./pages/CreateBlog";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import EditBlog from "./pages/EditBlog";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />        {/* Changed to Home component */}
          <Route path="/landing" element={<Landing />} /> {/* Moved Landing to /landing route */}
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Register />} />

          {/* Blog pages (protected) */}
          <Route
            path="/blogs"
            element={
              <PrivateRoute>
                <BlogList />
              </PrivateRoute>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <PrivateRoute>
                <BlogDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-blog"
            element={
              <PrivateRoute>
                <CreateBlog />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-blog/:id"
            element={
              <PrivateRoute>
                <EditBlog />
              </PrivateRoute>
            }
          />

          {/* Fallback for undefined routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;