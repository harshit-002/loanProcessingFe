import { useEffect, useMemo, useState } from "react";
import { getAllApplications } from "../api/applicationApi.ts";
import { useNavigate } from "react-router-dom";
import type { ApplicationSummary } from "../interface/interfaces";

export const ApplicationList = () => {
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [applications, setApplications] = useState<ApplicationSummary[]>([]);
  const [sortStatus, setSortStatus] = useState<string>("date");
  const navigate = useNavigate();

  let displayApplications = useMemo(() => {
    let apps = [...applications];
    if (filterStatus !== "all")
      apps = applications.filter(
        (app) => app?.status?.toLowerCase() == filterStatus.toLowerCase()
      );

    if (sortStatus === "date") {
      apps = apps.sort((a, b) =>
        a.loanApplicationDate > b.loanApplicationDate ? -1 : 1
      );
    }
    if (sortStatus === "loan_amt_asc") {
      apps = apps.sort((a, b) => {
        return a.loanAmount - b.loanAmount;
      });
    }
    if (sortStatus === "loan_amt_desc") {
      apps = apps.sort((a, b) => {
        return b.loanAmount - a.loanAmount;
      });
    }
    return apps;
  }, [applications, filterStatus, sortStatus]);

  useEffect(() => {
    const loadApplications = async () => {
      setLoading(true);
      try {
        const response = await getAllApplications();
        const applicationDataList = response.data.data;
        setApplications(applicationDataList as ApplicationSummary[]);
      } catch (error) {
        console.error("Error fetching applications: ", error);
      } finally {
        setLoading(false);
      }
    };
    loadApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📄 Loan Applications
          </h1>
          <p className="text-gray-600">
            Manage and review all your loan applications
          </p>
          <div className="block text-sm font-medium text-gray-700 mb-1 mt-4">
            Total Applications:{" "}
            <span className="font-semibold">{applications?.length || 0}</span>
          </div>
          <div className="mt-3">
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
              }}
              className="px-3 py-2 bg-white border border-gray-300 focus:ring-1 rounded-xl focus:outline-none text-gray-900 cursor-pointer"
            >
              <option value="all" className="py-2 px-4 text-gray-800 bg-white">
                📄 All Applications
              </option>
              <option
                value="approved"
                className="py-2 px-4 text-green-800 bg-green-50"
              >
                🟢 Approved
              </option>
              <option
                value="declined"
                className="py-2 px-4 text-red-800 bg-red-50"
              >
                🔴 Declined
              </option>
              <option
                value="under review"
                className="py-2 px-4 text-orange-800 bg-orange-50"
              >
                🟠 Under Review
              </option>
            </select>
          </div>
          <div className="w-56 mt-4">
            <label
              htmlFor="sortBy"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Sort By
            </label>
            <select
              id="sortBy"
              name="sortBy"
              value={sortStatus}
              onChange={(e) => {
                setSortStatus(e.target.value);
              }}
              className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 text-sm"
            >
              <option value="date">Date</option>
              <option value="loan_amt_asc">Loan Amount (ascending)</option>
              <option value="loan_amt_desc">Loan Amount (descending)</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading applications...</p>
            </div>
          </div>
        ) : (
          <>
            {displayApplications && displayApplications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {displayApplications.map((app: any) => (
                  <div
                    key={app?.id || Math.random()}
                    onClick={() =>
                      app?.id && navigate(`/applications/${app.id}`)
                    }
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-sm text-gray-500">
                        Application #{app?.id || "N/A"}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          app?.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : app?.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : app?.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {app?.status || "Unknown"}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">💰 Loan Amount</p>
                        <p className="text-xl font-bold text-gray-900">
                          ${app?.loanAmount ?? "N/A"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">🎯 Purpose</p>
                        <p className="text-gray-800 font-medium truncate">
                          {app?.loanPurpose || "Not specified"}
                        </p>
                      </div>

                      {app?.applicationDate && (
                        <div>
                          <p className="text-sm text-gray-500">📅 Applied On</p>
                          <p className="text-gray-700">{app.applicationDate}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end mt-4">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Empty State
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No Applications Found
                </h3>
                <p className="text-gray-600 mb-6">
                  You haven't submitted any loan applications yet.
                </p>
                <button
                  onClick={() => navigate("/apply")}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  Apply for Loan
                </button>
              </div>
            )}

            <div className="flex justify-center">
              <button
                onClick={() => navigate("/home")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-all duration-200"
              >
                🏠 Back to Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
