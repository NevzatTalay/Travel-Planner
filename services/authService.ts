import type { User } from '../types';

// This is the shape of data stored in localStorage for the user list.
// It includes the password for auth checking. THIS IS INSECURE FOR REAL APPS.
interface StoredUser extends User {
  password_insecure: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {}

const USERS_STORAGE_KEY = 'react-auth-users';
const SESSION_STORAGE_KEY = 'react-auth-session';

const getStoredUsers = (): StoredUser[] => {
  try {
    const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  } catch (e) {
    console.error("Failed to parse users from localStorage", e);
    return [];
  }
};

const saveStoredUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

const authService = {
  register: (credentials: RegisterCredentials): User => {
    const storedUsers = getStoredUsers();
    const existingUser = storedUsers.find(user => user.email === credentials.email);

    if (existingUser) {
      throw new Error('An account with this email already exists.');
    }
    
    // In a real app, you must hash the password!
    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      email: credentials.email,
      password_insecure: credentials.password,
    };
    
    saveStoredUsers([...storedUsers, newUser]);

    const sessionUser: User = { id: newUser.id, email: newUser.email };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionUser));

    return sessionUser;
  },

  login: (credentials: LoginCredentials): User => {
    const storedUsers = getStoredUsers();
    const userRecord = storedUsers.find(
      (user) => user.email === credentials.email && user.password_insecure === credentials.password
    );

    if (!userRecord) {
      throw new Error('Invalid email or password.');
    }

    const sessionUser: User = {
      id: userRecord.id,
      email: userRecord.email,
    };

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionUser));
    return sessionUser;
  },

  logout: (): void => {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  },

  getCurrentUser: (): User | null => {
    try {
      const sessionJson = localStorage.getItem(SESSION_STORAGE_KEY);
      if (!sessionJson) {
        return null;
      }
      const user = JSON.parse(sessionJson) as User;
      return user;
    } catch (e) {
      console.error("Failed to parse session from localStorage", e);
      return null;
    }
  },
};

export { authService };
