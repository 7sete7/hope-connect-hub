import { useState, useEffect, useMemo } from 'react';
import { useSite } from '@/contexts/SiteContext';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Palette, CalendarDays, ArrowRight, Heart, MessageCircle, ExternalLink } from 'lucide-react';

// ── HSL ↔ Hex conversion helpers ──────────────────────────────────
function hslStringToHex(hslStr: string): string {
  try {
    const parts = hslStr.trim().split(/[\s,/]+/);
    const h = parseFloat(parts[0]) || 0;
    const s = (parseFloat(parts[1]) || 0) / 100;
    const l = (parseFloat(parts[2]) || 0) / 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  } catch {
    return '#7c3aed';
  }
}

function hexToHslString(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return `0 0% ${Math.round(l * 100)}%`;
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

// ── Color Picker Field ────────────────────────────────────────────
function ColorField({ label, description, value, onChange }: {
  label: string;
  description: string;
  value: string;
  onChange: (hsl: string) => void;
}) {
  const hex = useMemo(() => hslStringToHex(value), [value]);

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background">
      <label className="relative cursor-pointer group">
        <div
          className="w-14 h-14 rounded-xl border-2 border-border shadow-sm group-hover:scale-105 transition-transform"
          style={{ background: `hsl(${value})` }}
        />
        <input
          type="color"
          value={hex}
          onChange={e => onChange(hexToHslString(e.target.value))}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
      </label>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground text-sm">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        <p className="text-xs font-mono text-muted-foreground/70 mt-1">{hex.toUpperCase()}</p>
      </div>
    </div>
  );
}

