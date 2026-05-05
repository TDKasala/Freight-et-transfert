import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase/client';
import { Activity, Users, Settings, Database, Building2 } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [agencies, setAgencies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAgencies() {
      if (!user) return;
      const { data, error } = await supabase.from('agencies').select('*');
      if (!error && data) {
        setAgencies(data);
      }
      setLoading(false);
    }
    fetchAgencies();
  }, [user]);

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

      {/* Main Content */}
      <div className="glass rounded-3xl p-8 min-h-[400px]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-sky-400" />
            Agences
          </h2>
          <button className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white text-sm font-bold rounded-xl shadow-lg shadow-sky-500/20 transition-all">
            + Nouvelle Agence
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
          </div>
        ) : agencies.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-sm">
                  <th className="pb-3 text-slate-400 font-medium">Nom</th>
                  <th className="pb-3 text-slate-400 font-medium">Devise</th>
                  <th className="pb-3 text-slate-400 font-medium">Date de création</th>
                </tr>
              </thead>
              <tbody>
                {agencies.map((agency) => (
                  <tr key={agency.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 text-white font-medium">{agency.name}</td>
                    <td className="py-4 text-slate-300">
                      <span className="px-2 py-1 rounded-lg bg-slate-800 border border-white/10 text-xs">
                        {agency.currency}
                      </span>
                    </td>
                    <td className="py-4 text-slate-400 text-sm">
                      {new Date(agency.created_at).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-white/10 rounded-2xl py-16">
            <Database className="h-12 w-12 mb-4 text-sky-900/50" />
            <p className="font-bold text-slate-400 mb-2">Aucune agence trouvée</p>
            <p className="text-sm">Créez votre première agence pour commencer.</p>
          </div>
        )}
      </div>
    </div>
  );
}
