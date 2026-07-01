import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const EMPLOYEE_ID = 1;
const BASE_URL = "https://nexushr-employee.onrender.com";
export default function PerformancePage() {
  const navigate = useNavigate();
  const [reviewerName, setReviewerName] = useState("");
  const [goals, setGoals] = useState("");
  const [achievements, setAchievements] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(3);
  const [message, setMessage] = useState("");

  const { data: reviews, refetch } = useQuery({
    queryKey: ["performance"],
    queryFn: async () => {
      const { data } = await axiosClient.get(
        `${BASE_URL}/api/performance/employee/${EMPLOYEE_ID}`
      );
      return data;
    },
  });

  const createReview = useMutation({
    mutationFn: async () => {
      const { data } = await axiosClient.post(
        `${BASE_URL}/api/performance/review`,
        { employeeId: EMPLOYEE_ID, reviewerName, goals, achievements, feedback, rating }
      );
      return data;
    },
    onSuccess: () => {
      setMessage("Review created successfully!");
      setReviewerName(""); setGoals(""); setAchievements(""); setFeedback(""); setRating(3);
      refetch();
    },
    onError: () => setMessage("Failed to create review."),
  });

  const getStatusColor = (status: string) => {
    if (status === "APPROVED") return "bg-green-900/50 text-green-400";
    if (status === "SUBMITTED") return "bg-blue-900/50 text-blue-400";
    return "bg-yellow-900/50 text-yellow-400";
  };

  const getRatingStars = (rating: number) => "★".repeat(rating) + "☆".repeat(5 - rating);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">NexusHR</h1>
        <div className="flex gap-4">
          <button onClick={() => navigate("/dashboard")} className="text-slate-400 hover:text-white text-sm">Dashboard</button>
          <button onClick={() => navigate("/attendance")} className="text-slate-400 hover:text-white text-sm">Attendance</button>
          <button onClick={() => navigate("/leaves")} className="text-slate-400 hover:text-white text-sm">Leaves</button>
          <button onClick={() => navigate("/payroll")} className="text-slate-400 hover:text-white text-sm">Payroll</button>
          <button onClick={() => { localStorage.clear(); navigate("/login"); }} className="text-slate-400 hover:text-white text-sm">Logout</button>
        </div>
      </nav>

      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Performance Reviews</h2>

        {/* Create Review Form */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">New Performance Review</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Reviewer Name</label>
              <input type="text" value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="Enter reviewer name"
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Rating (1-5)</label>
              <select value={rating} onChange={(e) => setRating(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {[1,2,3,4,5].map(n => (
                  <option key={n} value={n}>{n} Star{n > 1 ? "s" : ""}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Goals</label>
              <textarea value={goals} onChange={(e) => setGoals(e.target.value)}
                placeholder="Enter goals"
                rows={3}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Achievements</label>
              <textarea value={achievements} onChange={(e) => setAchievements(e.target.value)}
                placeholder="Enter achievements"
                rows={3}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-slate-400 mb-1">Feedback</label>
              <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)}
                placeholder="Enter feedback"
                rows={2}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            onClick={() => createReview.mutate()}
            disabled={createReview.isPending || !reviewerName}
            className="mt-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition"
          >
            {createReview.isPending ? "Submitting..." : "Submit Review"}
          </button>

          {message && <p className="mt-3 text-green-400 text-sm">{message}</p>}
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews?.map((review: any) => (
            <div key={review.id} className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-semibold">{review.reviewerName}</p>
                  <p className="text-slate-400 text-sm">{review.reviewDate}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-yellow-400 text-lg">{getRatingStars(review.rating)}</span>
                  <span className={`px-2 py-1 rounded text-xs ${getStatusColor(review.status)}`}>
                    {review.status}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-slate-400 mb-1">Goals</p>
                  <p className="text-slate-300">{review.goals}</p>
                </div>
                <div>
                  <p className="text-slate-400 mb-1">Achievements</p>
                  <p className="text-slate-300">{review.achievements}</p>
                </div>
                <div>
                  <p className="text-slate-400 mb-1">Feedback</p>
                  <p className="text-slate-300">{review.feedback}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}