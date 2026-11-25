// @ts-nocheck
import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { motion } from "framer-motion";

import RestoreIcon from "@mui/icons-material/Restore";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import AddIcon from "@mui/icons-material/Add";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardOutlinedIcon from "@mui/icons-material/KeyboardOutlined";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import ScreenShareOutlinedIcon from "@mui/icons-material/ScreenShareOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import "../App.css";

function HomeComponent() {
  const navigate = useNavigate();

  const [meetingCode, setMeetingCode] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState("");

  const { addToUserHistory } = useContext(AuthContext);

  // Generate meeting code
  const generateMeetingCode = () => {
    const code = Math.random().toString(36).substring(2, 8);
    setMeetingCode(code);
    setError("");
  };

  // Join meeting
  const handleJoinVideoCall = async (e) => {
    e?.preventDefault();

    const code = meetingCode.trim();

    if (!code || joining) return;

    setJoining(true);
    setError("");

    try {
      await addToUserHistory(code);
      navigate(`/meet/${encodeURIComponent(code)}`);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to join meeting. Please try again."
      );
    } finally {
      setJoining(false);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  // Dynamic greeting
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 17
      ? "Good afternoon"
      : "Good evening";

  return (
    <div
      className={`spatialHome ${
        darkMode ? "spatialNight" : ""
      }`}
    >

      {/* ================= NAVBAR ================= */}

      <nav className="spatialHomeNav">

        <div className="spatialHomeBrand">
          ◈ ApnaMeet
        </div>

        <div className="spatialHomeNavLinks">

          {/* Theme toggle */}

          <button
            onClick={() => setDarkMode(!darkMode)}
            title="Change appearance"
            aria-label="Change appearance"
          >
            {darkMode ? (
              <LightModeOutlinedIcon />
            ) : (
              <DarkModeOutlinedIcon />
            )}
          </button>

          {/* Meeting history */}

          <button
            onClick={() => navigate("/history")}
            title="Meeting history"
            aria-label="Meeting history"
          >
            <RestoreIcon />
          </button>

          {/* Calendar */}

          <button
            onClick={() => navigate("/calendar")}
            aria-label="Calendar"
          >
            <EventOutlinedIcon />
            <span>Calendar</span>
          </button>

          {/* Workspaces */}

          <button
            onClick={() => navigate("/workspaces")}
            aria-label="Workspaces"
          >
            <LayersOutlinedIcon />
            <span>Workspaces</span>
          </button>

          {/* Logout */}

          <button
            className="spatialLogout"
            onClick={handleLogout}
            aria-label="Logout"
          >
            <LogoutIcon />
            <span>Logout</span>
          </button>

        </div>

      </nav>

      {/* ================= MAIN SECTION ================= */}

      <main className="spatialHomeMain">

        {/* ================= LEFT SECTION ================= */}

        <motion.section
          className="spatialHomeLeft"
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          <div className="spatialHomeEyebrow">
            <span className="spatialOnlineDot" />
            YOUR PERSONAL WORKSPACE
          </div>

          <h1>
            {greeting}.
            <br />
            <span>Let's connect.</span>
          </h1>

          <p className="spatialHomeDescription">
            Meaningful conversations, wherever you are.
            <br />
            Your next meeting is just a moment away.
          </p>

          {/* ================= MEETING CARD ================= */}

          <div className="spatialMeetingCard">

            <div className="spatialMeetingTitle">

              <div className="spatialMeetingIcon">
                <VideoCallOutlinedIcon />
              </div>

              <div>
                <h3>Start a conversation</h3>
                <p>Join or create your meeting space.</p>
              </div>

            </div>

            <form onSubmit={handleJoinVideoCall}>

              {/* Meeting code input */}

              <div className="spatialMeetingInput">

                <KeyboardOutlinedIcon />

                <input
                  type="text"
                  placeholder="Enter meeting code"
                  aria-label="Meeting code"
                  value={meetingCode}
                  onChange={(e) => {
                    setMeetingCode(e.target.value);
                    setError("");
                  }}
                  autoComplete="off"
                />

              </div>

              {/* Error message */}

              {error && (
                <p
                  className="spatialHomeError"
                  role="alert"
                >
                  {error}
                </p>
              )}

              {/* Meeting actions */}

              <div className="spatialMeetingActions">

                <button
                  className="spatialJoinButton"
                  type="submit"
                  disabled={!meetingCode.trim() || joining}
                >
                  {joining ? "Joining..." : "Join meeting"}
                  <ArrowForwardIcon />
                </button>

                <button
                  className="spatialNewButton"
                  type="button"
                  onClick={generateMeetingCode}
                  disabled={joining}
                >
                  <AddIcon />
                  New meeting
                </button>

              </div>

            </form>

            <div className="spatialMeetingNote">
              <LockOutlinedIcon />
              <span>
                Private meeting spaces · WebRTC powered
              </span>
            </div>

          </div>

        </motion.section>

        {/* ================= RIGHT SECTION ================= */}

        <motion.section
          className="spatialHomeRight"
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.96
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1
          }}
          transition={{
            duration: 1,
            delay: 0.2
          }}
        >

          {/* Floating browser bar */}

          <div className="spatialPreviewBar">

            <span>◈</span>

            <div>
              ApnaMeet · Meeting Space
            </div>

            <MoreHorizIcon />

          </div>

          {/* Glass meeting window */}

          <div className="spatialPreviewWindow">

            <div className="spatialPreviewHeader">

              <div>
                <span className="spatialPreviewDot" />
                Your meeting space
              </div>

              <span>Standby mode</span>

            </div>

            {/* ================= EMPTY MEETING LOBBY ================= */}

            <div className="spatialEmptyPreview">

              <div className="spatialPreviewGlow" />

              {/* Animated camera icon */}

              <div className="spatialCameraOrb">
                <VideocamOutlinedIcon />
              </div>

              <h2>Ready to connect.</h2>

              <p>Your meeting space awaits.</p>

              <div className="spatialStandby">
                <span />
                Waiting to join a meeting
              </div>

            </div>

            <div className="spatialPreviewCaption">
              Distance disappears when we connect.
            </div>

          </div>

          {/* ================= FLOATING CONTROL DOCK ================= */}

          <div
            className="spatialPreviewDock"
            aria-hidden="true"
          >

            <span>
              <MicNoneOutlinedIcon />
            </span>

            <span>
              <VideocamOutlinedIcon />
            </span>

            <span>
              <ScreenShareOutlinedIcon />
            </span>

            <span>
              <ChatBubbleOutlineIcon />
            </span>

            <span>
              <MoreHorizIcon />
            </span>

            <span className="spatialPreviewEnd">
              <CallEndIcon />
            </span>

          </div>

          {/* Spatial home indicator */}

          <div className="spatialHomeIndicator" />

        </motion.section>

      </main>

      {/* ================= FOOTER ================= */}

      <footer className="spatialHomeFooter">

        <span>ApnaMeet © 2026</span>

        <span>Designed for human connection.</span>

      </footer>

    </div>
  );
}

export default withAuth(HomeComponent);