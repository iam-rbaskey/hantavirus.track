import React from 'react';

interface Props {
  title: string;
  value: number | string;
  unit?: string;
  trend?: string;
  color?: 'accent' | 'danger' | 'warning' | 'success';
  icon?: React.ReactNode;
  loading?: boolean;
}

const COLOR_MAP = {
  accent: {
    text:   'text-white',
    border: 'border-white/10',
    iconBg: 'bg-white/[0.06]',
    iconBorder: 'border-white/10',
    iconText: 'text-white',
    dot:    'bg-white/60',
    glow:   '',
  },
  danger: {
    text:   'text-danger',
    border: 'border-danger/15',
    iconBg: 'bg-danger/10',
    iconBorder: 'border-danger/15',
    iconText: 'text-danger',
    dot:    'bg-danger',
    glow:   'shadow-[0_0_30px_rgba(239,68,68,0.08)]',
  },
  warning: {
    text:   'text-warning',
    border: 'border-warning/15',
    iconBg: 'bg-warning/10',
    iconBorder: 'border-warning/15',
    iconText: 'text-warning',
    dot:    'bg-warning',
    glow:   'shadow-[0_0_30px_rgba(245,158,11,0.08)]',
  },
  success: {
    text:   'text-success',
    border: 'border-success/15',
    iconBg: 'bg-success/10',
    iconBorder: 'border-success/15',
    iconText: 'text-success',
    dot:    'bg-success',
    glow:   'shadow-[0_0_30px_rgba(34,197,94,0.08)]',
  },
};

export const MetricCard = ({ title, value, unit, trend, color = 'accent', icon, loading }: Props) => {
  const c = COLOR_MAP[color];

  return (
    <div className={`relative rounded-2xl glass-card border ${c.border} card-hover overflow-hidden ${c.glow}`}>
      {/* Top shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-text-secondary text-xs font-medium uppercase tracking-wider truncate">{title}</p>
            {loading ? (
              <div className="mt-2 h-9 w-24 bg-white/5 rounded-lg animate-pulse" />
            ) : (
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <span suppressHydrationWarning className={`text-3xl font-black tracking-tight ${c.text}`}>
                  {typeof value === 'number' ? value.toLocaleString() : value}
                </span>
                {unit && <span className="text-text-muted text-xs font-medium">{unit}</span>}
              </div>
            )}
            {trend && (
              <p suppressHydrationWarning className="mt-2 text-[10px] text-text-muted font-mono uppercase tracking-wider">
                {trend}
              </p>
            )}
          </div>

          {icon && (
            <div className={`p-2.5 rounded-xl ${c.iconBg} border ${c.iconBorder} shrink-0`}>
              <div className={c.iconText}>{icon}</div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom-right dot indicator */}
      <div className={`absolute bottom-3 right-3 h-1.5 w-1.5 rounded-full ${c.dot} opacity-50`} />
    </div>
  );
};
