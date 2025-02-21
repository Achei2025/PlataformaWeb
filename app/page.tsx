import Hero from "@/app/Hero/Hero"
import RobberyStats from "@/app/Hero/RobberyStats"
import DefaultLayout from "./layouts/layout";

export default function Home() {
  return (
    <>
      <DefaultLayout>
      <Hero />
      <RobberyStats />
      </DefaultLayout>
    </>
  )
}

