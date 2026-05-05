import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      {/* Hero Section */}
      <div className="glass rounded-3xl relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Lancez votre SaaS plus rapidement que jamais
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-400">
              Le kit de démarrage ultime pour votre prochaine grande idée. Intégré avec Supabase, stylisé avec Tailwind CSS, et structuré pour la mise à l'échelle.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/login"
                className="rounded-xl bg-sky-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/20 hover:bg-sky-400 transition-all flex items-center gap-2"
              >
                Commencer
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#features" className="text-sm font-semibold leading-6 text-slate-300 hover:text-white transition-colors">
                En savoir plus <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div id="features" className="glass rounded-3xl py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-bold leading-7 text-sky-500 uppercase tracking-tight">Déploiement rapide</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Tout ce dont vous avez besoin pour créer un SaaS
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-400">
              Ne perdez plus de temps avec les configurations fastidieuses. Ce modèle vous offre une base solide dès le départ.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {[
                'Authentification Prête',
                'Typages de base de données',
                'Style Tailwind',
                'Architecture Propre',
              ].map((feature) => (
                <div key={feature} className="relative pl-16">
                  <dt className="text-base font-bold leading-7 text-white">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 border border-sky-500/20">
                      <CheckCircle2 className="h-5 w-5 text-sky-500" aria-hidden="true" />
                    </div>
                    {feature}
                  </dt>
                  <dd className="mt-2 text-sm leading-7 text-slate-400">
                    Pré-configuré et organisé pour vous aider à maintenir une base de code propre tout au long du développement.
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
