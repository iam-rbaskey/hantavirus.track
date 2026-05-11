export const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse rounded-xl bg-white/[0.04] ${className}`} />
);

export const CardSkeleton = () => (
  <div className="rounded-2xl glass-card border border-white/[0.06] p-5 space-y-3">
    <Skeleton className="h-3 w-24" />
    <Skeleton className="h-9 w-32" />
    <Skeleton className="h-2 w-20" />
  </div>
);

export const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
    <div className="relative h-12 w-12">
      <div className="absolute inset-0 rounded-full border-2 border-white/10" />
      <div className="absolute inset-0 rounded-full border-t-2 border-white/60 animate-spin" />
    </div>
    <p className="text-text-secondary text-sm font-medium tracking-widest uppercase">Loading intelligence...</p>
  </div>
);

export const ErrorState = ({ message = 'Failed to load data' }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 text-center px-6">
    <div className="h-14 w-14 rounded-2xl bg-danger/10 border border-danger/20 glass-sm flex items-center justify-center">
      <span className="text-2xl font-black text-danger">!</span>
    </div>
    <div>
      <p className="text-white font-semibold text-base">Connection Failed</p>
      <p className="text-text-secondary text-sm mt-1">{message}</p>
    </div>
  </div>
);

export const EmptyState = ({ label = 'No data available' }: { label?: string }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
    <div className="h-12 w-12 rounded-xl glass border border-white/[0.06] flex items-center justify-center">
      <span className="text-text-muted text-xl">—</span>
    </div>
    <p className="text-text-muted text-sm">{label}</p>
  </div>
);
