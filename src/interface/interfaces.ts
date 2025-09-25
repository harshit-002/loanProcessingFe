export interface LoanInfo {
  id: number;
  loanAmount: number;
  loanPurpose: string;
  applicationDate: string;
  description: string;
  status: string;
  declineReason: string;
}

export interface declineReason {
  description: string;
  messsage: string;
  title: string;
}

export interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface EmploymentDetails {
  id: number;
  employerName: string;
  experienceYears: number;
  experienceMonths: number;
  annualSalary: number;
  designation: string;
  address: Address;
}

export interface ContactInfo {
  homePhone: string;
  officePhone: string;
  mobile: string;
  email: string;
}
export interface User {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  maritalStatus: string;
  ssnNumber: string;
  score: number | -1;
  address: Address;
  contactInfo: ContactInfo;
  applications: any | null;
  employmentDetails: any | null;
}

export interface ApplicationSummary {
  id: number;
  name: string;
  loanPurpose: string;
  loanAmount: number;
  loanApplicationDate: string;
  status: string;
}

export interface ApplicationDetails {
  user: User;
  employmentDetails: EmploymentDetails;
  loanInfo: LoanInfo;
}

export interface Account {
  id: number;
  username: string;
  ssnNumber: string;
}

export interface AuthContextType {
  account: Account | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (
    username: string,
    password: string,
    ssnNumber: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

export interface apiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}
