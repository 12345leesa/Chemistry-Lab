// auth.js - Frontend Authentication Handling

class AuthManager {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api/auth';
    }

    // Login method
    async login(username, password) {
        try {
            const response = await fetch(`${this.baseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.success) {
                // Store authentication details
                this.setAuthToken(data.token);
                this.setUserRole(data.user.userRole);
                this.setUsername(data.user.username);
                
                return { success: true, user: data.user };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { 
                success: false, 
                message: 'An error occurred during login' 
            };
        }
    }

    // Registration method
    async register(username, indexNo, password, userRole) {
        try {
            const response = await fetch(`${this.baseUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    username, 
                    indexNo, 
                    password, 
                    userRole 
                })
            });

            const data = await response.json();

            return {
                success: data.success,
                message: data.message
            };
        } catch (error) {
            console.error('Registration error:', error);
            return { 
                success: false, 
                message: 'An error occurred during registration' 
            };
        }
    }

    // Logout method
    logout() {
        this.removeAuthToken();
        this.removeUserRole();
        this.removeUsername();
        window.location.href = 'login.html';
    }

    // Authentication token methods
    setAuthToken(token) {
        localStorage.setItem('token', token);
    }

    getAuthToken() {
        return localStorage.getItem('token');
    }

    removeAuthToken() {
        localStorage.removeItem('token');
    }

    // User role methods
    setUserRole(role) {
        localStorage.setItem('userRole', role);
    }

    getUserRole() {
        return localStorage.getItem('userRole');
    }

    removeUserRole() {
        localStorage.removeItem('userRole');
    }

    // Username methods
    setUsername(username) {
        localStorage.setItem('username', username);
    }

    getUsername() {
        return localStorage.getItem('username');
    }

    removeUsername() {
        localStorage.removeItem('username');
    }

    // Check if user is authenticated
    isAuthenticated() {
        return !!this.getAuthToken();
    }

    // Make authenticated requests
    async makeAuthenticatedRequest(url, method = 'GET', body = null) {
        try {
            const token = this.getAuthToken();
            
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: body ? JSON.stringify(body) : null
            });

            // Check if response is unauthorized
            if (response.status === 401) {
                this.logout();
                return null;
            }

            return await response.json();
        } catch (error) {
            console.error('Authenticated request error:', error);
            return null;
        }
    }

    // Protect routes based on authentication and role
    protectRoute(requiredRoles = []) {
        // Check if user is authenticated
        if (!this.isAuthenticated()) {
            window.location.href = 'login.html';
            return false;
        }

        // If specific roles are required, check user role
        if (requiredRoles.length > 0) {
            const userRole = this.getUserRole();
            if (!requiredRoles.includes(userRole)) {
                // Redirect to home or show access denied page
                window.location.href = 'home.html';
                return false;
            }
        }

        return true;
    }
}

// Create a global instance
const authManager = new AuthManager();

// Export for use in other scripts
export default authManager;



import authManager from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Login Form Handler
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            try {
                const result = await authManager.login(username, password);
                
                if (result.success) {
                    // Redirect to home page or dashboard
                    window.location.href = 'home.html';
                } else {
                    // Show error message
                    alert(result.message);
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('An error occurred during login');
            }
        });
    }

    // Registration Form Handler
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const username = document.getElementById('registerUsername').value;
            const indexNo = document.getElementById('registerIndexNo').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const userRole = document.getElementById('userRole').value;

            // Basic client-side validation
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            try {
                const result = await authManager.register(
                    username, 
                    indexNo, 
                    password, 
                    userRole
                );
                
                if (result.success) {
                    alert('Registration successful. Please login.');
                    // Optionally switch to login form
                    document.querySelector('.login-box').style.display = 'block';
                    document.querySelector('.register-box').style.display = 'none';
                } else {
                    alert(result.message);
                }
            } catch (error) {
                console.error('Registration error:', error);
                alert('An error occurred during registration');
            }
        });
    }
});



document.addEventListener('DOMContentLoaded', () => {
    // Update login/register buttons based on auth status
    const updateAuthButtons = () => {
        const loginRegisterContainer = document.querySelector('.login-register-container');
        const userWelcomeContainer = document.querySelector('.user-welcome');
        
        if (authManager.isAuthenticated()) {
            // Hide login/register buttons
            if (loginRegisterContainer) {
                loginRegisterContainer.style.display = 'none';
            }
            
            // Show user welcome
            if (userWelcomeContainer) {
                userWelcomeContainer.style.display = 'block';
                
                // Set username
                const userNameEl = document.getElementById('user-name');
                if (userNameEl) {
                    userNameEl.textContent = `Welcome, ${authManager.getUsername()}`;
                }
            }
        } else {
            // Show login/register buttons
            if (loginRegisterContainer) {
                loginRegisterContainer.style.display = 'block';
            }
            
            // Hide user welcome
            if (userWelcomeContainer) {
                userWelcomeContainer.style.display = 'none';
            }
        }
    };

    // Logout handler
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            authManager.logout();
        });
    }

    // Update auth buttons on page load
    updateAuthButtons();
});