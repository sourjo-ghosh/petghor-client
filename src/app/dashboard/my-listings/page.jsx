"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Package, Edit2, Trash2, MessageCircle, X, Heart, LoaderPinwheel, Check, Loader, Save } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/app/lib/auth-client";
import { getMyListings } from "@/app/lib/data";
import LoadingSpinner from "@/components/LoadingSpinner";


const speciesOptions = ["Dog", "Cat", "Bird", "Rabbit", "Hamster", "Fish", "Other"];
const genderOptions = ["Male", "Female", "Unknown"];
const healthStatusOptions = ["Excellent", "Good", "Fair", "Special Needs"];
const vaccinationStatusOptions = ["Fully Vaccinated", "Partially Vaccinated", "Not Vaccinated"];


export default function MyListingsPage() {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);
  const [totalList, setTotalList] = useState([]);
  const [adoptedList, setAdoptedList] = useState([]);
  const [availableList, setAvailableList] = useState([]);
  const [buttonShow, setButtonShow] = useState(true)
  const [deleteButtonShow, setDeleteButtonShow] = useState(true)

  // Edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    async function loadPets() {
      try {
        const token = await authClient.token();
        const tokenValue = token?.data?.token;
        const myListings = await getMyListings(session?.user?.email, tokenValue);
        setPets(myListings?.data?.myPets || myListings || []);
        setTotalList(myListings?.data?.totalList || []);
        setAdoptedList(myListings?.data?.adoptedList || []);
        setAvailableList(myListings?.data?.availableList || []);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
        setPets([]);
      } finally {
        setLoading(false);
      }
    }
    if (session?.user?.email) {
      loadPets();
    }
  }, [session?.user?.email]);

  const handleViewRequests = async (petId) => {
    setSelectedPetId(petId);
    setLoadingRequests(true);
    try {
      const token = await authClient.token();
      const tokenValue = token?.data?.token;
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/adoptions/pet-requests?petId=${petId}`;
      const res = await fetch(url, {
        headers: {
          authorization: `Bearer ${tokenValue}`,
        },
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      setRequests(data?.data || []);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
      setRequests([]);
      toast.error("Failed to load requests");
    } finally {
      setLoadingRequests(false);
    }
  };

  const handleApprove = async (requestId, petId) => {
    const token = await authClient.token();
    const tokenValue = token?.data?.token;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adoptions/approve`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${tokenValue}`,
      },
      body: JSON.stringify({ requestId, petId }),
    });
    const data = await res.json();
    if (data.success) {
      setButtonShow(false);
      toast.success(data.message || "Approved!");
    } else {
      toast.error(data.message || "Failed to approve request!");
    }
  };

  const handleReject = async (requestId, petId) => {
    const token = await authClient.token();
    const tokenValue = token?.data?.token;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adoptions/reject`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${tokenValue}`,
      },
      body: JSON.stringify({ requestId, petId }),
    });
    const data = await res.json();
    if (data.success) {
      setButtonShow(false);
      toast.success(data.message || "Rejected!");
    } else {
      toast.error(data.message || "Failed to reject request!");
    }
  };

  const handleDeletePet = async (petId) => {
    setDeleteButtonShow(false);
    const token = await authClient.token();
    const tokenValue = token?.data?.token;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/delete-pet/${petId}`, {
      method: "DELETE",
      body: JSON.stringify({ petOwnerEmail: session?.user?.email }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${tokenValue}`,
      },
    });
    const data = await res.json();
    if (data.success) {
      setDeleteButtonShow(true);
      toast.success(data.message || "Pet deleted successfully!");
      setPets((prevPets) => prevPets.filter((pet) => pet._id !== petId));
      setDeleteModalOpen(false);
      setPetToDelete(null);
    } else {
      toast.error(data.message || "Failed to delete pet!");
    }
  };

  const handleDeleteClick = (petId) => {
    setPetToDelete(petId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (petToDelete) {
      handleDeletePet(petToDelete);
    }
  };

 
  const handleEditPet = (petId) => {
    const pet = pets.find((p) => p._id === petId);
    if (!pet) return;
    setEditingPet(pet);
    setEditForm({
      petName: pet.petName || "",
      species: pet.species || "",
      breed: pet.breed || "",
      age: pet.age || "",
      gender: pet.gender || "",
      imageURL: pet.imageURL || "",
      location: pet.location || "",
      healthStatus: pet.healthStatus || "",
      vaccinationStatus: pet.vaccinationStatus || "",
      adoptionFee: pet.adoptionFee || "",
      status: pet.status || "available",
      description: pet.description || "",
    });
    setEditModalOpen(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const token = await authClient.token();
      const tokenValue = token?.data?.token;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/update-pet/${editingPet._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenValue}`,
          },
          body: JSON.stringify({ ...editForm, petOwnerEmail: session?.user?.email }),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success(data.message || "Pet updated successfully!");
        setPets((prevPets) =>
          prevPets.map((pet) =>
            pet._id === editingPet._id ? { ...pet, ...editForm } : pet
          )
        );
        setEditModalOpen(false);
        setEditingPet(null);
      } else {
        toast.error(data.message || "Failed to update pet!");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };
  // 
  if (loading) return <LoadingSpinner message="Loading your listings..." />;

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-muted/30">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">My Listings</h1>
            <Link href="/dashboard/add-pets">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
              >
                <Plus className="h-5 w-5" />
                Add Pet
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl my-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Listings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="bg-card rounded-2xl border border-border/60 shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Listings</p>
              <p className="text-3xl font-bold text-foreground">{totalList.length}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100/60 flex items-center justify-center">
              <Heart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        {/* Adopted */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl border border-border/60 shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Adopted</p>
              <p className="text-3xl font-bold text-yellow-600">{adoptedList.length}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-yellow-100/60 flex items-center justify-center">
              <span className="text-xl"><LoaderPinwheel /></span>
            </div>
          </div>
        </motion.div>

        {/* Available */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl border border-border/60 shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Available</p>
              <p className="text-3xl font-bold text-green-600">
                {availableList === 0 ? 0 : availableList}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100/60 flex items-center justify-center">
              <span className="text-xl"><Check /></span>
            </div>
          </div>
        </motion.div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {pets.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-3xl border border-border/60 shadow-sm p-12"
          >
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-muted/40 flex items-center justify-center mb-4">
                <Package className="h-10 w-10 text-muted-foreground/50" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">No Listings Yet</h2>
              <p className="text-muted-foreground mb-6">You haven&apos;t added any pets for adoption.</p>
              <Link href="/dashboard/add-pets">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
                >
                  <Plus className="h-5 w-5" />
                  Add Your First Pet
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {pets.map((pet, index) => (
              <motion.div
                key={pet._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border/60 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Pet Image */}
                <div className="relative w-full h-48 bg-muted">
                  {pet.imageURL ? (
                    <Image src={pet.imageURL} alt={pet.petName} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <Package className="h-12 w-12 text-muted-foreground/30" />
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-foreground">{pet.petName}</h3>
                      {pet?.status && (
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                            pet.status === "available"
                              ? "bg-green-100 text-green-700"
                              : pet.status === "adopted"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {pet.status.slice(0, 1).toUpperCase() + pet.status.slice(1)}
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-semibold text-foreground">Breed:</span> {pet.breed}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-semibold text-foreground">Species:</span> {pet.species}
                      </p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <Link href={`/all-pets/${pet._id}`} className="flex-1">
                      <button className="w-full px-3 py-2 rounded-lg bg-primary/10 text-primary font-semibold text-sm hover:bg-primary/20 transition-colors">
                        View
                      </button>
                    </Link>
                    <button
                      onClick={() => handleEditPet(pet._id)}
                      className="px-3 py-2 rounded-lg border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(pet._id)}
                      className="px-3 py-2 rounded-lg border border-red-200 text-red-600 font-semibold text-sm hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleViewRequests(pet._id)}
                      className="px-3 py-2 rounded-lg border border-green-200 text-green-600 font-semibold text-sm hover:bg-green-50 transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      {/* Requests Modal */}
      <AnimatePresence>
        {selectedPetId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPetId(null)}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-3xl border border-border/60 shadow-lg max-w-2xl w-full max-h-96 overflow-y-auto"
            >
              <div className="sticky top-0 bg-card border-b border-border/60 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">Adoption Requests</h2>
                <button onClick={() => setSelectedPetId(null)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <X className="h-5 w-5 text-foreground" />
                </button>
              </div>

              <div className="p-6">
                {loadingRequests ? (
                  <p className="text-center text-muted-foreground py-8">Loading requests...</p>
                ) : requests.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-muted-foreground">No adoption requests yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {requests.map((request) => (
                      <div key={request._id} className="p-4 rounded-lg border border-border/60 hover:border-primary/50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-foreground">{request.requesterName}</h3>
                            <p className="text-sm text-muted-foreground">{request.requesterEmail}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            request.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : request.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}>
                            {request.status}
                          </span>
                        </div>
                        <p className="text-sm text-foreground mb-2">{request.message}</p>
                        <p className="text-xs text-muted-foreground mb-3">
                          Pickup: {new Date(request.pickupDate).toLocaleDateString()}
                        </p>
                        {request.status === "pending" && (
                          <div className="flex gap-2">
                          {buttonShow ? 
                          <div>
                          
                            <button
                            onClick={() => handleApprove(request._id, selectedPetId)}
                            className="flex-1 px-3 py-2 rounded-lg bg-green-100 text-green-700 font-semibold text-sm hover:bg-green-200 transition-colors"
                            >
                              Accepted
                            </button>
                            <button
                            onClick={() => handleReject(request._id, selectedPetId)}
                            className="flex-1 px-3 py-2 rounded-lg bg-red-100 text-red-700 font-semibold text-sm hover:bg-red-200 transition-colors"
                            >
                              Rejected
                            </button>
                          </div>    
                            : <p>No actions available</p>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDeleteModalOpen(false)}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-3xl border border-border/60 shadow-lg max-w-md w-full"
            >
              <div className="p-8">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-center text-foreground mb-2">Delete Pet?</h2>
                <p className="text-sm text-center text-muted-foreground mb-6">
                  Are you sure you want to delete this pet? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteModalOpen(false)}
                    className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors"
                  >
                    {deleteButtonShow ? "Delete" : "Deleting..."}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editModalOpen && editingPet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEditModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-3xl border border-border/60 shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-card/95 backdrop-blur-md border-b border-border/60 px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Edit2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">Edit Pet</h2>
                    <p className="text-xs text-muted-foreground">{editingPet.petName}</p>
                  </div>
                </div>
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-foreground" />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleEditSubmit} className="p-6 space-y-7">

                {/* Section 1: Basic Info */}
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">1</span>
                    Basic Information
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Pet Name *</label>
                      <input
                        type="text"
                        name="petName"
                        required
                        value={editForm.petName}
                        onChange={handleEditFormChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                        placeholder="Enter pet name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Species *</label>
                      <select
                        name="species"
                        required
                        value={editForm.species}
                        onChange={handleEditFormChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                      >
                        <option value="">Select species</option>
                        {speciesOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Breed *</label>
                      <input
                        type="text"
                        name="breed"
                        required
                        value={editForm.breed}
                        onChange={handleEditFormChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                        placeholder="e.g., Golden Retriever"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Age *</label>
                      <input
                        type="text"
                        name="age"
                        required
                        value={editForm.age}
                        onChange={handleEditFormChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                        placeholder="e.g., 2 years"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Gender *</label>
                      <select
                        name="gender"
                        required
                        value={editForm.gender}
                        onChange={handleEditFormChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                      >
                        <option value="">Select gender</option>
                        {genderOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 2: Media & Location */}
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">2</span>
                    Media &amp; Location
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Image URL *</label>
                      <input
                        type="url"
                        name="imageURL"
                        required
                        value={editForm.imageURL}
                        onChange={handleEditFormChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                        placeholder="https://imgbb.com/..."
                      />
                      <p className="text-xs text-muted-foreground mt-1">Use imgbb.com or postimage.org</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Location *</label>
                      <input
                        type="text"
                        name="location"
                        required
                        value={editForm.location}
                        onChange={handleEditFormChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                        placeholder="e.g., New York, NY"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Health Info */}
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">3</span>
                    Health Information
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Health Status *</label>
                      <select
                        name="healthStatus"
                        required
                        value={editForm.healthStatus}
                        onChange={handleEditFormChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                      >
                        <option value="">Select health status</option>
                        {healthStatusOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Vaccination Status *</label>
                      <select
                        name="vaccinationStatus"
                        required
                        value={editForm.vaccinationStatus}
                        onChange={handleEditFormChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                      >
                        <option value="">Select vaccination status</option>
                        {vaccinationStatusOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 4: Adoption Details */}
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">4</span>
                    Adoption Details
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Adoption Fee</label>
                      <div className="flex items-center gap-2">
                        <span className="text-foreground font-medium">$</span>
                        <input
                          type="number"
                          name="adoptionFee"
                          min="0"
                          step="0.01"
                          value={editForm.adoptionFee}
                          onChange={handleEditFormChange}
                          className="flex-1 px-4 py-2.5 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    
                    
                  </div>
                </div>

                {/* Section 5: Description */}
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">5</span>
                    Pet Description
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Description *</label>
                    <textarea
                      name="description"
                      required
                      rows="4"
                      value={editForm.description}
                      onChange={handleEditFormChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all resize-none"
                      placeholder="Describe the pet's personality, behavior, and special needs..."
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditModalOpen(false)}
                    className="flex-1 px-4 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isUpdating}
                    className="flex-1 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? (
                      <><Loader className="h-4 w-4 animate-spin" /> Saving...</>
                    ) : (
                      <><Save className="h-4 w-4" /> Save Changes</>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
