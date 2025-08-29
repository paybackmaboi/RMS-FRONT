import React, { useState } from 'react';
import { API_BASE_URL } from '../../utils/api';
import './StudentLogin.css';
import sessionManager from '../../utils/sessionManager';

function StudentLogin({ onLoginSuccess, onSwitchToRegister, onSwitchToAdmin, onSwitchToAccounting }) {
    const [formData, setFormData] = useState({
        idNumber: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_BASE_URL}/sessions/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idNumber: formData.idNumber,
                    password: formData.password
                })
            });

            if (response.ok) {
                const result = await response.json();
                
                // Store session token using session manager
                sessionManager.setSessionToken(result.sessionToken);
                
                // Store user info
                localStorage.setItem('userInfo', JSON.stringify(result.user));
                
                // Clear form
                setFormData({
                    idNumber: '',
                    password: ''
                });

                // Notify parent component about successful login
                if (onLoginSuccess) {
                    onLoginSuccess(result);
                }
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError('Networksss errorssss. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="student-login-container">
            <div className="login-header">
                <h2>🎓 Student Login</h2>
                <p>Access your student dashboard with your School ID and password</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="idNumber">School ID Number</label>
                    <input
                        type="text"
                        id="idNumber"
                        name="idNumber"
                        value={formData.idNumber}
                        onChange={handleInputChange}
                        placeholder="e.g., 2022-00037"
                        required
                        maxLength="10"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <div className="form-actions">
                    <button 
                        type="submit" 
                        className="btn-login"
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </div>

                <div className="form-footer">
                    <p>Don't have an account? 
                        <button 
                            type="button" 
                            className="btn-link"
                            onClick={onSwitchToRegister}
                        >
                            Register here
                        </button>
                    </p>
                    
                    <div className="admin-switch">
                        <div>
                            <button 
                                type="button" 
                                className="btn-link btn-admin"
                                onClick={onSwitchToAdmin}
                            >
                                Login as Administrator
                            </button>
                        </div>
                        <div>
                            <button 
                                type="button" 
                                className="btn-link btn-admin"
                                onClick={onSwitchToAccounting}
                            >
                                Login as Accounting
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {/* Error Message */}
            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}
        </div>
    );
}

export default StudentLogin;