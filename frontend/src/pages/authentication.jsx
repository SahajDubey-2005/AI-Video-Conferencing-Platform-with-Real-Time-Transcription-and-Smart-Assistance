import React, { useState, useContext } from "react";
import { Snackbar, CircularProgress } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "../App.css";

const Authentication = () => {
  const { handleLogin, handleRegister } = useContext(AuthContext);

  const [tab, setTab] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    try {
      if (tab === 0) {
        await handleLogin(username, password);
      } else {
        const res = await handleRegister(name, username, password);

        setMessage(res);
        setOpen(true);
        setTab(0);
        setName("");
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong";

      if (
        err?.code === "ERR_NETWORK" ||
        err?.message?.includes("Network Error")
      ) {
        setError("Unable to connect to the backend server.");
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const changeTab = (value) => {
    setTab(value);
    setError("");
    setShowPassword(false);
  };

  return (
    <div className="spatialAuth">

      {/* Floating Navbar */}
      <nav className="spatialAuthNav">
        <Link to="/" className="spatialAuthBrand">
          ◈ ApnaMeet
        </Link>

        <Link to="/" className="spatialBack">
          <ArrowBackIcon />
          Back to home
        </Link>
      </nav>

      <main className="spatialAuthMain">

        <motion.div
          className="spatialAuthIntro"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span>YOUR PERSONAL MEETING SPACE</span>

          <h1>Connection starts here.</h1>

          <p>A little closer, wherever you are.</p>
        </motion.div>

        <motion.div
          className="spatialAuthWorkspace"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >

          {/* Floating Window Bar */}
          <div className="spatialAuthBar">
            <LockOutlinedIcon />
            <span>ApnaMeet · Account</span>
            <span>◈</span>
          </div>

          {/* Glass Authentication Window */}
          <div className="spatialAuthCard">

            <div className="spatialAuthSymbol">
              ◈
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                className="spatialAuthHeading"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <h2>
                  {tab === 0
                    ? "Welcome back."
                    : "Make yourself at home."}
                </h2>

                <p>
                  {tab === 0
                    ? "Your space awaits."
                    : "Create your personal meeting space."}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Glass Tabs */}
            <div className="spatialAuthTabs">

              <motion.div
                className="spatialTabIndicator"
                animate={{ x: tab === 0 ? "0%" : "100%" }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 30
                }}
              />

              <button
                type="button"
                className={tab === 0 ? "active" : ""}
                onClick={() => changeTab(0)}
                disabled={loading}
              >
                Sign in
              </button>

              <button
                type="button"
                className={tab === 1 ? "active" : ""}
                onClick={() => changeTab(1)}
                disabled={loading}
              >
                Register
              </button>

            </div>

            <form
              className="spatialAuthForm"
              onSubmit={handleAuth}
            >

              <AnimatePresence initial={false}>
                {tab === 1 && (
                  <motion.div
                    className="spatialNameField"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="spatialInput">
                      <PersonOutlineIcon />

                      <input
                        type="text"
                        placeholder="Full name"
                        aria-label="Full name"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="spatialInput">
                <PersonOutlineIcon />

                <input
                  type="text"
                  placeholder="Username"
                  aria-label="Username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="spatialInput">
                <LockOutlinedIcon />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  aria-label="Password"
                  autoComplete={
                    tab === 0
                      ? "current-password"
                      : "new-password"
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="spatialPasswordToggle"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword
                    ? <VisibilityOffOutlinedIcon />
                    : <VisibilityOutlinedIcon />}
                </button>
              </div>

              {error && (
                <div className="spatialAuthError" role="alert">
                  {error}
                </div>
              )}

              <button
                className="spatialAuthSubmit"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress
                    size={22}
                    sx={{ color: "#42382d" }}
                  />
                ) : (
                  <>
                    {tab === 0
                      ? "Enter your space"
                      : "Create your account"}

                    <ArrowForwardIcon />
                  </>
                )}
              </button>

            </form>

            <div className="spatialAuthBottom">
              <LockOutlinedIcon />
              <span>Welcome to your personal meeting space.</span>
            </div>

          </div>

          {/* Vision OS Home Indicator */}
          <div className="spatialAuthIndicator" />

        </motion.div>

      </main>

      <footer className="spatialAuthFooter">
        <span>ApnaMeet © 2026</span>
        <span>Designed for human connection.</span>
      </footer>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        message={message}
        onClose={() => setOpen(false)}
      />

    </div>
  );
};

export default Authentication;