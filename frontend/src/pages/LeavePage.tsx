import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const EMPLOYEE_ID = 1;
const BASE_URL = "https://nexushr-employee.onrender.com";
export default function LeavePage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [leaveType, setLeaveType] = useState("ANNUAL");

  // Fetch leaves
  const { data: leaves, refetch } = useQuery({
    queryKey: ["leaves"],
    queryFn: async () => {
      const { data } = await axiosClient.get(
        `${BASE_URL}/api/leaves/employee/${EMPLOYEE_ID}`
      );
      return data;
    },
  });

  // Apply leave
  const applyLeave = useMutation({
    mutationFn: async () => {
      const { data } = await axiosClient.post(`${BASE_URL}/api/leaves/apply`, {
        employeeId: EMPLOYEE_ID,
        startDate,
        endDate,
        reason,
        leaveType,
      });
      return data;
    },
    onSuccess: () => {
      setMessage("Leave applied successfully!");
      setStartDate("");
      setEndDate("");
      setReason("");
      refetch();
    },
    onError: () => setMessage("Failed to apply leave."),
  });

  const getStatusColor = (status: string) => {
    if (status === "APPROVED") return "bg-green-900/50 text-green-400";
    if (status === "REJECTED") return "bg-red-900/50 text-red-400";
    return "bg-yellow-900/50 text-yellow-400";
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navbar */}
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">NexusHR</h1>
        <div className="flex gap-4">
          <button onClick={() => navigate("/dashboard")}
            className="text-slate-400 hover:text-white text-sm">Dashboard</button>
          <button onClick={() => navigate("/attendance")}
            className="text-slate-400 hover:text-white text-sm">Attendance</button>
          <button onClick={() => { localStorage.clear(); navigate("/login"); }}
            className="text-slate-400 hover:text-white text-sm">Logout</button>
        </div>
      </nav>

      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Leave Management</h2>

        {/* Apply Leave Form */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Apply for Leave</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Leave Type</label>
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="ANNUAL">Annual</option>
                <option value="SICK">Sick</option>
                <option value="CASUAL">Casual</option>
                <option value="UNPAID">Unpaid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Reason</label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason"
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            onClick={() => applyLeave.mutate()}
            disabled={applyLeave.isPending || !startDate || !endDate}
            className="mt-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition disabled:cursor-not-allowed"
          >
            {applyLeave.isPending ? "Applying..." : "Apply Leave"}
          </button>

          {message && (
            <p className="mt-3 text-green-400 text-sm">{message}</p>
          )}
        </div>

        {/* Leave History Table */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700">
            <h3 className="font-semibold">Leave History</h3>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-slate-700">
              <tr>
                <th className="text-left px-6 py-3 text-slate-300">Start Date</th>
                <th className="text-left px-6 py-3 text-slate-300">End Date</th>
                <th className="text-left px-6 py-3 text-slate-300">Type</th>
                <th className="text-left px-6 py-3 text-slate-300">Reason</th>
                <th className="text-left px-6 py-3 text-slate-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves?.map((leave: any) => (
                <tr key={leave.id} className="border-t border-slate-700">
                  <td className="px-6 py-3">{leave.startDate}</td>
                  <td className="px-6 py-3">{leave.endDate}</td>
                  <td className="px-6 py-3">{leave.leaveType}</td>
                  <td className="px-6 py-3">{leave.reason}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(leave.status)}`}>
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}