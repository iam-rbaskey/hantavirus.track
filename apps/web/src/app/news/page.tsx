'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchNews } from '@/services/news.service';
import { PageLoader, ErrorState, EmptyState } from '@/components/ui/States';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NewsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
    refetchInterval: 60_000,
    staleTime: 30_000,
  });

  if (isLoading) return <PageLoader />;
  if (error)     return <ErrorState />;

  const articles = data ?? [];

  return (
    <div className="space-y-4 pb-10">
      <p className="text-text-secondary text-sm">{articles.length} intelligence reports</p>

      {articles.length === 0 ? (
        <EmptyState label="No intelligence reports available" />
      ) : (
        <div className="space-y-3">
          {articles.map((article, i) => (
            <motion.a
              key={i}
              href={article.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="block rounded-2xl glass-card border border-white/[0.07] p-5 card-hover group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 border border-white/10 bg-white/[0.04] px-2 py-0.5 rounded-lg">
                      {article.source}
                    </span>
                    <span suppressHydrationWarning className="text-[10px] text-text-muted font-mono">
                      {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-white font-medium text-sm leading-relaxed group-hover:text-text-secondary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </div>
                <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-white transition-colors shrink-0 mt-1" />
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </div>
  );
}
