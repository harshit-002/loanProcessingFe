import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import type {
  LoanInfo,
  EmploymentDetails,
  User,
} from "../interface/interfaces";
import { submitApplication } from "../api/applicationApi";

interface ApplicationDetails {
  user: User;
  employmentDetails: EmploymentDetails;
  loanInfo: LoanInfo;
}

type Action =
  | {
      type: "UPDATE_FIELD";
      path: string;
      value: any;
    }
  | {
      type: "RESET_FORM";
    };

const setNestedProperty = (obj: any, path: string, value: any) => {
  const keys = path.split(".");
  const lastKey = keys.pop()!;
  const target = keys.reduce((current, key) => {
    if (!current[key]) current[key] = {};
    return current[key];
  }, obj);
  target[lastKey] = value;
};

const getInitialState = (): ApplicationDetails => ({
  user: {
    id: 0,
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    maritalStatus: "",
    ssnNumber: "",
    score: -1,
    address: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
    },
    contactInfo: {
      homePhone: "",
      officePhone: "",
      mobile: "",
      email: "",
    },
    applications: null,
    employmentDetails: null,
  },
  loanInfo: {
    id: 0,
    loanAmount: 0,
    loanPurpose: "",
    applicationDate: "",
    description: "",
    status: "PENDING",
    declineReason: "",
  },
  employmentDetails: {
    id: 0,
    employerName: "",
    experienceYears: 0,
    experienceMonths: 0,
    annualSalary: 0,
    designation: "",
    address: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
    },
  },
});

