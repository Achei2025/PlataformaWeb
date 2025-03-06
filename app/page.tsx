import Hero from "@/app/Hero/Hero"
import RobberyStats from "@/app/Hero/RobberyStats"
import DefaultLayout from "./layouts/layout";
import PlatformSolution from "@/app/Hero/PlatformSolution";

export default function Home() {
  return (
    <>
      <DefaultLayout>
      <Hero />
      <RobberyStats />
      <PlatformSolution/>
      </DefaultLayout>
    </>
  )
}

