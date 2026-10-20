import { ExternalLink, CheckCircle2, AlertCircle, Info } from 'lucide-react'
import type { SearchResult } from '@/lib/web-search'

interface BackerInformationProps {
  supporting: SearchResult[]
  contradicting: SearchResult[]
  neutral: SearchResult[]
}

export function BackerInformation({
  supporting,
  contradicting,
  neutral
}: BackerInformationProps) {
  const hasAnySources = supporting.length > 0 || contradicting.length > 0 || neutral.length > 0

  if (!hasAnySources) {
    return (
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-mono uppercase tracking-widest text-foreground/82 mb-3">
          Cross-Source Verification
        </h3>
        <p className="text-sm text-foreground/70">
          No cross-source verification data available for this article.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-6 pt-6 border-t border-border">
      <h3 className="text-sm font-mono uppercase tracking-widest text-foreground/82 mb-4">
        Cross-Source Verification
      </h3>
      <p className="text-xs text-foreground/70 mb-4">
        Related sources discussing similar topics:
      </p>

      <div className="space-y-4">
        {/* Supporting Sources */}
        {supporting.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <h4 className="text-xs font-medium text-foreground/90">
                Supporting Sources ({supporting.length})
              </h4>
            </div>
            <div className="space-y-2">
              {supporting.map((source, index) => (
                <SourceCard key={index} source={source} type="supporting" />
              ))}
            </div>
          </div>
        )}

        {/* Contradicting Sources */}
        {contradicting.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <h4 className="text-xs font-medium text-foreground/90">
                Contradicting Sources ({contradicting.length})
              </h4>
            </div>
            <div className="space-y-2">
              {contradicting.map((source, index) => (
                <SourceCard key={index} source={source} type="contradicting" />
              ))}
            </div>
          </div>
        )}

        {/* Neutral Sources */}
        {neutral.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-foreground/60" />
              <h4 className="text-xs font-medium text-foreground/90">
                Related Sources ({neutral.length})
              </h4>
            </div>
            <div className="space-y-2">
              {neutral.map((source, index) => (
                <SourceCard key={index} source={source} type="neutral" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface SourceCardProps {
  source: SearchResult
  type: 'supporting' | 'contradicting' | 'neutral'
}

function SourceCard({ source, type }: SourceCardProps) {
  const borderColor = {
    supporting: 'border-green-200 bg-green-50/50',
    contradicting: 'border-red-200 bg-red-50/50',
    neutral: 'border-border bg-muted/30'
  }[type]

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block rounded-lg border ${borderColor} p-3 transition-colors hover:bg-muted/50 focus-ring`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h5 className="text-sm font-medium text-foreground line-clamp-2 mb-1">
            {source.title}
          </h5>
          <p className="text-xs text-foreground/70 line-clamp-2 mb-2">
            {source.snippet}
          </p>
          <div className="flex items-center gap-2 text-xs text-foreground/60">
            <span className="font-mono">{source.source}</span>
            {source.publishedDate && (
              <>
                <span>•</span>
                <span>{new Date(source.publishedDate).toLocaleDateString()}</span>
              </>
            )}
          </div>
        </div>
        <ExternalLink className="w-4 h-4 text-foreground/40 shrink-0 mt-0.5" />
      </div>
    </a>
  )
}
