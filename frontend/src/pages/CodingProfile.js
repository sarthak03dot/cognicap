// File: CodingProfile.js

import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import Sidebar from './Sidebar';
import '../stylesheets/CodingProfile.css';
import Heatmap from 'react-calendar-heatmap';
import GitHubCalendar from 'react-github-calendar';
import 'react-calendar-heatmap/dist/styles.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const CodingProfile = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [codechefHandle, setCodechefHandle] = useState(localStorage.getItem('codechefHandle') || '');
    const [codechefData, setCodechefData] = useState(JSON.parse(localStorage.getItem('codechefData')) || null);
    const [githubUsername, setGithubUsername] = useState(localStorage.getItem('githubUsername') || '');
    const [githubCalendarVisible, setGithubCalendarVisible] = useState(Boolean(localStorage.getItem('githubUsername')));
    const [codeforcesHandle, setCodeforcesHandle] = useState(localStorage.getItem('codeforcesHandle') || '');
    const [codeforcesData, setCodeforcesData] = useState(JSON.parse(localStorage.getItem('codeforcesData')) || null);
    const [codeforcesError, setCodeforcesError] = useState('');
    const [error, setError] = useState('');
    

    // Save to local storage whenever state changes
    useEffect(() => {
        if (codechefHandle) {
            localStorage.setItem('codechefHandle', codechefHandle);
        } else {
            localStorage.removeItem('codechefHandle');
            localStorage.removeItem('codechefData');
        }
        localStorage.setItem('codechefData', JSON.stringify(codechefData));
    }, [codechefHandle, codechefData]);

    useEffect(() => {
        if (githubUsername) {
            localStorage.setItem('githubUsername', githubUsername);
        } else {
            localStorage.removeItem('githubUsername');
        }
    }, [githubUsername]);

    useEffect(() => {
        if (codeforcesHandle) {
            localStorage.setItem('codeforcesHandle', codeforcesHandle);
        } else {
            localStorage.removeItem('codeforcesHandle');
            localStorage.removeItem('codeforcesData');
        }
        localStorage.setItem('codeforcesData', JSON.stringify(codeforcesData));
    }, [codeforcesHandle, codeforcesData]);


    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const fetchCodechefData = async () => {
        try {
            const response = await fetch(`https://codechef-api.vercel.app/handle/${codechefHandle}`);
            const data = await response.json();

            if (data.success) {
                setCodechefData(data);
                setError('');
            } else {
                setError(`CodeChef: ${data.message}`);
            }
        } catch (err) {
            setError('Error fetching CodeChef data.');
        }
    };

    const handleCodechefSubmit = (e) => {
        e.preventDefault();
        if (codechefHandle.trim()) fetchCodechefData();
        else setError('Please enter a valid CodeChef handle.');
    };

    const handleGithubSubmit = (e) => {
        e.preventDefault();
        if (githubUsername.trim()) {
            setGithubCalendarVisible(true);
        } else {
            setError('Please enter a valid GitHub username.');
        }
    };

    const fetchCodeforcesData = async () => {
        try {
            const response = await fetch(`https://codeforces.com/api/user.info?handles=${codeforcesHandle}`);
            const data = await response.json();
    
            if (data.status === 'OK') {
                setCodeforcesData(data.result[0]);
                setCodeforcesError('');
            } else {
                setCodeforcesError(`Codeforces: ${data.comment}`);
            }
        } catch (err) {
            setCodeforcesError('Error fetching Codeforces data.');
        }
    };

    const handleCodeforcesSubmit = (e) => {
        e.preventDefault();
        if (codeforcesHandle.trim()) fetchCodeforcesData();
        else setCodeforcesError('Please enter a valid Codeforces handle.');
    };

    const resetCodechefHandle = () => {
        setCodechefHandle('');
        setCodechefData(null);
        localStorage.removeItem('codechefHandle');
        localStorage.removeItem('codechefData');
    };
    
    const resetGithubHandle = () => {
        setGithubUsername('');
        setGithubCalendarVisible(false);
        localStorage.removeItem('githubUsername');
    };
    
    const resetCodeforcesHandle = () => {
        setCodeforcesHandle('');
        setCodeforcesData(null);
        localStorage.removeItem('codeforcesHandle');
        localStorage.removeItem('codeforcesData');
    };    

    return (
        <div className="profile-container">
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
                <button className="toggle-btn" onClick={toggleSidebar}>
                    ☰
                </button>
                <h1>Your Coding Profile</h1>

                <div className="platform-block">
    {!codeforcesData ? (
        <form onSubmit={handleCodeforcesSubmit} className="codeforces-form">
            <input
                type="text"
                placeholder="Enter Codeforces Handle"
                value={codeforcesHandle}
                onChange={(e) => setCodeforcesHandle(e.target.value)}
                className="fetch-user-input"
            />
            <button type="submit" className="fetch-user-button">
                Fetch Data
            </button>
        </form>
    ) : (
        <button className="reset-button" onClick={resetCodeforcesHandle}>
            De-link Codeforces
        </button>
    )}
    {codeforcesError && <p className="error-message">{codeforcesError}</p>}
    {codeforcesData && (
        <div className="dashboard">
            <div className="info-section">
                <div className="profile-image-info">
                    <img
                        src={codeforcesData.avatar || ''}
                        alt="User Avatar"
                        className="profile-img"
                    />
                    <div className="user-details">
                        <p><strong>Handle:</strong> {codeforcesData.handle}</p>
                        <p><strong>Rating:</strong> {codeforcesData.rating || 'N/A'}</p>
                        <p><strong>Max Rating:</strong> {codeforcesData.maxRating || 'N/A'}</p>
                        <p><strong>Rank:</strong> {codeforcesData.rank || 'N/A'}</p>
                        <p><strong>Max Rank:</strong> {codeforcesData.maxRank || 'N/A'}</p>
                    </div>
                </div>
            </div>
        </div>
    )}
</div>

                <div className="platform-block">
                    {!codechefData ? (
                        <form onSubmit={handleCodechefSubmit} className="codechef-form">
                            <input
                                type="text"
                                placeholder="Enter CodeChef Handle"
                                value={codechefHandle}
                                onChange={(e) => setCodechefHandle(e.target.value)}
                                className="fetch-user-input"
                            />
                            <button type="submit" className="fetch-user-button">
                                Fetch Data
                            </button>
                        </form>
                    ) : (
                        <button className="reset-button" onClick={resetCodechefHandle}>
                            De-link CodeChef
                        </button>
                    )}
                    {error && <p className="error-message">{error}</p>}
                    {codechefData && (
                        <div className="dashboard">
                            <div className="info-and-performance">
                                <div className="info-section">
                                    <div className="profile-image-info">
                                        <img
                                            src={codechefData.profile || ''}
                                            alt="User Profile"
                                            className="profile-img"
                                        />
                                        <div className="user-details">
                                            <p><strong>Name:</strong> {codechefData.name || 'N/A'}</p>
                                            <p><strong>Stars:</strong> {codechefData.stars || 'N/A'}</p>
                                            <p><strong>Country:</strong> {codechefData.countryName || 'N/A'}</p>
                                            <img
                                                src={codechefData.countryFlag || ''}
                                                alt="Country Flag"
                                                className="country-flag"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="chart-section">
                                    <Doughnut
                                        data={{
                                            labels: ['Highest Rating', 'Current Rating'],
                                            datasets: [
                                                {
                                                    label: 'CodeChef Stats',
                                                    data: [
                                                        codechefData.highestRating || 0,
                                                        codechefData.currentRating || 0,
                                                    ],
                                                    backgroundColor: ['#FF6384', '#36A2EB'],
                                                    hoverBackgroundColor: ['#FF6384', '#36A2EB'],
                                                },
                                            ],
                                        }}
                                        options={{
                                            maintainAspectRatio: false,
                                        }}
                                    />
                                </div>
                            </div>
                            <h3 style={{textAlign: 'center'}}> {codechefData.name}'s CodeChef Profile </h3>
                            <div className="heatmap-section">
                                <Heatmap
                                    startDate={new Date('2023-01-01')}
                                    endDate={new Date()}
                                    values={codechefData.heatMap.map((entry) => ({
                                        date: entry.date,
                                        count: entry.value,
                                    }))}
                                    classForValue={(value) => {
                                        if (!value) {
                                            return 'color-empty';
                                        }
                                        return `color-scale-${Math.min(value.count, 4)}`;
                                    }}
                                    tooltipDataAttrs={(value) => {
                                        return {
                                            'data-tip': value ? `${value.date}: ${value.count} submissions` : 'No data',
                                        };
                                    }}
                                    showWeekdayLabels
                                    showMonthLabels
                                    style={{
                                        margin: '20px auto',
                                        maxWidth: '80%',
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="platform-block">
                    {!githubCalendarVisible ? (
                        <form onSubmit={handleGithubSubmit} className="github-form">
                            <input
                                type="text"
                                placeholder="Enter GitHub Username"
                                value={githubUsername}
                                onChange={(e) => setGithubUsername(e.target.value)}
                                className="fetch-user-input"
                            />
                            <button type="submit" className="fetch-user-button">
                                Show GitHub Calendar
                            </button>
                        </form>
                    ) : (
                        <button style={{marginTop: '10%'}} className="reset-button" onClick={resetGithubHandle}>
                            De-link GitHub
                        </button>
                    )}
                    {error && <p className="error-message">{error}</p>}
                    {githubCalendarVisible && githubUsername && (<>
                        <h3 style={{textAlign: 'center'}}> {githubUsername}'s GitHub Contributions </h3>
                        <div className="github-calendar">
                            <GitHubCalendar username={githubUsername} />
                        </div></>
                    )}
                    
                </div>

                <div className="platform-block leetcode-coming-soon">
    <h2 className="leetcode-heading">LeetCode Integration</h2>
    <p className="coming-soon">🚀 Coming Soon! Stay Tuned for More Features! 🚀</p>
</div>

            </div>
        </div>
    );
};

export default CodingProfile;
