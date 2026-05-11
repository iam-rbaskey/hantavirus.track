'use client';
import { useState } from 'react';
import { useTimeline } from '@/hooks/useTimeline';
import { PageLoader, ErrorState, EmptyState } from '@/components/ui/States';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TimelinePage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useTimeline(page);

  if (isLoading) return <PageLoader />;
  if (error)     return <ErrorState />;

  const events = data?.data ?? [];
  const meta   = data?.meta;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-10">
      <p className="text-text-secondary text-sm">{meta?.total ?? events.length} outbreak events recorded</p>

      {events.length === 0 ? (
        <EmptyState label="No timeline events found" />
      ) : (
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-white/[0.06]" />

          <div className="space-y-5 pl-12">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.5) }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[34px] top-4 h-2.5 w-2.5 rounded-full bg-white/20 border border-white/10 ring-4 ring-[#050816]" />

                <div className="rounded-2xl glass-card border border-white/[0.07] p-5 card-hover">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span suppressHydrationWarning className="text-[11px] font-bold font-mono text-white/60 bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-lg">
                      {new Date(event.eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                    <span className="text-[10px] text-text-muted uppercase tracking-wider">{event.source.name}</span>
                  </div>
                  <h3 className="text-white font-semibold text-sm leading-snug mb-2">{event.title}</h3>
                  {event.description && (
                    <p className="text-text-secondary text-xs leading-relaxed line-clamp-3">{event.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-6">
          {[
            { label: 'Prev', icon: <ChevronLeft className="w-4 h-4" />, disabled: page === 1, action: () => setPage(p => p - 1) },
            { label: 'Next', icon: <ChevronRight className="w-4 h-4" />, disabled: page >= meta.totalPages, action: () => setPage(p => p + 1) },
          ].map(({ label, icon, disabled, action }) => (
            <button
              key={label}
              disabled={disabled}
              onClick={action}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl glass-sm border border-white/[0.06] text-text-secondary text-sm hover:bg-white/[0.04] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              {label === 'Prev' && icon} {label} {label === 'Next' && icon}
            </button>
          ))}
          <span className="text-text-muted text-sm font-mono">{page} / {meta.totalPages}</span>
        </div>
      )}
    </div>
  );
}
