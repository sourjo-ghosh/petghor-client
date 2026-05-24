import SinglePetClient from "./SinglePetClient";

export async function generateMetadata({ params }) {
  try {
    const { userId } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-pets/${userId}`, {
      next: { revalidate: 3600 }
    });
    if (res.ok) {
      const result = await res.json();
      if (result && result.data) {
        const pet = result.data;
        return {
          title: `${pet.petName} — Adopt this ${pet.breed || pet.species}`,
          description: pet.description || `Meet ${pet.petName}, a lovely pet looking for their forever home on PetGhor. Check out their profile and submit an adoption request today!`,
          openGraph: {
            images: pet.imageURL ? [pet.imageURL] : [],
          }
        };
      }
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return {
    title: "Pet Details",
    description: "View details of this wonderful pet and submit an adoption request on PetGhor.",
  };
}

export default async function Page({ params }) {
  return <SinglePetClient params={params} />;
}