const applicationReducer = (
  state: ApplicationDetails | null,
  action: Action
): ApplicationDetails => {
  switch (action.type) {
    case "UPDATE_FIELD": {
      const currentState = state || getInitialState();
      const clonedState = JSON.parse(JSON.stringify(currentState));
      setNestedProperty(clonedState, action.path, action.value);
      return clonedState;
    }
    case "RESET_FORM": {
      return getInitialState();
    }
    default:
      return state || getInitialState();
  }
};
export const SubmitApplication = () => {
  const [applicationDetails, dispatch] = useReducer(
    applicationReducer,
    null,
    () => getInitialState()
  );
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("submitting", applicationDetails);
      await submitApplication(applicationDetails);
      setShowSuccessModal(true);
    } catch (err) {
      console.log("Error submiting application" + err);
      alert("Error submitting application. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    dispatch({ type: "RESET_FORM" });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    path: string
  ) => {
    const value =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;
    dispatch({ type: "UPDATE_FIELD", path, value });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              📋 Loan Application Form
            </h1>
            <p className="text-gray-600 text-lg">
              Complete your loan application with accurate information
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">
                  Submitting your application details...
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white border border-gray-200 rounded-lg">
                <div className="border-b border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    👤 Personal Details
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="user.firstName"
                        value={applicationDetails.user.firstName}
                        onChange={(e) => handleChange(e, "user.firstName")}
                        placeholder="Enter your first name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Middle Name
                      </label>
                      <input
                        type="text"
                        name="user.middleName"
                        value={applicationDetails.user.middleName}
                        onChange={(e) => handleChange(e, "user.middleName")}
                        placeholder="Enter your middle name (optional)"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="user.lastName"
                        value={applicationDetails.user.lastName}
                        onChange={(e) => handleChange(e, "user.lastName")}
                        placeholder="Enter your last name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        📅 Date of Birth
                      </label>
                      <input
                        type="date"
                        name="user.dateOfBirth"
                        value={applicationDetails.user.dateOfBirth}
                        onChange={(e) => handleChange(e, "user.dateOfBirth")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        💑 Marital Status
                      </label>
                      <select
                        name="user.maritalStatus"
                        value={applicationDetails.user.maritalStatus}
                        onChange={(e) => handleChange(e, "user.maritalStatus")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900"
                      >
                        <option value="">Select marital status</option>
                        <option value="SINGLE">Single</option>
                        <option value="MARRIED">Married</option>
                        <option value="DIVORCED">Divorced</option>
                        <option value="WIDOWED">Widowed</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        🆔 SSN Number
                      </label>
                      <input
                        type="text"
                        name="user.ssnNumber"
                        value={applicationDetails.user.ssnNumber}
                        onChange={(e) => handleChange(e, "user.ssnNumber")}
                        placeholder="XXX-XX-XXXX"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-8 mb-8">
                    <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                      📞 Contact Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          📧 Email Address
                        </label>
                        <input
                          type="email"
                          name="user.contactInfo.email"
                          value={applicationDetails.user.contactInfo.email}
                          onChange={(e) =>
                            handleChange(e, "user.contactInfo.email")
                          }
                          placeholder="Enter your email address"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          📱 Mobile Number
                        </label>
                        <input
                          type="tel"
                          name="user.contactInfo.mobile"
                          value={applicationDetails.user.contactInfo.mobile}
                          onChange={(e) =>
                            handleChange(e, "user.contactInfo.mobile")
                          }
                          placeholder="Enter your mobile number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-8">
                    <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                      🏠 Home Address
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Address Line 1
                        </label>
                        <input
                          type="text"
                          name="user.address.addressLine1"
                          value={applicationDetails.user.address.addressLine1}
                          onChange={(e) =>
                            handleChange(e, "user.address.addressLine1")
                          }
                          placeholder="Street address"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Address Line 2
                        </label>
                        <input
                          type="text"
                          name="user.address.addressLine2"
                          value={applicationDetails.user.address.addressLine2}
                          onChange={(e) =>
                            handleChange(e, "user.address.addressLine2")
                          }
                          placeholder="Apartment, suite, etc. (optional)"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          🏙️ City
                        </label>
                        <input
                          type="text"
                          name="user.address.city"
                          value={applicationDetails.user.address.city}
                          onChange={(e) => handleChange(e, "user.address.city")}
                          placeholder="City"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          🗺️ State
                        </label>
                        <input
                          type="text"
                          name="user.address.state"
                          value={applicationDetails.user.address.state}
                          onChange={(e) =>
                            handleChange(e, "user.address.state")
                          }
                          placeholder="State"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          📮 Postal Code
                        </label>
                        <input
                          type="text"
                          name="user.address.postalCode"
                          value={applicationDetails.user.address.postalCode}
                          onChange={(e) =>
                            handleChange(e, "user.address.postalCode")
                          }
                          placeholder="Postal code"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg">
                <div className="border-b border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    💰 Loan Application
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        💵 Loan Amount
                      </label>
                      <input
                        type="number"
                        name="loanInfo.loanAmount"
                        value={applicationDetails.loanInfo.loanAmount}
                        onChange={(e) => handleChange(e, "loanInfo.loanAmount")}
                        placeholder="Enter loan amount"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        🎯 Loan Purpose
                      </label>
                      <input
                        type="text"
                        name="loanInfo.loanPurpose"
                        value={applicationDetails.loanInfo.loanPurpose}
                        onChange={(e) =>
                          handleChange(e, "loanInfo.loanPurpose")
                        }
                        placeholder="Purpose of loan"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        📝 Description
                      </label>
                      <textarea
                        name="loanInfo.description"
                        value={applicationDetails.loanInfo.description}
                        onChange={(e) =>
                          handleChange(e, "loanInfo.description")
                        }
                        placeholder="Provide additional details about your loan request"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg">
                <div className="border-b border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    🏢 Employment Details
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        🏛️ Employer Name
                      </label>
                      <input
                        type="text"
                        name="employmentDetails.employerName"
                        value={
                          applicationDetails.employmentDetails.employerName
                        }
                        onChange={(e) =>
                          handleChange(e, "employmentDetails.employerName")
                        }
                        placeholder="Company name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        💰 Annual Salary
                      </label>
                      <input
                        type="number"
                        name="employmentDetails.annualSalary"
                        value={
                          applicationDetails.employmentDetails.annualSalary
                        }
                        onChange={(e) =>
                          handleChange(e, "employmentDetails.annualSalary")
                        }
                        placeholder="Annual salary"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        💼 Job Title
                      </label>
                      <input
                        type="text"
                        name="employmentDetails.designation"
                        value={applicationDetails.employmentDetails.designation}
                        onChange={(e) =>
                          handleChange(e, "employmentDetails.designation")
                        }
                        placeholder="Job title"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        ⏳ Experience
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="number"
                          name="employmentDetails.experienceYears"
                          value={
                            applicationDetails.employmentDetails.experienceYears
                          }
                          onChange={(e) =>
                            handleChange(e, "employmentDetails.experienceYears")
                          }
                          placeholder="Years"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                        />
                        <input
                          type="number"
                          name="employmentDetails.experienceMonths"
                          value={
                            applicationDetails.employmentDetails
                              .experienceMonths
                          }
                          onChange={(e) =>
                            handleChange(
                              e,
                              "employmentDetails.experienceMonths"
                            )
                          }
                          placeholder="Months"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-8">
                    <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                      🏢 Office Address
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Address Line 1
                        </label>
                        <input
                          type="text"
                          name="employmentDetails.address.addressLine1"
                          value={
                            applicationDetails.employmentDetails.address
                              .addressLine1
                          }
                          onChange={(e) =>
                            handleChange(
                              e,
                              "employmentDetails.address.addressLine1"
                            )
                          }
                          placeholder="Street address"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Address Line 2
                        </label>
                        <input
                          type="text"
                          name="employmentDetails.address.addressLine2"
                          value={
                            applicationDetails.employmentDetails.address
                              .addressLine2
                          }
                          onChange={(e) =>
                            handleChange(
                              e,
                              "employmentDetails.address.addressLine2"
                            )
                          }
                          placeholder="Apartment, suite, etc. (optional)"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          🏙️ City
                        </label>
                        <input
                          type="text"
                          name="employmentDetails.address.city"
                          value={
                            applicationDetails.employmentDetails.address.city
                          }
                          onChange={(e) =>
                            handleChange(e, "employmentDetails.address.city")
                          }
                          placeholder="City"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          🗺️ State
                        </label>
                        <input
                          type="text"
                          name="employmentDetails.address.state"
                          value={
                            applicationDetails.employmentDetails.address.state
                          }
                          onChange={(e) =>
                            handleChange(e, "employmentDetails.address.state")
                          }
                          placeholder="State"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          📮 Postal Code
                        </label>
                        <input
                          type="text"
                          name="employmentDetails.address.postalCode"
                          value={
                            applicationDetails.employmentDetails.address
                              .postalCode
                          }
                          onChange={(e) =>
                            handleChange(
                              e,
                              "employmentDetails.address.postalCode"
                            )
                          }
                          placeholder="Postal code"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    type="submit"
                    className="px-8 py-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    ✅ Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-8 py-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    🔄 Reset Form
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/home")}
                    className="px-8 py-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    🏠 Back to Home
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Application Submitted!
              </h2>
              <p className="text-gray-600 mb-6">
                Your application will be reviewed within 24-48 hours.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold text-gray-500 mb-1">
                  Reference Number
                </p>
                <p className="text-lg font-bold text-gray-900">
                  SW-{Date.now().toString().slice(-8)}
                </p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate("/view-applications");
                  }}
                  className="w-full px-6 py-3 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg"
                >
                  📄 View All Applications
                </button>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
