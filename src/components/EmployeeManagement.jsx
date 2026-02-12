import { useState, useEffect } from 'react';
import { employeeAPI } from '../api';

function EmployeeManagement() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [formData, setFormData] = useState({
        employee_id: '',
        full_name: '',
        email: '',
        department: '',
    });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await employeeAPI.getAll();
            setEmployees(response.data);
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to fetch employees');
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
        if (!formData.employee_id || !formData.full_name || !formData.email || !formData.department) {
            setError('All fields are required');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return;
        }

        setLoading(true);
        try {
            await employeeAPI.create(formData);
            setSuccess('Employee added successfully!');
            setFormData({
                employee_id: '',
                full_name: '',
                email: '',
                department: '',
            });
            fetchEmployees();
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to add employee');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (employeeId) => {
        if (!window.confirm('Are you sure you want to delete this employee?')) {
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await employeeAPI.delete(employeeId);
            setSuccess('Employee deleted successfully!');
            fetchEmployees();
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to delete employee');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fade-in">
            <h1 className="page-title">Employee Management</h1>
            <p className="page-subtitle">Add, view, and manage employee records</p>

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

            {/* Add Employee Form */}
            <div className="card">
                <h2 className="card-title">Add New Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label" htmlFor="employee_id">
                                Employee ID *
                            </label>
                            <input
                                type="text"
                                id="employee_id"
                                name="employee_id"
                                className="form-input"
                                placeholder="e.g., EMP001"
                                value={formData.employee_id}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="full_name">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                id="full_name"
                                name="full_name"
                                className="form-input"
                                placeholder="e.g., John Doe"
                                value={formData.full_name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="email">
                                Email *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-input"
                                placeholder="e.g., john@example.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="department">
                                Department *
                            </label>
                            <select
                                id="department"
                                name="department"
                                className="form-select"
                                value={formData.department}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Department</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Human Resources">Human Resources</option>
                                <option value="Finance">Finance</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Sales">Sales</option>
                                <option value="Operations">Operations</option>
                                <option value="IT">IT</option>
                                <option value="Customer Support">Customer Support</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? '⏳ Adding...' : '➕ Add Employee'}
                    </button>
                </form>
            </div>

            {/* Employee List */}
            <div className="card">
                <h2 className="card-title">Employee List</h2>

                {loading && !employees.length ? (
                    <div className="loading">
                        <div className="spinner"></div>
                        <p>Loading employees...</p>
                    </div>
                ) : employees.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">👥</div>
                        <div className="empty-state-text">No employees found</div>
                        <div className="empty-state-subtext">Add your first employee using the form above</div>
                    </div>
                ) : (
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Employee ID</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Department</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>{employee.employee_id}</td>
                                        <td>{employee.full_name}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.department}</td>
                                        <td>
                                            <button
                                                className="btn btn-danger action-btn"
                                                onClick={() => handleDelete(employee.employee_id)}
                                                disabled={loading}
                                            >
                                                🗑️ Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EmployeeManagement;
