import React from 'react';
import { getAllPets } from '../lib/data';

const allPetsPage =async () => {
    const allPets = await getAllPets()
    console.log(allPets?.data)
    return (
        <div>
            
        </div>
    );
};

export default allPetsPage;