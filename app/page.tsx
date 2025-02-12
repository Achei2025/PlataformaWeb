import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import AboutUs from "./components/AboutUs"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <AboutUs />
    </main>
  )
}

