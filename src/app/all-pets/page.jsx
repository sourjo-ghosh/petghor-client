import AllPetsClient from "./AllPetsClient";

export const metadata = {
  title: "All Pets — Browse Pets for Adoption",
  description:
    "Explore all pets available for adoption on PetGhor. Filter by species, search by name, and find your perfect furry, feathered, or finned companion.",
  openGraph: {
    title: "All Pets — Browse Pets for Adoption | PetGhor",
    description:
      "Filter and search through dogs, cats, birds, rabbits and more. Every pet is waiting for a loving family.",
    url: "https://petghor.vercel.app/all-pets",
  },
};

export default function AllPetsPage() {
  return <AllPetsClient />;
}
