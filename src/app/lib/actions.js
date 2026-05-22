export const PostPet = async (formData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-pet`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  return data;
};
export const adoptPet = async (formData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/my-request`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    },
  );
  const data = await res.json();
  return data;
};
