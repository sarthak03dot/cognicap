import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import Sidebar from './Sidebar';
import '../stylesheets/CodingProfile.css';

// Register components
ChartJS.register(ArcElement, Tooltip, Legend);

const CodingProfile = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [handle, setHandle] = useState('');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const [chartData, setChartData] = useState(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const fetchUserInfo = async () => {
        setError('');
        setUserData(null);

        try {
            const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
            const data = await response.json();

            if (data.status === 'OK') {
                const user = data.result[0];
                setUserData(user);

                // Prepare data for the chart
                setChartData({
                    labels: ['Contest Wins', 'Problems Solved', 'Other Achievements'],
                    datasets: [
                        {
                            label: 'Codeforces Stats',
                            data: [user.maxRating || 0, user.rating || 0, 1000 - (user.rating || 0)],
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        },
                    ],
                });
            } else {
                setError(data.comment || 'Failed to fetch user info.');
            }
        } catch (err) {
            setError('An error occurred while fetching user info.');
        }
    };

    const handleInputChange = (e) => {
        setHandle(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (handle.trim()) {
            fetchUserInfo();
        } else {
            setError('Please enter a valid Codeforces handle.');
        }
    };

    const handleDeLink = () => {
        setHandle('');
        setUserData(null);
        setChartData(null);
        setError('');
    };

    return (
        <div className="profile-container">
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
                <button className="toggle-btn" onClick={toggleSidebar}>
                    ☰
                </button>
                <h1>Your Coding Profile</h1>
                {!userData ? (
                    <form onSubmit={handleFormSubmit} className="fetch-user-form">
                        <input
                            type="text"
                            placeholder="Codeforces Handle"
                            value={handle}
                            onChange={handleInputChange}
                            className="fetch-user-input"
                        />
                        <button type="submit" className="fetch-user-button">
                            Fetch User Info
                        </button>
                    </form>
                ) : (
                    <button className="de-link-button" onClick={handleDeLink}>
                        De-link
                    </button>
                )}
                {error && <p className="error-message">{error}</p>}
                {userData && (
                    <div className="dashboard">
                        <div className="chart-section">
                            <h3>Performance Overview</h3>
                            {chartData && <Pie data={chartData} />}
                        </div>
                        <div className="info-section">
                            <h3>User Information</h3>
                            <p><strong>Handle:</strong> {userData.handle}</p>
                            <p><strong>Rank:</strong> {userData.rank}</p>
                            <p><strong>Max Rank:</strong> {userData.maxRank}</p>
                            <p><strong>Rating:</strong> {userData.rating}</p>
                            <p><strong>Max Rating:</strong> {userData.maxRating}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CodingProfile;
