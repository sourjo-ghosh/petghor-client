import React from 'react';

const AdoptPage = async ({params}) => {
    const { userId } = await params;  // same petId পাবে

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-pets/${userId}`);
  const pet = await res.json();
  console.log(pet)
    return (
        <div>
            
        </div>
    );
};

export default AdoptPage;