import { useEffect, useState } from "react";
import { getApplicationById } from "../api/applicationApi";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import type {
  ApplicationDetails as ApplicationDetailsType,
  declineReason,
} from "../interface/interfaces";

export const ApplicationDetails = () => {
  const [applicationDetail, setApplicationDetails] =
    useState<ApplicationDetailsType | null>(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [declineReasonInfo, setDeclineReasonInfo] =
    useState<declineReason | null>(null);

  useEffect(() => {
    setLoading(true);
    const loadApplicationDetails = async () => {
      if (typeof id !== "string") {
        console.log("Invalid application ID");
        return;
      }

      try {
        const response = await getApplicationById(id);
        setApplicationDetails(response.data.data);
        console.log("Application details:", response.data.data);
        const appData = response.data.data.loanInfo;

        if (appData.declineReason) {
          try {
            const parsed = JSON.parse(appData.declineReason);
            const reasonObj = parsed[0];
            setDeclineReasonInfo(reasonObj);
          } catch (error) {
            console.error("Error parsing decline reason:", error);
          }
        }
      } catch (error) {
        console.error("Error fetching application details: ", error);
      } finally {
        setLoading(false);
      }
    };
    loadApplicationDetails();
  }, [id]);

  const user = applicationDetail?.user;
  const employmentDetails = applicationDetail?.employmentDetails;
  const loanApplication = applicationDetail?.loanInfo;

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <button
            onClick={() => navigate("/view-applications")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            ← Back to Applications
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            📋 Application Details
          </h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading application details...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                  <span className="text-2xl">👤</span>
                  <h2 className="text-xl font-bold text-gray-900">
                    Personal Details
                  </h2>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      emoji: "👨‍💼",
                      label: "Full Name",
                      value: `${user?.firstName || "N/A"} ${
                        user?.middleName || ""
                      } ${user?.lastName || ""}`,
                    },
                    {
                      emoji: "📅",
                      label: "Date of Birth",
                      value: user?.dateOfBirth || "N/A",
                    },
                    {
                      emoji: "💑",
                      label: "Marital Status",
                      value: user?.maritalStatus || "N/A",
                    },
                    {
                      emoji: "🆔",
                      label: "SSN Number",
                      value: user?.ssnNumber || "N/A",
                    },
                    {
                      emoji: "📊",
                      label: "Credit Score",
                      value: user?.score ?? "N/A",
                    },
                    {
                      emoji: "📧",
                      label: "Email",
                      value: user?.contactInfo?.email || "N/A",
                    },
                    {
                      emoji: "📱",
                      label: "Mobile",
                      value: user?.contactInfo?.mobile || "N/A",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span>{item.emoji}</span>
                        <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                          {item.label}
                        </span>
                      </div>
                      <p className="text-gray-900 font-medium ml-6">
                        {item.value}
                      </p>
                    </div>
                  ))}

                  <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center gap-2 mb-1">
                      <span>🏠</span>
                      <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                        Address
                      </span>
                    </div>
                    <p className="text-gray-900 font-medium ml-6">
                      {user?.address?.addressLine1 || ""},{" "}
                      {user?.address?.city || ""}, {user?.address?.state || ""}{" "}
                      {user?.address?.postalCode || ""}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                  <span className="text-2xl">💰</span>
                  <h2 className="text-xl font-bold text-gray-900">
                    Loan Details
                  </h2>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      emoji: "💵",
                      label: "Loan Amount",
                      value: `$${loanApplication?.loanAmount ?? "N/A"}`,
                    },
                    {
                      emoji: "🎯",
                      label: "Purpose",
                      value: loanApplication?.loanPurpose || "N/A",
                    },
                    {
                      emoji: "📅",
                      label: "Application Date",
                      value: loanApplication?.applicationDate || "N/A",
                    },
                    {
                      emoji: "⚡",
                      label: "Status",
                      value: loanApplication?.status || "N/A",
                    },
                    {
                      emoji: "❌",
                      label: "Decline Reason",
                      value:
                        declineReasonInfo?.description ||
                        declineReasonInfo?.title ||
                        "No reason provided",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span>{item.emoji}</span>
                        <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                          {item.label}
                        </span>
                      </div>
                      <p className="text-gray-900 font-medium ml-6">
                        {item.value}
                      </p>
                    </div>
                  ))}

                  <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center gap-2 mb-1">
                      <span>📝</span>
                      <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                        Description
                      </span>
                    </div>
                    <p className="text-gray-900 font-medium ml-6 leading-relaxed">
                      {loanApplication?.description || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                  <span className="text-2xl">🏢</span>
                  <h2 className="text-xl font-bold text-gray-900">
                    Employment Details
                  </h2>
                </div>

                {employmentDetails ? (
                  <div className="space-y-4">
                    {[
                      {
                        emoji: "🏛️",
                        label: "Employer",
                        value: employmentDetails.employerName || "N/A",
                      },
                      {
                        emoji: "💼",
                        label: "Designation",
                        value: employmentDetails.designation || "N/A",
                      },
                      {
                        emoji: "⏳",
                        label: "Experience",
                        value: `${
                          employmentDetails.experienceYears ?? "0"
                        } years ${
                          employmentDetails.experienceMonths ?? "0"
                        } months`,
                      },
                      {
                        emoji: "💰",
                        label: "Annual Salary",
                        value: `$${employmentDetails.annualSalary ?? "N/A"}`,
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span>{item.emoji}</span>
                          <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                            {item.label}
                          </span>
                        </div>
                        <p className="text-gray-900 font-medium ml-6">
                          {item.value}
                        </p>
                      </div>
                    ))}

                    <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center gap-2 mb-1">
                        <span>🏢</span>
                        <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                          Office Address
                        </span>
                      </div>
                      <p className="text-gray-900 font-medium ml-6 leading-relaxed">
                        {employmentDetails.address?.addressLine1 || ""},{" "}
                        {employmentDetails.address?.city || ""},{" "}
                        {employmentDetails.address?.state || ""}{" "}
                        {employmentDetails.address?.postalCode || ""}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📄</div>
                    <p className="text-gray-600 font-medium">
                      No employment details available
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Information will appear here when provided
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                📊 Quick Summary
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {user?.score ?? "N/A"}
                  </div>
                  <div className="text-sm text-blue-500 uppercase tracking-wide font-semibold">
                    Credit Score
                  </div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    ${loanApplication?.loanAmount ?? "0"}
                  </div>
                  <div className="text-sm text-green-500 uppercase tracking-wide font-semibold">
                    Loan Amount
                  </div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    ${employmentDetails?.annualSalary ?? "0"}
                  </div>
                  <div className="text-sm text-purple-500 uppercase tracking-wide font-semibold">
                    Annual Salary
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">
                    {loanApplication?.status || "N/A"}
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
                    Status
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
