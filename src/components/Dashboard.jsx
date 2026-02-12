import { useState, useEffect } from 'react';
import { summaryAPI } from '../api';

function Dashboard({ onNavigate }) {
    const [stats, setStats] = useState({
        total_employees: 0,
        total_attendance_records: 0,
        present_today: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await summaryAPI.getStats();
            setStats(response.data);
        } catch (err) {
            console.error('Failed to fetch stats:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fade-in">
            <h1 className="page-title">Dashboard Summary</h1>
            <p className="page-subtitle">Quick overview of your organization's status</p>

            {loading ? (
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Loading stats...</p>
                </div>
            ) : (
                <div className="form-grid">
                    <div
                        className="card glass"
                        style={{ textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s' }}
                        onClick={() => onNavigate('employees')}
                    >
                        <div className="empty-state-icon" style={{ opacity: 1 }}>👥</div>
                        <h2 className="card-title" style={{ marginBottom: '0.5rem' }}>Total Employees</h2>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            {stats.total_employees}
                        </div>
                        <p className="text-secondary" style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>Click to view all employees →</p>
                    </div>

                    <div
                        className="card glass"
                        style={{ textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s' }}
                        onClick={() => onNavigate('attendance')}
                    >
                        <div className="empty-state-icon" style={{ opacity: 1 }}>📅</div>
                        <h2 className="card-title" style={{ marginBottom: '0.5rem' }}>Today's Presence</h2>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', background: 'var(--success-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            {stats.present_today}
                        </div>
                        <p className="text-secondary">Marked present for {new Date().toLocaleDateString()}</p>
                        <p className="text-secondary" style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>Click to view attendance →</p>
                    </div>

                    <div
                        className="card glass"
                        style={{ textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s' }}
                        onClick={() => onNavigate('attendance')}
                    >
                        <div className="empty-state-icon" style={{ opacity: 1 }}>📈</div>
                        <h2 className="card-title" style={{ marginBottom: '0.5rem' }}>Attendance Volume</h2>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', background: 'var(--danger-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            {stats.total_attendance_records}
                        </div>
                        <p className="text-secondary">Cumulative records tracked</p>
                        <p className="text-secondary" style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>Click to view history →</p>
                    </div>
                </div>
            )}


        </div>
    );
}

export default Dashboard;
