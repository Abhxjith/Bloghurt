import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../firebase";

const Auth = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) {
      console.log("User signed in:", user);
      navigate("/blogs"); // Redirect to blog list page
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome to Bloghurt</h1>
        <p style={styles.subtitle}>
          Dive into the world of creativity. Share your stories. Discover new ideas.
        </p>
        <button style={styles.button} onClick={handleGoogleSignIn}>
          Sign in with Google
        </button>
      </div>
      <div style={styles.decorativeCircle}></div>
    </div>
  );
};

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #3D2CA3, #FFFFFF)",
    position: "relative",
    overflow: "hidden",
    color: "#FFFFFF",
    fontFamily: "Poppins, sans-serif",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    padding: "50px",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
    zIndex: 2,
  },
  title: {
    fontSize: "2.5rem",
    color: "#3D2CA3",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#6A6A6A",
    marginBottom: "30px",
  },
  button: {
    backgroundColor: "#3D2CA3",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "8px",
    padding: "15px 25px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.3s",
    letterSpacing: "1px",
  },
  buttonHover: {
    transform: "scale(1.05)",
    boxShadow: "0 8px 20px rgba(61, 44, 163, 0.5)",
  },
  decorativeCircle: {
    position: "absolute",
    width: "600px",
    height: "600px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "50%",
    top: "20%",
    left: "-20%",
    zIndex: 1,
    filter: "blur(80px)",
  },
};

export default Auth;
