import { Link } from "wouter";
import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-[#556B2F] text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Psych Test Simulator</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/">
                  <a className="text-white hover:text-[#87CEEB] transition">Home</a>
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link href="/admin">
                      <a className="text-white hover:text-[#87CEEB] transition">Admin</a>
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={logout}
                      className="text-white hover:text-[#87CEEB] transition"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link href="/admin-login">
                    <a className="text-white hover:text-[#87CEEB] transition">Admin</a>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>

      <footer className="bg-gray-700 text-white py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>© {new Date().getFullYear()} Psych Test Simulator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
