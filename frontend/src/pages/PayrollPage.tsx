import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const EMPLOYEE_ID = 1;
const BASE_URL = "http://localhost:8083";

export default function PayrollPage() {
  const navigate = useNavigate();
  const [basicSalary, setBasicSalary] = useState("");
  const [message, setMessage] = useState("");

  const { data: payrolls, refetch } = useQuery({
    queryKey: ["payrolls"],
    queryFn: async () => {
      const { data } = await axiosClient.get(
        `${BASE_URL}/api/payroll/employee/${EMPLOYEE_ID}`
      );
      return data;
    },
  });

  const processPayroll = useMutation({
    mutationFn: async () => {
      const { data } = await axiosClient.post(
        `${BASE_URL}/api/payroll/process/${EMPLOYEE_ID}`,
        { basicSalary: parseFloat(basicSalary) }
      );
      return data;
    },
    onSuccess: () => {
      setMessage("Payroll processed successfully!");
      setBasicSalary("");
      refetch();
    },
    onError: () => setMessage("Payroll already processed this month or error occurred."),
  });

  const getStatusColor = (status: string) => {
    if (status === "PAID") return "bg-green-900/50 text-green-400";
    if (status === "PROCESSED") return "bg-blue-900/50 text-blue-400";
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
          <button onClick={() => navigate("/leaves")}
            className="text-slate-400 hover:text-white text-sm">Leaves</button>
          <button onClick={() => { localStorage.clear(); navigate("/login"); }}
            className="text-slate-400 hover:text-white text-sm">Logout</button>
        </div>
      </nav>

      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Payroll</h2>

        {/* Process Payroll */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Process Payroll</h3>
          <div className="flex gap-4 items-end">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Basic Salary (₹)</label>
              <input
                type="number"
                value={basicSalary}
                onChange={(e) => setBasicSalary(e.target.value)}
                placeholder="e.g. 50000"
                className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48"
              />
            </div>
            <button
              onClick={() => processPayroll.mutate()}
              disabled={processPayroll.isPending || !basicSalary}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white px-6 py-2 rounded-lg font-medium text-sm transition"
            >
              {processPayroll.isPending ? "Processing..." : "Process"}
            </button>
          </div>
          {message && (
            <p className="mt-3 text-green-400 text-sm">{message}</p>
          )}
        </div>

        {/* Payroll History */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700">
            <h3 className="font-semibold">Payroll History</h3>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-slate-700">
              <tr>
                <th className="text-left px-6 py-3 text-slate-300">Month</th>
                <th className="text-left px-6 py-3 text-slate-300">Basic</th>
                <th className="text-left px-6 py-3 text-slate-300">Allowances</th>
                <th className="text-left px-6 py-3 text-slate-300">Tax</th>
                <th className="text-left px-6 py-3 text-slate-300">Net Salary</th>
                <th className="text-left px-6 py-3 text-slate-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {payrolls?.map((p: any) => (
                <tr key={p.id} className="border-t border-slate-700">
                  <td className="px-6 py-3">{p.payrollMonth}</td>
                  <td className="px-6 py-3">₹{p.basicSalary?.toLocaleString()}</td>
                  <td className="px-6 py-3">₹{(p.houseAllowance + p.transportAllowance + p.medicalAllowance)?.toLocaleString()}</td>
                  <td className="px-6 py-3 text-red-400">-₹{p.taxDeduction?.toLocaleString()}</td>
                  <td className="px-6 py-3 text-green-400 font-semibold">₹{p.netSalary?.toLocaleString()}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(p.status)}`}>
                      {p.status}
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