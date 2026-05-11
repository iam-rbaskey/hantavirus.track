import { formatNumber } from '@/utils/formatters';

interface Props {
  title: string;
  value: number | string;
  type: 'danger' | 'warning' | 'primary' | 'success';
  trend?: string;
  isStatus?: boolean;
}

export const GlobalMetricsCard = ({ title, value, type, trend, isStatus }: Props) => {
  const colorMap = {
    danger: 'text-[var(--color-danger)] shadow-[0_0_15px_rgba(255,77,77,0.2)] border-danger/20',
    warning: 'text-[var(--color-warning)] shadow-[0_0_15px_rgba(255,181,71,0.2)] border-warning/20',
    primary: 'text-[var(--color-primary)] shadow-[0_0_15px_rgba(0,210,255,0.2)] border-primary/20',
    success: 'text-[var(--color-success)] shadow-[0_0_15px_rgba(61,220,151,0.2)] border-success/20',
  };

  const bgMap = {
    danger: 'bg-danger',
    warning: 'bg-warning',
    primary: 'bg-primary',
    success: 'bg-success',
  };

  const displayValue = typeof value === 'number' ? formatNumber(value) : value;

  return (
    <div className={`p-6 rounded-2xl border border-border bg-bg-card/40 backdrop-blur-xl flex flex-col justify-between h-36 transition-all duration-300 hover:-translate-y-1 hover:bg-bg-card/80 ${colorMap[type]}`}>
      <div className="flex justify-between items-start">
        <h3 className="text-xs uppercase tracking-widest text-text-secondary font-medium">{title}</h3>
        {isStatus && (
          <div className={`h-2 w-2 rounded-full ${bgMap[type]} animate-pulse`} />
        )}
      </div>
      
      <div>
        <div className="flex items-baseline gap-2">
          <p className={`text-4xl font-extrabold tracking-tight ${colorMap[type].split(' ')[0]}`}>
            {displayValue}
          </p>
        </div>
        {trend && (
          <p className="text-[10px] uppercase tracking-widest text-text-secondary mt-2 font-mono">
            {trend}
          </p>
        )}
      </div>
    </div>
  );
};
