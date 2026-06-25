import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();
  const email = localStorage.getItem("nexushr_email");
  const role = localStorage.getItem("nexushr_role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navbar */}
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-white">NexusHR</h1>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-sm">{email}</span>
          <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded">{role}</span>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-white text-sm transition"
          >
            Logout
          </button>
          <button onClick={() => navigate("/attendance")}
             className="text-slate-400 hover:text-white text-sm transition">
            Attendance
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <p className="text-slate-400 text-sm">Total Employees</p>
            <p className="text-3xl font-bold mt-2">24</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <p className="text-slate-400 text-sm">Present Today</p>
            <p className="text-3xl font-bold mt-2 text-green-400">18</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <p className="text-slate-400 text-sm">Pending Leaves</p>
            <p className="text-3xl font-bold mt-2 text-yellow-400">3</p>
          </div>
        </div>
      </div>
    </div>
  );
}