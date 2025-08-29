// Simple in-memory authentication store
class AuthStore {
  constructor() {
    this.token = null;
    this.user = null;
    this.users = [
      {
        id: 1,
        username: "testuser",
        email: "test@example.com",
        password: "password123",
        token: "mock-jwt-token-123"
      },
      {
        id: 2,
        username: "demo",
        email: "demo@example.com", 
        password: "demo123",
        token: "mock-jwt-token-456"
      }
    ];
    this.listeners = [];
  }

  // Subscribe to auth changes
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify all listeners
  notify() {
    this.listeners.forEach(listener => listener(this.isAuthenticated()));
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.token;
  }

  // Get current user
  getCurrentUser() {
    return this.user;
  }

  // Login
  login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (!user) {
          reject({ message: "Invalid email or password" });
          return;
        }

        this.token = user.token;
        this.user = {
          id: user.id,
          username: user.username,
          email: user.email
        };

        console.log("Login successful for:", user.email);
        this.notify();

        resolve({
          message: "Login successful",
          accessToken: user.token,
          user: this.user
        });
      }, 1000);
    });
  }

  // Register
  register(username, email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user already exists
        const existingUser = this.users.find(user => user.email === email);
        if (existingUser) {
          reject({ message: "User already exists with this email" });
          return;
        }

        // Create new user
        const newUser = {
          id: this.users.length + 1,
          username,
          email,
          password,
          token: `mock-jwt-token-${Date.now()}`
        };
        
        this.users.push(newUser);
        
        console.log("Registration successful for:", newUser.email);
        console.log("Total users:", this.users.length);
        
        resolve({ 
          message: "Registration successful",
          user: { id: newUser.id, username: newUser.username, email: newUser.email }
        });
      }, 1000);
    });
  }

  // Logout
  logout() {
    this.token = null;
    this.user = null;
    this.notify();
  }

  // Clear all data (for project shutdown)
  clearAllData() {
    this.token = null;
    this.user = null;
    this.users = [
      {
        id: 1,
        username: "testuser",
        email: "test@example.com",
        password: "password123",
        token: "mock-jwt-token-123"
      },
      {
        id: 2,
        username: "demo",
        email: "demo@example.com", 
        password: "demo123",
        token: "mock-jwt-token-456"
      }
    ];
    this.notify();
    console.log("AuthStore: All data cleared");
  }

  // Get all users (for debugging)
  getAllUsers() {
    return this.users;
  }
}

// Create singleton instance
const authStore = new AuthStore();

export default authStore;
