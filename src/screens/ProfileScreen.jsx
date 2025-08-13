import React, { useEffect, useState } from "react";
import ToggleSwitch from "../components/toggleSwitch";
import "./profileScreen.scss";

const ChallengeCircle = ({ percentage }) => {
  const r = 28;                 
  const c = 2 * Math.PI * r;      
  const [offset, setOffset] = useState(c);

  useEffect(() => {
    const next = c * (1 - Math.min(Math.max(percentage, 0), 100) / 100);
    const t = setTimeout(() => setOffset(next), 50);
    return () => clearTimeout(t);
  }, [c, percentage]);

  return (
    <svg className="cc" width="72" height="72" viewBox="0 0 72 72">
      <circle className="cc-track" cx="36" cy="36" r={r} />
      <circle
        className="cc-progress"
        cx="36"
        cy="36"
        r={r}
        strokeDasharray={c}
        strokeDashoffset={offset}
      />
    </svg>
  );
};

export default function ProfileScreen() {
  return (
    <div className="profile-page">
      <div className="content">
        {/* Header */}
        <div className="profile-header">
          <img
            className="avatar"
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="User avatar"
          />
          <div>
            <h2 className="title">Welcome!</h2>
            <p className="subtitle">Your challenges</p>
          </div>
        </div>

        {/* Challenges */}
        <div className="challenge-card">
          <ChallengeCircle percentage={50} />
          <div className="challenge-text">
            <div className="pct">50%</div>
            <div className="label">You listened calming sounds 5/10 days in a row</div>
          </div>
        </div>

        <div className="challenge-card">
          <ChallengeCircle percentage={90} />
          <div className="challenge-text">
            <div className="pct">90%</div>
            <div className="label">You tracked your sleep 9/10 days in a row</div>
          </div>
        </div>

        {/* Settings */}
        <div className="settings-card">
          <div className="section-title">General settings</div>

          <button className="row" type="button">
            <span>Language</span>
          </button>

          <div className="row">
            <span>Apple Health</span>
            <ToggleSwitch />
          </div>

          <button className="row logout" type="button">Log out</button>
        </div>
      </div>
    </div>
  );
}
