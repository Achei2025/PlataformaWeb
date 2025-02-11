import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import AboutUs from "./components/AboutUs"
import Download from "./components/Download"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <AboutUs />
      <Download />
    </main>
  )
}

