import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

export default function LandingPage() {
  const router = useNavigate();

  const participants = [
    { name: "Olivia", image: "47" },
    { name: "Sophia", image: "44" },
    { name: "James", image: "12" },
    { name: "Daniel", image: "32" },
    { name: "Emma", image: "25" },
    { name: "Alex", image: "11" },
  ];

  return (
    <div className="visionLanding">

      <nav className="visionNav">
        <h2>◈ ApnaMeet</h2>

        <div className="visionNavLinks">
          <button onClick={() => router("/meet/aljk23")}>
            Join as Guest
          </button>

          <button onClick={() => router("/auth")}>
            Register
          </button>

          <Link to="/auth">Login ↗</Link>
        </div>
      </nav>

      <main className="visionMain">

        <div className="visionHeading">
          <span>THE FUTURE OF CONNECTION</span>
          <h1>Presence, beyond distance.</h1>
          <p>A more human way to meet.</p>
        </div>

        <div className="visionWorkspace">

          <div className="visionBrowser">
            <span>◉　‹　›</span>
            <div>♧　ApnaMeet · Meeting Space</div>
            <span>⚙　＋　↗</span>
          </div>

          <div className="visionWindow">

            <div className="visionMeeting">

              <div className="visionMeetingHeader">
                <span>●　Meeting preview</span>
                <span>6 Participants</span>
              </div>

              <div className="visionGrid">
                {participants.map((person) => (
                  <div className="visionParticipant" key={person.name}>
                    <img
                      src={`https://i.pravatar.cc/400?img=${person.image}`}
                      alt={person.name}
                    />
                    <span>{person.name}</span>
                  </div>
                ))}
              </div>

            </div>

            <aside className="visionChat">

              <div className="visionChatHeader">
                In-call messages <span>×</span>
              </div>

              <div className="visionMessage">
                <small>Olivia</small>
                <p>Hey everyone! 👋</p>
              </div>

              <div className="visionMessage">
                <small>James</small>
                <p>Great to see you all.</p>
              </div>

              <div className="visionMessage">
                <small>Sophia</small>
                <p>Let's get started!</p>
              </div>

              <div className="visionMessage ownMessage">
                <small>You</small>
                <p>Absolutely ✨</p>
              </div>

              <div className="visionChatInput">
                Send a message... <span>➤</span>
              </div>

            </aside>
          </div>

          <div className="visionControls" aria-hidden="true">
            <span>♩</span>
            <span>▣</span>
            <span>▤</span>
            <span>☺</span>
            <span>⌘</span>
            <span>⋮</span>
            <span className="visionEndCall">☎</span>
          </div>

        </div>

        <div className="visionActions">
          <Link to="/auth" className="visionPrimary">
            Start a meeting ↗
          </Link>

          <button
            className="visionSecondary"
            onClick={() => router("/meet/aljk23")}
          >
            Join as Guest
          </button>
        </div>

      </main>

      <footer className="visionFooter">
        <span>ApnaMeet © 2026</span>
        <span>Designed for human connection.</span>
      </footer>

    </div>
  );
}