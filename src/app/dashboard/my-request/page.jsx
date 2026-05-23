"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Heart, LoaderPinwheel, Trash2, X } from "lucide-react";

import { authClient } from "@/app/lib/auth-client";
import Link from "next/link";
import { toast } from "sonner";

export default function MyRequestsPage() {
  const [requestsData, setRequestsData] = useState([]);
  const { data: session } = authClient.useSession();
  const [approvedList, setApprovedList] = useState([]);
  const [rejectedList, setRejectedList] = useState([]);
  const [pendingList, setPendingList] = useState([]);
  const [petToDelete, setPetToDelete] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    async function loadRequests() {
      try {
        const token = await authClient.token();
        const tokenValue = token?.data?.token;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/my-requests?email=${session?.user?.email}`,
          {
            headers: {
              authorization: `Bearer ${tokenValue}`,
            },
          }
        );
        const data = await res.json();
        setRequestsData(data.data.myRequests || []);
        setApprovedList(data.data.approvedList || []);
        setRejectedList(data.data.rejectedList || []);
        setPendingList(data.data.pendingList || []);
      } catch (error) {
        console.error("Failed to fetch adoption requests:", error);
        setRequestsData([]);
      } finally {
        // setLoading(false);
      }
    }
    if (session?.user?.email) {
      loadRequests();
    }
  }, [session?.user?.email]);

  const handleDeletePet = async (petId) => {
    const token = await authClient.token();
    const tokenValue = token?.data?.token;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/delete-request/${petId}`,
      {
        method: "DELETE",
        body: JSON.stringify({ requesterEmail: session?.user?.email }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenValue}`,
        },
      },
    );
    const data = await res.json();
    if (data.success) {
      toast.success(data.message || "Request deleted successfully!");
      setDeleteModalOpen(false);
      setPetToDelete(null);
      // Refresh the request list after deletion
      setRequestsData((prevRequests) =>
        prevRequests.filter((request) => request._id !== petId),
      );
      setPendingList((prev) => prev.filter((req) => req._id !== petId));
    } else {
      toast.error(data.message || "Failed to delete request!");
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

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-muted/30">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-foreground">
            Adoption Requests
          </h1>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            className="bg-card rounded-2xl border border-border/60 shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Total Requests
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {requestsData.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100/60 flex items-center justify-center">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          {/* Pending Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl border border-border/60 shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Pending
                </p>
                <p className="text-3xl font-bold text-yellow-600">
                  {pendingList.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-100/60 flex items-center justify-center">
                <span className="text-xl">
                  <LoaderPinwheel />
                </span>
              </div>
            </div>
          </motion.div>

          {/* Approved Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl border border-border/60 shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Approved
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {approvedList.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100/60 flex items-center justify-center">
                <span className="text-xl">
                  <Check />
                </span>
              </div>
            </div>
          </motion.div>

          {/* Rejected Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl border border-border/60 shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Rejected
                </p>
                <p className="text-3xl font-bold text-red-600">
                  {rejectedList.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-red-100/60 flex items-center justify-center">
                <span className="text-xl">
                  <X />
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Empty State */}
        {requestsData.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-3xl border border-border/60 shadow-sm p-12"
          >
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-muted/40 flex items-center justify-center mb-4">
                <Heart className="h-10 w-10 text-muted-foreground/50" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                No Requests Yet
              </h2>
              <p className="text-muted-foreground">
                Adoption requests for your pets will appear here.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-3xl border border-border/60 shadow-sm p-6 overflow-x-auto"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60">
                    <th className="text-left py-4 px-6 font-semibold text-foreground">
                      Pet Name
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-foreground">
                      Request Date
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-foreground">
                      Pickup Date
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-foreground">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {requestsData.map((request) => (
                    <tr
                      key={request._id}
                      className="border-b border-border/40 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-4 px-6 text-foreground font-medium">
                        {request.petName}
                      </td>
                      <td className="py-4 px-6 text-muted-foreground">
                        {new Date(request.requestDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-muted-foreground">
                        {request.pickupDate
                          ? new Date(request.pickupDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                            request.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : request.status === "Approved"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {request.status === "pending" && (
                          <div className="flex gap-2 flex-wrap">
                            <Link href={`/all-pets/${request.petId}`}>
                              <button className="px-3 py-1.5 rounded text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors font-semibold whitespace-nowrap">
                                View
                              </button>
                            </Link>
                            <button onClick={()=> handleDeleteClick(request._id) } className="px-3 py-1.5 rounded text-sm bg-red-100 text-red-700 hover:bg-red-200 transition-colors font-semibold whitespace-nowrap">
                              Delete
                            </button>
                          </div>
                        )}
                        {(request.status === "approved" ||
                          request.status === "rejected") && (
                          <span className="text-muted-foreground text-xs">
                            —
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </main>
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
              {/* Modal Content */}
              <div className="p-8">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-center text-foreground mb-2">
                  Delete Pet?
                </h2>
                <p className="text-sm text-center text-muted-foreground mb-6">
                  Are you sure you want to delete this pet? This action cannot
                  be undone.
                </p>

                {/* Action Buttons */}
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
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
