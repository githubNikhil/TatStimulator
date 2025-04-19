import { Link } from "wouter";
import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-primary text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold tracking-wide">Psych Test Simulator</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="text-white hover:text-light transition-colors duration-200">
                  Home
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link href="/admin" className="text-white hover:text-light transition-colors duration-200">
                      Admin
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={logout}
                      className="text-white hover:text-light transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link href="/admin-login" className="text-white hover:text-light transition-colors duration-200">
                    Admin
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-neutral text-white py-5">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>© {new Date().getFullYear()} Psych Test Simulator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
