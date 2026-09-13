import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Github, 
  Twitter, 
  ArrowUpRight, 
  Terminal, 
  Check, 
  Send 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

interface GlassFooterProps {
  companyName?: string;
  statusBadge?: string;
  showSocials?: boolean;
  newsletterLabel?: string;
  theme: ThemeColors;
  className?: string;
  onNewsletterSubmit?: (email: string) => void;
}

export const GlassFooter: React.FC<GlassFooterProps> = ({
  companyName = 'GodUI Technologies',
  statusBadge = 'All systems 100% operational',
  showSocials = true,
  newsletterLabel = 'Enter your email for updates...',
  theme,
  className,
  onNewsletterSubmit,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    onNewsletterSubmit?.(email);
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
    setEmail('');
  };

  return (
    <footer
      className={cn(
        "relative w-full mt-16 border-t border-white/10 bg-zinc-950/70 backdrop-blur-2xl px-6 py-12 text-zinc-400",
        className
      )}
    >
      {/* Top subtle glow line */}
      <div 
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${theme.primary}50, transparent)`,
        }}
      />

      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Brand & System Status */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div 
                className="w-5 h-5 rounded-lg flex items-center justify-center text-xs font-bold text-zinc-950 shadow-md"
                style={{ backgroundColor: theme.primary }}
              >
                G
              </div>
              <span className="font-semibold text-white tracking-tight text-base">
                {companyName}
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {statusBadge}
            </div>
          </div>

          {/* Newsletter Input with glass effect */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={newsletterLabel}
                className="px-4 py-2 text-xs rounded-full bg-white/[0.05] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 w-60"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-medium rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {subscribed ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Inscrito!</span>
                </>
              ) : (
                <>
                  <span>Assinar</span>
                  <Send className="w-3 h-3" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/5 text-xs">
          <div>
            <span className="text-zinc-200 font-semibold uppercase tracking-wider block mb-3">
              Componentes
            </span>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer transition-colors">Dynamic Island</li>
              <li className="hover:text-white cursor-pointer transition-colors">Liquid Glass Button</li>
              <li className="hover:text-white cursor-pointer transition-colors">Spotlight Card</li>
              <li className="hover:text-white cursor-pointer transition-colors">macOS Dock</li>
            </ul>
          </div>

          <div>
            <span className="text-zinc-200 font-semibold uppercase tracking-wider block mb-3">
              Efeitos & 3D
            </span>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer transition-colors">Border Beam</li>
              <li className="hover:text-white cursor-pointer transition-colors">Three.js Mesh</li>
              <li className="hover:text-white cursor-pointer transition-colors">Aurora Shimmer</li>
              <li className="hover:text-white cursor-pointer transition-colors">Gooey Physics</li>
            </ul>
          </div>

          <div>
            <span className="text-zinc-200 font-semibold uppercase tracking-wider block mb-3">
              Ecosistema
            </span>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer transition-colors">shadcn Registry</li>
              <li className="hover:text-white cursor-pointer transition-colors">Tailwind CSS v4</li>
              <li className="hover:text-white cursor-pointer transition-colors">Motion React</li>
              <li className="hover:text-white cursor-pointer transition-colors">GodUI CLI</li>
            </ul>
          </div>

          <div>
            <span className="text-zinc-200 font-semibold uppercase tracking-wider block mb-3">
              Comunidade
            </span>
            {showSocials && (
              <div className="flex items-center gap-3 text-zinc-400">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/[0.04] hover:text-white hover:bg-white/[0.08] transition-colors">
                  <Github className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/[0.04] hover:text-white hover:bg-white/[0.08] transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <div className="p-2 rounded-xl bg-white/[0.04] text-cyan-400">
                  <Terminal className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-white/5 text-[11px] text-zinc-500">
          <p>© 2026 GodUI. Elementos reais de godui.design em React e Tailwind CSS.</p>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <span>Privacidade</span>
            <span>Termos</span>
            <span>Changelog v2.4</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
