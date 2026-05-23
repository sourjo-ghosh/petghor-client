export const getPetByID = async (userId, tokenValue) => {
  // const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/all-pets`;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/all-pets/${userId}`,
    {
      headers: {
        authorization: `Bearer ${tokenValue}`,
      },
    }
  );
  const data = await res.json();
  return data;
};
export const getMyListings = async (email, tokenValue) => {
  // const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/all-pets`;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/my-listings?email=${email}`,
    {
      headers: {
        authorization: `Bearer ${tokenValue}`,
      },
    }
  );
  const data = await res.json();
  return data;
};

export const getPetsForShowCase = async (tokenValue) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-pets`, { 
    headers: {
      authorization: `Bearer ${tokenValue}`,
    }
  });
  const data = await res.json();
  const sixPet = data.data.slice(0, 6);
  return sixPet;
};
