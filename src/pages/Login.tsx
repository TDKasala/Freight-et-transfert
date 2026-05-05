import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { signInWithProvider, signInWithEmail, signUpWithEmail } from '../lib/supabase/auth';
import { Github, Mail, KeyRound } from 'lucide-react';

export default function Login() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleProviderSignIn = async (provider: 'google' | 'github') => {
    setLoading(true);
    setError(null);
    try {
      await signInWithProvider(provider);
    } catch (err: any) {
      setError(err.message || 'Une erreur s\'est produite lors de la connexion');
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur s\'est produite');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center -mt-6">
      <div className="w-full max-w-md space-y-8 glass p-8 rounded-3xl relative isolate">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 to-transparent opacity-50 rounded-3xl pointer-events-none -z-10"></div>
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
            {isLogin ? 'Connectez-vous à votre compte' : 'Créez votre compte'}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Commencez à créer votre SaaS dès aujourd'hui
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-sky-500 uppercase tracking-wide mb-2" htmlFor="email">
                Adresse email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 rounded-xl bg-slate-900/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-transparent transition-all sm:text-sm"
                  placeholder="vous@exemple.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-sky-500 uppercase tracking-wide mb-2" htmlFor="password">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 rounded-xl bg-slate-900/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-transparent transition-all sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-sky-500/20 text-sm font-bold text-white bg-sky-500 hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-slate-900 transition-all disabled:opacity-50"
            >
              {isLogin ? 'Se connecter' : "S'inscrire"}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 glass text-slate-400 rounded-lg">Ou continuer avec</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleProviderSignIn('google')}
              disabled={loading}
              type="button"
              className="w-full flex justify-center items-center rounded-xl glass px-4 py-3 text-sm font-semibold text-slate-200 glass-hover transition-colors disabled:opacity-50 gap-2"
            >
              <Mail className="h-4 w-4 text-slate-400" />
              Google
            </button>

            <button
              onClick={() => handleProviderSignIn('github')}
              disabled={loading}
              type="button"
              className="w-full flex justify-center items-center rounded-xl bg-slate-900/50 border border-white/5 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-900/80 hover:border-white/10 transition-colors disabled:opacity-50 gap-2"
            >
              <Github className="h-4 w-4 text-slate-400" />
              GitHub
            </button>
          </div>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {isLogin 
                ? "Vous n'avez pas de compte ? S'inscrire" 
                : "Vous avez déjà un compte ? Se connecter"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
