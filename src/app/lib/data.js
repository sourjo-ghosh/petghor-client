export const getAllPets = async ()=>{
    const res = await fetch('http://localhost:8000/all-pets');
    const data = await res.json()
    return data;
}