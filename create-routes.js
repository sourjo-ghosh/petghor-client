const fs = require('fs');
const path = require('path');

// Create directories
const dirs = [
  'c:\\Projects\\petghor\\src\\app\\add-pets',
  'c:\\Projects\\petghor\\src\\app\\listing',
  'c:\\Projects\\petghor\\src\\app\\my-request'
];

dirs.forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
});

// Create add-pets page
fs.writeFileSync(
  'c:\\Projects\\petghor\\src\\app\\add-pets\\page.js',
  `'use client';

export default function AddPets() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-6">Add a New Pet</h1>
        
        <form className="space-y-6">
          <div>
            <label htmlFor="petName" className="block text-sm font-medium text-gray-700">
              Pet Name
            </label>
            <input
              type="text"
              id="petName"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter pet name"
            />
          </div>

          <div>
            <label htmlFor="petType" className="block text-sm font-medium text-gray-700">
              Pet Type
            </label>
            <select
              id="petType"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a type</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
              <option value="rabbit">Rabbit</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="breed" className="block text-sm font-medium text-gray-700">
              Breed
            </label>
            <input
              type="text"
              id="breed"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter breed"
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="text"
              id="age"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 2 years"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe your pet..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Add Pet
          </button>
        </form>
      </div>
    </div>
  );
}
`
);

// Create listing page
fs.writeFileSync(
  'c:\\Projects\\petghor\\src\\app\\listing\\page.js',
  `'use client';

export default function Listing() {
  // Sample pet data - replace with actual data from API
  const pets = [
    {
      id: 1,
      name: 'Max',
      type: 'Dog',
      breed: 'Golden Retriever',
      age: '3 years',
      description: 'Friendly and playful golden retriever'
    },
    {
      id: 2,
      name: 'Whiskers',
      type: 'Cat',
      breed: 'Persian',
      age: '2 years',
      description: 'Calm and cuddly Persian cat'
    },
    {
      id: 3,
      name: 'Rocky',
      type: 'Dog',
      breed: 'German Shepherd',
      age: '4 years',
      description: 'Loyal and intelligent German Shepherd'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Pet Listings</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div key={pet.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-32"></div>
              
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{pet.name}</h2>
                
                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <p><span className="font-semibold">Type:</span> {pet.type}</p>
                  <p><span className="font-semibold">Breed:</span> {pet.breed}</p>
                  <p><span className="font-semibold">Age:</span> {pet.age}</p>
                </div>

                <p className="text-gray-700 text-sm mb-4">{pet.description}</p>

                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`
);

// Create my-request page
fs.writeFileSync(
  'c:\\Projects\\petghor\\src\\app\\my-request\\page.js',
  `'use client';

export default function MyRequest() {
  // Sample request data - replace with actual data from API
  const requests = [
    {
      id: 1,
      petName: 'Max',
      requestType: 'Adoption',
      status: 'Pending',
      date: '2024-05-20',
      message: 'Interested in adopting Max'
    },
    {
      id: 2,
      petName: 'Whiskers',
      requestType: 'Foster',
      status: 'Approved',
      date: '2024-05-18',
      message: 'Temporary foster care'
    },
    {
      id: 3,
      petName: 'Rocky',
      requestType: 'Adoption',
      status: 'Rejected',
      date: '2024-05-15',
      message: 'Application for adoption'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Requests</h1>

        {requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{request.petName}</h2>
                    <p className="text-sm text-gray-600">Request Type: {request.requestType}</p>
                  </div>
                  <span className={\`px-3 py-1 rounded-full text-sm font-semibold \${getStatusColor(request.status)}\`}>
                    {request.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p><span className="font-semibold">Date:</span> {request.date}</p>
                  <p><span className="font-semibold">Message:</span> {request.message}</p>
                </div>

                <div className="flex gap-2">
                  <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                    View Details
                  </button>
                  {request.status === 'Pending' && (
                    <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition">
                      Cancel Request
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No requests yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
`
);

console.log('All files created successfully!');
