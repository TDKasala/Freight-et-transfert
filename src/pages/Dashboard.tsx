import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Activity, Users, Settings, Database } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const stats = [
    { name: 'Abonnés Totaux', value: '71,897', icon: Users, change: '+122', changeType: 'increase' },
    { name: 'Taux d\'ouverture moyen', value: '58.16%', icon: Activity, change: '+5.4%', changeType: 'increase' },
    { name: 'Stockage Utilisé', value: '24.57%', icon: Database, change: '-1.2%', changeType: 'decrease' },
    { name: 'État du Système', value: 'Opérationnel', icon: Settings, change: '100%', changeType: 'increase' },
  ];

  return (
    <div className="space-y-6">
      <div className="glass rounded-3xl p-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Tableau de bord</h1>
            <p className="mt-2 text-sm text-slate-400">
              Heureux de vous revoir, {user.email}. Voici un résumé de votre activité.
            </p>
          </div>
          <div className="p-2 glass rounded-xl">
            <Activity className="w-5 h-5 text-sky-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="glass rounded-3xl p-6 glass-hover transition-all">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-xl bg-sky-500/10 border border-sky-500/20 p-3">
                <item.icon className="h-6 w-6 text-sky-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="truncate text-sm font-medium text-slate-400">{item.name}</dt>
                <dd className="mt-1 text-2xl font-bold tracking-tight text-white">{item.value}</dd>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for Main Content */}
      <div className="glass rounded-3xl p-8 min-h-[400px] flex flex-col items-center justify-center text-slate-500 border-dashed">
        <Database className="h-12 w-12 mb-4 text-sky-900/50" />
        <p className="font-bold text-slate-400 mb-2">Connectez vos données Supabase ici</p>
        <p className="text-sm">Commencez à créer les fonctionnalités de votre SaaS !</p>
      </div>
    </div>
  );
}
