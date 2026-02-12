import { useState, useEffect } from 'react';
import { employeeAPI, attendanceAPI } from '../api';

function AttendanceManagement() {
    const [employees, setEmployees] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [filterEmployeeId, setFilterEmployeeId] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [formData, setFormData] = useState({
        employee_id: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present',
    });

    useEffect(() => {
        fetchEmployees();
        fetchAttendance();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await employeeAPI.getAll();
            setEmployees(response.data);
        } catch (err) {
            console.error('Failed to fetch employees:', err);
        }
    };

    const fetchAttendance = async (employeeId = null) => {
        setLoading(true);
        setError(null);
        try {
            const response = await attendanceAPI.getAll(employeeId);
            setAttendance(response.data);
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to fetch attendance records');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Validation
        if (!formData.employee_id || !formData.date || !formData.status) {
            setError('All fields are required');
            return;
        }

        // Date validation
        const selectedDate = new Date(formData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate > today) {
            setError('Date cannot be in the future');
            return;
        }

        setLoading(true);
        try {
            await attendanceAPI.create(formData);
            setSuccess('Attendance marked successfully!');
            setFormData({
                employee_id: '',
                date: new Date().toISOString().split('T')[0],
                status: 'Present',
            });
            fetchAttendance(filterEmployeeId || null);
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to mark attendance');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const employeeId = e.target.value;
        setFilterEmployeeId(employeeId);
        fetchAttendance(employeeId || null);
    };

    const getEmployeeName = (employeeId) => {
        const employee = employees.find((emp) => emp.employee_id === employeeId);
        return employee ? employee.full_name : employeeId;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="fade-in">
            <h1 className="page-title">Attendance Management</h1>
            <p className="page-subtitle">Mark and track employee attendance</p>

            {error && (
                <div className="alert alert-error">
                    <span>⚠️</span>
                    <span>{error}</span>
                </div>
            )}

            {success && (
                <div className="alert alert-success">
                    <span>✓</span>
                    <span>{success}</span>
                </div>
            )}

            {/* Mark Attendance Form */}
            <div className="card">
                <h2 className="card-title">Mark Attendance</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label" htmlFor="employee_id">
                                Employee *
                            </label>
                            <select
                                id="employee_id"
                                name="employee_id"
                                className="form-select"
                                value={formData.employee_id}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Employee</option>
                                {employees.map((employee) => (
                                    <option key={employee.id} value={employee.employee_id}>
                                        {employee.employee_id} - {employee.full_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="date">
                                Date *
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                className="form-input"
                                value={formData.date}
                                onChange={handleInputChange}
                                max={new Date().toISOString().split('T')[0]}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="status">
                                Status *
                            </label>
                            <select
                                id="status"
                                name="status"
                                className="form-select"
                                value={formData.status}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="Present">Present</option>
                                <option value="Absent">Absent</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? '⏳ Marking...' : '✓ Mark Attendance'}
                    </button>
                </form>
            </div>

            {/* Attendance Records */}
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <h2 className="card-title" style={{ marginBottom: 0 }}>Attendance Records</h2>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div className="form-group" style={{ minWidth: '200px', marginBottom: 0 }}>
                            <select
                                className="form-select"
                                value={filterEmployeeId}
                                onChange={(e) => setFilterEmployeeId(e.target.value)}
                            >
                                <option value="">All Employees</option>
                                {employees.map((employee) => (
                                    <option key={employee.id} value={employee.employee_id}>
                                        {employee.employee_id} - {employee.full_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group" style={{ minWidth: '150px', marginBottom: 0 }}>
                            <input
                                type="date"
                                className="form-input"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                                placeholder="Filter by date"
                            />
                        </div>

                        {(filterEmployeeId || filterDate) && (
                            <button className="btn" style={{ padding: '0.5rem 1rem' }} onClick={() => { setFilterEmployeeId(''); setFilterDate(''); }}>
                                ↺ Reset
                            </button>
                        )}
                    </div>
                </div>

                {loading && !attendance.length ? (
                    <div className="loading">
                        <div className="spinner"></div>
                        <p>Loading attendance records...</p>
                    </div>
                ) : (
                    (() => {
                        const filteredAttendance = attendance.filter(record => {
                            const matchEmp = filterEmployeeId ? record.employee_id === filterEmployeeId : true;
                            const matchDate = filterDate ? record.date === filterDate : true;
                            return matchEmp && matchDate;
                        });

                        if (filteredAttendance.length === 0) {
                            return (
                                <div className="empty-state">
                                    <div className="empty-state-icon">📅</div>
                                    <div className="empty-state-text">No records match your filters</div>
                                    <div className="empty-state-subtext">Adjust the filters to see more results</div>
                                </div>
                            );
                        }

                        return (
                            <div className="table-container">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Employee ID</th>
                                            <th>Employee Name</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredAttendance.map((record) => (
                                            <tr key={record.id}>
                                                <td>{record.employee_id}</td>
                                                <td>{getEmployeeName(record.employee_id)}</td>
                                                <td>{formatDate(record.date)}</td>
                                                <td>
                                                    <span
                                                        className={`badge ${record.status === 'Present' ? 'badge-present' : 'badge-absent'}`}
                                                    >
                                                        {record.status === 'Present' ? '✓ Present' : '✗ Absent'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        );
                    })()
                )}
            </div>
        </div>
    );
}

export default AttendanceManagement;
