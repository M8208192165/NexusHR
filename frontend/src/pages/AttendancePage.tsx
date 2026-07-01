import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const EMPLOYEE_ID = 1;
const BASE_URL = "https://nexushr-employee.onrender.com";

export default function AttendancePage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const { data: attendance, refetch } = useQuery({
    queryKey: ["attendance"],
    queryFn: async () => {
      const { data } = await axiosClient.get(
        `${BASE_URL}/api/attendance/${EMPLOYEE_ID}`
      );
      return data;
    },
  });

  const checkIn = useMutation({
    mutationFn: async () => {
      const { data } = await axiosClient.post(
        `${BASE_URL}/api/attendance/checkin/${EMPLOYEE_ID}`
      );
      return data;
    },
    onSuccess: () => {
      setMessage("Checked in successfully!");
      refetch();
    },
    onError: () => setMessage("Already checked in today or error occurred."),
  });

  const checkOut = useMutation({
    mutationFn: async () => {
      const { data } = await axiosClient.post(
        `${BASE_URL}/api/attendance/checkout/${EMPLOYEE_ID}`
      );
      return data;
    },
    onSuccess: () => {
      setMessage("Checked out successfully!");
      refetch();
    },
    onError: () => setMessage("No check-in found or error occurred."),
  });

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">NexusHR</h1>
        <div className="flex gap-4">
          <button onClick={() => navigate("/dashboard")}
            className="text-slate-400 hover:text-white text-sm">Dashboard</button>
          <button onClick={() => { localStorage.clear(); navigate("/login"); }}
            className="text-slate-400 hover:text-white text-sm">Logout</button>
        </div>
      </nav>

      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Attendance</h2>

        <div className="flex gap-4 mb-6">
          <button onClick={() => checkIn.mutate()}
            disabled={checkIn.isPending}
            className="bg-green-600 hover:bg-green-500 text-white px-6 py-2.5 rounded-lg font-medium transition">
            {checkIn.isPending ? "Checking in..." : "Check In"}
          </button>
          <button onClick={() => checkOut.mutate()}
            disabled={checkOut.isPending}
            className="bg-red-600 hover:bg-red-500 text-white px-6 py-2.5 rounded-lg font-medium transition">
            {checkOut.isPending ? "Checking out..." : "Check Out"}
          </button>
        </div>

        {message && (
          <p className="text-green-400 bg-green-900/30 border border-green-800 rounded-lg px-4 py-2 mb-6 text-sm">
            {message}
          </p>
        )}

        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-700">
              <tr>
                <th className="text-left px-6 py-3 text-slate-300">Date</th>
                <th className="text-left px-6 py-3 text-slate-300">Check In</th>
                <th className="text-left px-6 py-3 text-slate-300">Check Out</th>
                <th className="text-left px-6 py-3 text-slate-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance?.map((record: any) => (
                <tr key={record.id} className="border-t border-slate-700">
                  <td className="px-6 py-3">{record.attendanceDate}</td>
                  <td className="px-6 py-3">{record.checkIn ? record.checkIn.substring(11, 19) : "-"}</td>
                  <td className="px-6 py-3">{record.checkOut ? record.checkOut.substring(11, 19) : "-"}</td>
                  <td className="px-6 py-3">
                    <span className="bg-green-900/50 text-green-400 px-2 py-1 rounded text-xs">
                      {record.status}
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