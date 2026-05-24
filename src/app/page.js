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

export const metadata = {
  title: "Home — Adopt a Pet Today",
  description:
    "Welcome to PetGhor! Browse hundreds of adorable pets waiting for their forever home. Dogs, cats, birds, rabbits and more — find your perfect companion today.",
  openGraph: {
    title: "PetGhor — Adopt a Pet Today",
    description:
      "Browse pets available for adoption near you. Give an animal the loving home they deserve.",
    url: "https://petghor.vercel.app",
  },
};

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
