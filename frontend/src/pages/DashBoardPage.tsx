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
        <div className="flex items-center gap-6">
          <button onClick={() => navigate("/attendance")}
            className="text-slate-400 hover:text-white text-sm transition">
            Attendance
          </button>
          <button onClick={() => navigate("/leaves")}
            className="text-slate-400 hover:text-white text-sm transition">
            Leaves
          </button>
          <button onClick={() => navigate("/payroll")}
            className="text-slate-400 hover:text-white text-sm transition">
            Payroll
          </button>
          <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-700">
            <span className="text-slate-400 text-sm">{email}</span>
            <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded">{role}</span>
            <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-white text-sm transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Welcome back 👋</h2>
          <p className="text-slate-400 text-sm mt-1">Here's what's happening today</p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm">Total Employees</p>
                <p className="text-3xl font-bold mt-2">24</p>
              </div>
              <div className="bg-indigo-600/20 p-3 rounded-lg">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <p className="text-green-400 text-xs mt-3">↑ 2 new this month</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm">Present Today</p>
                <p className="text-3xl font-bold mt-2 text-green-400">18</p>
              </div>
              <div className="bg-green-600/20 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-slate-400 text-xs mt-3">75% attendance rate</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm">Pending Leaves</p>
                <p className="text-3xl font-bold mt-2 text-yellow-400">3</p>
              </div>
              <div className="bg-yellow-600/20 p-3 rounded-lg">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p className="text-slate-400 text-xs mt-3">Requires approval</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/attendance")}
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Check In / Out
            </button>
            <button
              onClick={() => navigate("/leaves")}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Apply Leave
            </button>
            <button
              onClick={() => navigate("/payroll")}
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              View Payslip
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-slate-300">Attendance recorded for today</span>
              <span className="text-slate-500 ml-auto">Today</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-slate-300">Leave request pending approval</span>
              <span className="text-slate-500 ml-auto">Yesterday</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
              <span className="text-slate-300">Payroll processed for June 2026</span>
              <span className="text-slate-500 ml-auto">Jun 25</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}