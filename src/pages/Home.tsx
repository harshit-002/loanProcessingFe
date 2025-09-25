import { useNavigate } from "react-router-dom";
import { logoutApi } from "../api/authApi";

export const Home = () => {
  const navigate = useNavigate();
  const handleGoToListOfApplication = () => {
    navigate("/view-applications");
  };
  const handleLogout = async () => {
    try {
      await logoutApi();
      navigate("/login");
    } catch (err) {
      console.log("Error logging out: ", err);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="px-8 py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ScoreWise
                </h1>
                <p className="text-sm text-gray-600 font-medium">
                  Loan Processing System
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-red-300 hover:bg-red-50 text-gray-600 hover:text-red-600 font-medium rounded-xl shadow-sm"
            >
              🚪 Logout
            </button>
          </div>
        </header>

        <main className="px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 leading-tight">
                Smart Lending,
                <br />
                Smarter Decisions
              </h2>
              <p className="text-2xl text-gray-600 font-medium max-w-4xl mx-auto leading-relaxed mb-12">
                Experience the future of loan processing with ScoreWise's
                intelligent platform. Fast approvals, transparent processes, and
                personalized financial solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20">
                <button
                  onClick={() => navigate("/apply")}
                  className="px-12 py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold text-xl rounded-3xl shadow-2xl flex items-center gap-4 min-w-[320px]"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                  <span>Apply for Loan</span>
                  <span className="text-xl">→</span>
                </button>

                <button
                  onClick={handleGoToListOfApplication}
                  className="px-12 py-6 bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-purple-300 text-gray-700 hover:text-purple-700 font-bold text-xl rounded-3xl shadow-xl flex items-center gap-4 min-w-[320px]"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">📄</span>
                  </div>
                  <span>View Applications</span>
                  <span className="text-xl">→</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <span className="text-4xl">⚡</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Lightning Fast
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Get loan decisions in minutes, not days. Our AI-powered system
                  processes applications instantly.
                </p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <span className="text-4xl">🔒</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Bank-Level Security
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Your data is protected with military-grade encryption and
                  advanced security protocols.
                </p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <span className="text-4xl">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Smart Analytics
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Advanced credit scoring and risk analysis for better loan
                  decisions and rates.
                </p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <span className="text-4xl">🎧</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  24/7 Support
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Round-the-clock customer support with real humans ready to
                  help you succeed.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
