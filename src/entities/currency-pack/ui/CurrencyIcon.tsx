export function CurrencyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" shapeRendering="crispEdges" className={className}>
      <rect x="0" y="10" width="16" height="5" fill="#d9a21f" />
      <rect x="0" y="10" width="16" height="1" fill="#ffe9a3" />
      <rect x="0" y="14" width="16" height="1" fill="#9a6a12" />
      <rect x="3" y="5" width="10" height="5" fill="#f7c948" />
      <rect x="3" y="5" width="10" height="1" fill="#fff3c4" />
      <rect x="3" y="9" width="10" height="1" fill="#b7821a" />
      <rect x="5" y="0" width="6" height="5" fill="#ffd966" />
      <rect x="5" y="0" width="6" height="1" fill="#fffbe6" />
      <rect x="5" y="4" width="6" height="1" fill="#c8921a" />
    </svg>
  );
}
