export const PostPet = async (formData, tokenValue) => {
  const headers = {
    "content-type": "application/json",
  };
  if (tokenValue) {
    headers["authorization"] = `Bearer ${tokenValue}`;
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-pet`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  return data;
};
export const adoptPet = async (formData, tokenValue) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/my-request`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${tokenValue}`,
      },
      body: JSON.stringify(formData),
    },
  );
  const data = await res.json();
  return data;
};
