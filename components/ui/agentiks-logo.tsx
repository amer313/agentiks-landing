export function AgentiksLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 149 157"
      fill="currentColor"
      className={className}
    >
      {/* Visor with chamfered corners and slit cutout */}
      <path fillRule="evenodd" d="M32.2 0h84.4l12.4 12.4v34.7H19.8V12.4L32.2 0zm5 27.3h74.4v9.9H37.2v-9.9z" />
      {/* Chevron 1 */}
      <path d="M0 64.5l74.4-12.4 74.4 12.4v17.3L74.4 69.4 0 81.8V64.5z" />
      {/* Chevron 2 */}
      <path d="M17.4 94.2l57-9.9 57 9.9v14.9l-57-9.9-57 9.9V94.2z" />
      {/* Chevron 3 */}
      <path d="M32.2 119.1l42.2-7.5 42.4 7.5v12.4l-42.4-8.5-42.2 8.5v-12.4z" />
      {/* Diamond */}
      <path d="M44.6 141.4l29.8-7.5 29.8 7.5-29.8 14.9-29.8-14.9z" />
    </svg>
  )
}
