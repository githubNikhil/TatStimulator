import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiRequest } from "@/lib/queryClient";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in on component mount
  useEffect(() => {
    const checkAuth = () => {
      const authString = localStorage.getItem("auth");
      if (authString) {
        try {
          const auth = JSON.parse(authString);
          if (auth.username && auth.password) {
            setIsAuthenticated(true);
          }
        } catch (error) {
          localStorage.removeItem("auth");
        }
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await apiRequest("POST", "/api/login", { username, password });
      
      // Store credentials in localStorage for basic auth in future requests
      localStorage.setItem("auth", JSON.stringify({ username, password }));
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      setError("Invalid credentials");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
