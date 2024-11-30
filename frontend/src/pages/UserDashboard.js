import React, { useState } from 'react';
import '../stylesheets/UserDashboard.css';

const UserDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [notes, setNotes] = useState([]);
    const [noteInput, setNoteInput] = useState("");

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleAddNote = () => {
        if (noteInput.trim()) {
            setNotes([...notes, noteInput]);
            setNoteInput("");
        }
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={toggleSidebar}>
                    &times;
                </button>
                <ul className="sidebar-menu">
                    <li><button>Your Coding Profile</button></li>
                    <li><button>Purchased Courses</button></li>
                    <li><button>Community Docs</button></li>
                    <li><button>Open Discussion</button></li>
                    <li><button>All Courses</button></li>
                    <li><button>Blogs</button></li>
                    <li><button>Settings</button></li>
                </ul>
            </div>

            {/* Main Content */}
            <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
                <button className="toggle-btn" onClick={toggleSidebar}>
                    ☰
                </button>
                <h1>Track Your Progress</h1>

                {/* Progress Section */}
                <div className="progress-container">
                    <div className="milestone-bar">
                        {/* Milestone Flags */}
                        <div className="milestone-flag">
                            <span>0%</span>
                        </div>
                        <div className="milestone-flag">
                            <span>25%</span>
                        </div>
                        <div className="milestone-flag">
                            <span>50%</span>
                        </div>
                        <div className="milestone-flag">
                            <span>75%</span>
                        </div>
                        <div className="milestone-flag">
                            <span>100%</span>
                        </div>

                        {/* Progress Indicator */}
                        <div className="progress-indicator" style={{ width: '60%' }}>
                            {/* Adjust width dynamically */}
                        </div>
                    </div>
                </div>

                {/* Resources Section */}
                <div className="resources-container">
                    <h2>Suggested Articles & Resources</h2>
                    <ul className="resources-list">
                        <li>Top 10 Coding Practices for Beginners</li>
                        <li>How to Build Your First Full-Stack Application</li>
                        <li>Understanding JavaScript Closures</li>
                        <li>Mastering React Components</li>
                        <li>Effective Debugging Techniques</li>
                        <li>10 Habits of Successful Developers</li>
                        <li>Exploring Modern Front-End Frameworks</li>
                    </ul>
                </div>

                {/* Quick Notes Section */}
                <div className="notes-container">
                    <h2>Quick Notes</h2>
                    <div className="notes-input">
                        <input
                            type="text"
                            placeholder="Add a quick note..."
                            value={noteInput}
                            onChange={(e) => setNoteInput(e.target.value)}
                        />
                        <button onClick={handleAddNote}>Add</button>
                    </div>
                    <ul className="notes-list">
                        {notes.length > 0 ? (
                            notes.map((note, index) => <li key={index}>{note}</li>)
                        ) : (
                            <p>No notes added yet!</p>
                        )}
                    </ul>
                </div>

                {/* Community Chat Preview */}
                <div className="chat-preview-container">
                    <h2>Community Chat</h2>
                    <ul className="chat-preview-list">
                        <li><strong>John:</strong> Does anyone know how to fix the state management bug in React?</li>
                        <li><strong>Anna:</strong> I just completed the Redux tutorial! Happy to help.</li>
                        <li><strong>Mike:</strong> JavaScript closures are confusing! Any good resources?</li>
                        <li><strong>Sara:</strong> Just launched my first project! Feedback welcome :)</li>
                        <li><strong>You:</strong> Join the conversation in the community section!</li>
                    </ul>
                </div>
                
            </div>
        </div>
    );
};

export default UserDashboard;
