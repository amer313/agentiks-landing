export function AgentiksLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      className={className}
    >
      {/* Back depth edges */}
      <line x1="130" y1="85" x2="55" y2="40" stroke="#FFF" strokeWidth="1" opacity="0.18" />
      <line x1="130" y1="85" x2="155" y2="50" stroke="#FFF" strokeWidth="1" opacity="0.18" />
      <line x1="130" y1="85" x2="100" y2="170" stroke="#FFF" strokeWidth="1" opacity="0.18" />
      <line x1="55" y1="40" x2="155" y2="50" stroke="#FFF" strokeWidth="1" opacity="0.18" />
      <line x1="155" y1="50" x2="100" y2="170" stroke="#FFF" strokeWidth="1" opacity="0.18" />
      <line x1="100" y1="170" x2="55" y2="40" stroke="#FFF" strokeWidth="1" opacity="0.18" />
      <circle cx="130" cy="85" r="3" fill="#FFF" opacity="0.18" />

      {/* Front rays */}
      <line x1="100" y1="100" x2="55" y2="40" stroke="#00F0FF" strokeWidth="3" strokeLinecap="round" />
      <line x1="100" y1="100" x2="155" y2="50" stroke="#FF00AA" strokeWidth="3" strokeLinecap="round" />
      <line x1="100" y1="100" x2="100" y2="170" stroke="#B400FF" strokeWidth="3" strokeLinecap="round" />

      {/* Endpoints */}
      <circle cx="55" cy="40" r="5" fill="#00F0FF" />
      <circle cx="155" cy="50" r="5" fill="#FF00AA" />
      <circle cx="100" cy="170" r="5" fill="#B400FF" />

      {/* Center */}
      <circle cx="100" cy="100" r="10" fill="#07080D" stroke="#FFF" strokeWidth="2" />
      <circle cx="100" cy="100" r="4" fill="#FFF" />
    </svg>
  )
}
