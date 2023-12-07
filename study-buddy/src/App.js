// App.js
import React, { useState } from "react";
import "./StudyBuddy.css";

const StudyPlanner = ({
  onNavigate,
  onAddActivity,
  onRemoveActivity,
  activities,
}) => {
  const [newActivity, setNewActivity] = useState("");

  const addActivity = () => {
    if (newActivity.trim() !== "") {
      onAddActivity(newActivity);
      onNavigate("ResourceRepository");
      setNewActivity("");
    }
  };

  const removeActivity = (index) => {
    onRemoveActivity(index);
  };

  return (
    <div className="content">
      <h2>Study Planner</h2>
      <div className="task-input">
        <input
          type="text"
          placeholder="Add a new activity..."
          value={newActivity}
          onChange={(e) => setNewActivity(e.target.value)}
        />
        <button onClick={addActivity}>Add</button>
      </div>
      <ul className="activity-list">
        {activities.map((activity, index) => (
          <li key={index}>
            {activity}
            <button onClick={() => removeActivity(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ResourceRepository = ({ activities, onRemoveActivity }) => {
  return (
    <div className="content">
      <h2>Resource Repository</h2>
      <ul className="activity-list">
        {activities.map((activity, index) => (
          <li key={index}>
            {activity}
            <button onClick={() => onRemoveActivity(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CollaborativeLearning = ({ activities, onRemoveActivity }) => {
  return (
    <div className="content">
      <h2>Collaborative Learning</h2>
      <p>Discuss your activities with peers here.</p>
      <ul className="activity-list">
        {activities.map((activity, index) => (
          <li key={index}>
            {activity}
            <button onClick={() => onRemoveActivity(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProgressAnalytics = ({ activities }) => {
  const calculateProgress = () => {
    const completedActivities = activities.filter(
      (activity) => activity.trim() !== ""
    ).length;
    const totalActivities = activities.length;
    return totalActivities > 0
      ? Math.round((completedActivities / totalActivities) * 100)
      : 0;
  };

  return (
    <div className="content">
      <h2>Progress Analytics</h2>
      <p>Your progress:</p>
      <div className="progress-circle">{calculateProgress()}%</div>
    </div>
  );
};

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      setError("Please enter both username and password.");
    } else {
      onLogin();
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("StudyPlanner");
  const [activities, setActivities] = useState([]);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleAddActivity = (activity) => {
    setActivities([...activities, activity]);
  };

  const handleRemoveActivity = (index) => {
    const updatedActivities = [...activities];
    updatedActivities.splice(index, 1);
    setActivities(updatedActivities);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "StudyPlanner":
        return (
          <StudyPlanner
            onNavigate={handleNavigate}
            onAddActivity={handleAddActivity}
            onRemoveActivity={handleRemoveActivity}
            activities={activities}
          />
        );
      case "ResourceRepository":
        return (
          <ResourceRepository
            activities={activities}
            onRemoveActivity={handleRemoveActivity}
          />
        );
      case "CollaborativeLearning":
        return (
          <CollaborativeLearning
            activities={activities}
            onRemoveActivity={handleRemoveActivity}
          />
        );
      case "ProgressAnalytics":
        return <ProgressAnalytics activities={activities} />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header>
        <h1>StudyBuddy</h1>
      </header>
      {!loggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div>
          <div className="nav-buttons">
            <button onClick={() => setCurrentPage("StudyPlanner")}>
              Study Planner
            </button>
            <button onClick={() => setCurrentPage("ResourceRepository")}>
              Resource Repository
            </button>
            <button onClick={() => setCurrentPage("CollaborativeLearning")}>
              Collaborative Learning
            </button>
            <button onClick={() => setCurrentPage("ProgressAnalytics")}>
              Progress Analytics
            </button>
          </div>
          {renderPage()}
        </div>
      )}
    </div>
  );
};

export default App;