// ── Live Preview Component ────────────────────────────────────────
function SitePreview({ primary, secondary, accent }: { primary: string; secondary: string; accent: string }) {
  const p = `hsl(${primary})`;
  const s = `hsl(${secondary})`;
  const a = `hsl(${accent})`;

  return (
    <div className="rounded-2xl border border-border overflow-hidden bg-background shadow-sm">
      {/* Mini header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: p }}>
            <Heart className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs font-bold text-foreground">Cooperativa</span>
        </div>
        <div className="flex gap-3">
          {['Início', 'Eventos', 'Parceiros'].map(t => (
            <span key={t} className="text-[10px] text-muted-foreground">{t}</span>
          ))}
        </div>
      </div>

      {/* Mini hero */}
      <div className="relative h-28 flex items-end p-4" style={{ background: `linear-gradient(135deg, ${p}, ${s})` }}>
        <div>
          <div className="h-2 w-32 rounded bg-white/90 mb-1.5" />
          <div className="h-1.5 w-20 rounded bg-white/50" />
        </div>
        <div className="absolute bottom-3 right-3 flex gap-1">
          {[0, 1, 2].map(i => (
            <div key={i} className="h-1 rounded-full" style={{ width: i === 0 ? 16 : 4, background: i === 0 ? 'white' : 'rgba(255,255,255,0.4)' }} />
          ))}
        </div>
      </div>

      {/* Mini events */}
      <div className="p-4">
        <div className="flex items-center justify-center gap-1 mb-3">
          <span className="text-[10px] font-bold text-foreground">Próximos Eventos</span>
          <div className="h-0.5 w-6 rounded-full" style={{ background: p }} />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="rounded-lg border border-border overflow-hidden">
              <div className="h-10 bg-muted" />
              <div className="p-2">
                <div className="h-1.5 w-full rounded bg-foreground/20 mb-1" />
                <div className="flex items-center gap-1 mb-1.5">
                  <CalendarDays className="w-2 h-2" style={{ color: a }} />
                  <div className="h-1 w-2/3 rounded" style={{ background: a, opacity: 0.3 }} />
                </div>
                <div className="flex items-center gap-0.5">
                  <span className="text-[8px] font-semibold" style={{ color: p }}>Saiba mais</span>
                  <ArrowRight className="w-2 h-2" style={{ color: p }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA button with primary */}
        <div className="flex justify-center mt-3">
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full text-white text-[9px] font-semibold" style={{ background: p }}>
            Ver todos os eventos
            <ArrowRight className="w-2.5 h-2.5" />
          </div>
        </div>
      </div>

      {/* Mini partners */}
      <div className="px-4 pb-4">
        <div className="rounded-xl p-3 border border-border">
          <div className="flex items-center justify-center gap-1 mb-2">
            <span className="text-[10px] font-bold text-foreground">Nossos Parceiros</span>
          </div>
          <div className="flex justify-center gap-2 mb-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <span className="text-[8px] font-bold text-muted-foreground">P{i}</span>
              </div>
            ))}
          </div>

          {/* CTA area with secondary */}
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-[8px] text-foreground font-medium">Quer fazer parte?</span>
            <div className="flex items-center gap-0.5 px-2 py-1 rounded-full text-white text-[8px] font-semibold" style={{ background: s }}>
              Seja Parceiro
              <ArrowRight className="w-2 h-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Accent badge showcase */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 justify-center">
          <div className="px-2 py-0.5 rounded-full text-white text-[8px] font-semibold" style={{ background: a }}>Novo</div>
          <div className="px-2 py-0.5 rounded-full text-white text-[8px] font-semibold" style={{ background: a }}>Destaque</div>
          <div className="px-2 py-0.5 rounded-full text-[8px] font-semibold border" style={{ borderColor: a, color: a }}>Em breve</div>
        </div>
      </div>

      {/* Color legend */}
      <div className="px-4 pb-3">
        <div className="flex justify-center gap-3">
          {[
            { color: p, label: 'Primária' },
            { color: s, label: 'Secundária' },
            { color: a, label: 'Destaque' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ background: color }} />
              <span className="text-[8px] text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mini footer */}
      <div className="px-4 py-2 bg-[hsl(220,20%,8%)] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded flex items-center justify-center" style={{ background: p }}>
            <Heart className="w-2 h-2 text-white" />
          </div>
          <span className="text-[8px] text-gray-400">Cooperativa Vida</span>
        </div>
        <div className="flex gap-1">
          <div className="w-4 h-4 rounded-full bg-white/10" />
          <div className="w-4 h-4 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────
export default function AdminColors() {
  const { data, refresh } = useSite();
  const { toast } = useToast();
  const [form, setForm] = useState(data.colors);

  useEffect(() => { setForm(data.colors); }, [data.colors]);

  const handleSave = async () => {
    await api.updateColors(form);
    await refresh();
    toast({ title: 'Cores atualizadas!' });
  };

  const handleReset = () => {
    setForm({ primary: '263 83% 58%', secondary: '330 81% 60%', accent: '160 84% 39%' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <Palette className="w-5 h-5 text-foreground" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Personalizar Cores</h1>
            <p className="text-sm text-muted-foreground">Clique na cor para abrir o seletor</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>Restaurar padrão</Button>
          <Button onClick={handleSave}>Salvar</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Color pickers */}
        <div className="flex flex-col gap-3">
          <ColorField
            label="Cor Primária"
            description="Botões principais, links e destaques do site"
            value={form.primary}
            onChange={v => setForm(f => ({ ...f, primary: v }))}
          />
          <ColorField
            label="Cor Secundária"
            description="Botões secundários e áreas de destaque"
            value={form.secondary}
            onChange={v => setForm(f => ({ ...f, secondary: v }))}
          />
          <ColorField
            label="Cor de Destaque"
            description="Badges, alertas e elementos de ênfase"
            value={form.accent}
            onChange={v => setForm(f => ({ ...f, accent: v }))}
          />
        </div>

        {/* Live preview */}
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-3">Preview do site</p>
          <SitePreview primary={form.primary} secondary={form.secondary} accent={form.accent} />
        </div>
      </div>
    </div>
  );
}
