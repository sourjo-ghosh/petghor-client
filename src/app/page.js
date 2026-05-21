import HeroBanner from "@/components/HomePage/HeroBanner";
import PetsShowcase from "@/components/HomePage/PetsShowcase";
import WhyAdopt from "@/components/HomePage/WhyAdopt";
import AdoptionProcess from "@/components/HomePage/AdoptionProcess";
import SuccessStories from "@/components/HomePage/SuccessStories";
import PetCareTips from "@/components/HomePage/PetCareTips";
import JoinCommunity from "@/components/HomePage/JoinCommunity";
import { getPetsForShowCase } from "./lib/data";

export default async function Home() {
  const sixPets = await getPetsForShowCase()
  console.log(sixPets)
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
