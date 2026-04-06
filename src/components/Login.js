// src/components/Login.js
import React from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase";

function Login({ user, setUser }) {
  const handleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      {user ? (
        <>
          <p>Signed in as {user.displayName}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Sign in with Google</button>
      )}
    </div>
  );
}

export default Login;
