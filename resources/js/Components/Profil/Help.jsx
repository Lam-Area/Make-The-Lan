// resources/js/Components/Profil/Help.jsx
import React from 'react';
import { Link } from '@inertiajs/react';
import {
  Search, ChevronDown, Mail, MessageSquare, ShieldCheck, FileText, LifeBuoy, PackageSearch,
} from 'lucide-react';

export default function HelpSection() {
  const [q, setQ] = React.useState('');

  const faq = React.useMemo(
    () => [
      {
        question: 'Comment suivre ma commande et la livraison ?',
        answer:
          'Après le paiement, tu reçois un email de confirmation. Le suivi (transporteur, n° de tracking) est ajouté dès que l’expédition est préparée. Tu peux aussi consulter ton Historique d’achat dans ton profil.',
      },
      {
        question: 'Où récupérer ma facture ?',
        answer:
          "Ta facture est envoyée par email une fois la commande validée. Tu pourras également la retrouver dans ton Historique d’achat, depuis Profil → Historique d’achat.",
      },
      {
        question: 'Y a-t-il une garantie sur les équipements ?',
        answer:
          "Lorsqu’une garantie est proposée, sa durée est indiquée sur la fiche produit (champ « Garantie »). À défaut de mention, l’équipement est vendu sans garantie constructeur.",
      },
      {
        question: 'Puis-je me faire rembourser ?',
        answer:
          "Non. Une fois l’achat confirmé, le remboursement n’est pas possible car le paiement est reversé au vendeur de l’équipement.",
      },
      {
        question: 'Comment contacter le support ?',
        answer:
          'Écris-nous à support@myscript.com — nous répondons généralement sous 24–48h ouvrées. Tu peux aussi passer par la communauté Discord.',
      },
    ],
    []
  );

  const filtered = faq.filter(
    (f) =>
      f.question.toLowerCase().includes(q.toLowerCase()) ||
      f.answer.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Bandeau / tip */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-400" />
          <div>
            <div className="font-medium">
              Centre d’aide <span className="text-emerald-400">Make The Lan</span>
            </div>
            <p className="mt-1 text-sm text-gray-300">
              Questions sur l’expédition, la facture, la garantie — tout est ici.
            </p>
          </div>
        </div>
      </div>

      {/* Recherche */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4 backdrop-blur">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher dans la FAQ…"
            className="w-full rounded-xl border border-white/10 bg-transparent pl-9 pr-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-white/20"
          />
        </div>
      </div>

      {/* FAQ */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-2 sm:p-3 backdrop-blur">
        <h3 className="px-2 sm:px-3 py-2 text-sm font-semibold text-gray-200">
          Questions fréquentes
        </h3>
        <div className="divide-y divide-white/10">
          {(filtered.length ? filtered : faq).map((item, i) => (
            <Accordion key={i} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>

      {/* Raccourcis / Liens utiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CardLink
          icon={LifeBuoy}
          title="Informations légales"
          subtitle="Confidentialité, cookies, etc."
          to="/legal"
        />
        <CardLink
          icon={FileText}
          title="Conditions générales"
          subtitle="CGU/CGV, droit de rétractation"
          to="/terms"
        />
      </div>

      {/* Contact / Support */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ActionCard
          icon={Mail}
          title="Nous écrire par email"
          desc="Questions sur un équipement, compatibilité, RMA"
          href="mailto:admin@mtl.com"
          cta="Envoyer un email"
        />
        <ActionCard
          icon={MessageSquare}
          title="Parler avec la communauté"
          desc="Avis matériel, guides et entraide"
          href="https://discord.com/invite/Wy3SDE9J"
          cta="Ouvrir Discord"
        />
      </div>
    </div>
  );
}

/* --------- UI subcomponents --------- */

function Accordion({ question, answer }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="group">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left hover:bg-white/5"
      >
        <span className="font-medium">{question}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-200 ease-in-out px-3 ${
          open ? 'grid-rows-[1fr] py-2' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0">
          <p className="text-sm text-gray-300">{answer}</p>
        </div>
      </div>
    </div>
  );
}

function CardLink({ icon: Icon, title, subtitle, to }) {
  return (
    <Link
      href={to}
      className="block rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition backdrop-blur"
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-emerald-400" />
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-xs text-gray-400">{subtitle}</div>
        </div>
      </div>
    </Link>
  );
}

function ActionCard({ icon: Icon, title, desc, href, cta }) {
  const isExternal = href?.startsWith('http');
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10 backdrop-blur"
    >
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-emerald-500/15 p-2 ring-1 ring-emerald-500/30">
          <Icon className="h-5 w-5 text-emerald-300" />
        </div>
        <div className="flex-1">
          <div className="font-medium">{title}</div>
          <div className="mt-1 text-sm text-gray-300">{desc}</div>
          <div className="mt-3">
            <span className="inline-flex items-center rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium hover:bg-emerald-700">
              {cta}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
