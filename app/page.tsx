import Navbar from "./Navbar/Navbar"
import Hero from "./Hero/Hero"
import RobberyStats from "./Hero/RobberyStats"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <RobberyStats/>
    </main>
  );
}
