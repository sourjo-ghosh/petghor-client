import HeroBanner from "@/components/HomePage/HeroBanner";
import PetsShowcase from "@/components/HomePage/PetsShowcase";
import WhyAdopt from "@/components/HomePage/WhyAdopt";
import AdoptionProcess from "@/components/HomePage/AdoptionProcess";
import SuccessStories from "@/components/HomePage/SuccessStories";
import PetCareTips from "@/components/HomePage/PetCareTips";
import JoinCommunity from "@/components/HomePage/JoinCommunity";
import { getPetsForShowCase } from "./lib/data";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const tokenValue = session?.session?.token || session?.session?.id;
  const sixPets = await getPetsForShowCase(tokenValue);
  // console.log(sixPets)
  return (
    <main className="overflow-hidden">
      <HeroBanner />
      <PetsShowcase  sixPets={sixPets}/>
      <WhyAdopt />
      <AdoptionProcess />
      <SuccessStories />
      <PetCareTips />
      <JoinCommunity />
    </main>
  );
}
