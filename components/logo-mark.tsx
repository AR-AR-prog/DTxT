import Link from "next/link"

const EyeSVG = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 4C7 4 2.73 7.11 1 12C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12C21.27 7.11 17 4 12 4ZM12 17.5C8.96 17.5 6.5 15.04 6.5 12C6.5 8.96 8.96 6.5 12 6.5C15.04 6.5 17.5 8.96 17.5 12C17.5 15.04 15.04 17.5 12 17.5ZM12 8.5C10.07 8.5 8.5 10.07 8.5 12C8.5 13.93 10.07 15.5 12 15.5C13.93 15.5 15.5 13.93 15.5 12C15.5 10.07 13.93 8.5 12 8.5Z"
      fill="#1A1A1A"
      stroke="#1A1A1A"
      strokeWidth="0.5"
    />
  </svg>
)

interface LogoMarkProps {
  size?: "sm" | "md"
  className?: string
}

export function LogoMark({ size = "md", className = "" }: LogoMarkProps) {
  const boxSize = size === "sm" ? "h-9 w-9" : "h-10 w-10"
  const svgSize = size === "sm" ? 18 : 20
  const textSize = size === "sm" ? "text-lg" : "text-xl"

  return (
    <Link href="/" className={`flex items-center gap-2.5 transition-opacity duration-200 hover:opacity-80 ${className}`}>
      <div className={`flex ${boxSize} items-center justify-center rounded-md border border-border bg-white shadow-sm`}>
        <EyeSVG size={svgSize} />
      </div>
      <span className={`font-serif ${textSize} font-bold leading-none text-foreground tracking-tight`}>agpAIso</span>
    </Link>
  )
}
