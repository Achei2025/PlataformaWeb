import Navbar from "@/app/Navbar/Navbar"

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}