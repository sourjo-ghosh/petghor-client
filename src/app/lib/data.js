export const getPetByID = async (userId) => {
  // const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/all-pets`;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/all-pets/${userId}`,
  );
  const data = await res.json();
  return data;
};
export const getMyListings = async (email) => {
  // const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/all-pets`;
  const res =
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/my-listings?email=${email}`);
  const data = await res.json();
  return data.data || [];
};

export const getPetsForShowCase = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-pets`);
  const data = await res.json();
  const sixPet = data.data.slice(0, 6);
  return sixPet;
};
