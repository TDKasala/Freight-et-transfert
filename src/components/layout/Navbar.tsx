import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { signOut } from '../../lib/supabase/auth';
import { LogOut, Rocket } from 'lucide-react';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="px-6 pt-6">
      <div className="max-w-7xl mx-auto">
        <div className="h-16 glass rounded-2xl flex items-center justify-between px-8">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 items-center flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
                <Rocket className="h-4 w-4" />
              </div>
              <span className="font-semibold tracking-tight text-white">SaaSFlow</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Tableau de bord
                </Link>
                <div className="h-4 w-px bg-white/10"></div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-400">{user.email}</span>
                  <button
                    onClick={signOut}
                    className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Se connecter
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-1.5 bg-white text-slate-900 rounded-lg text-sm font-bold shadow-lg hover:bg-slate-100 transition-colors"
                >
                  Commencer
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
