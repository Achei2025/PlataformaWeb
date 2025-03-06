import type React from "react"

interface VisitorLayoutProps {
  children: React.ReactNode
}

const VisitorLayout: React.FC<VisitorLayoutProps> = ({ children }) => {
  return <div className="h-screen w-full">{children}</div>
}

export default VisitorLayout

