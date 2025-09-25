import axios, { type AxiosResponse } from "axios";
import type {
  ApplicationSummary,
  ApplicationDetails,
  apiResponse,
} from "../interface/interfaces";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
axios.defaults.withCredentials = true;

export async function getAllApplications(): Promise<
  AxiosResponse<apiResponse<Array<ApplicationSummary>>>
> {
  return axios.get(`${BASE_API_URL}/application`, {
    withCredentials: true,
  });
}

export async function getApplicationById(
  id: string
): Promise<AxiosResponse<apiResponse<ApplicationDetails>>> {
  return axios.get(`${BASE_API_URL}/application/${id}`, {
    withCredentials: true,
  });
}

export async function submitApplication(
  application: ApplicationDetails
): Promise<AxiosResponse<apiResponse<ApplicationDetails>>> {
  return axios.post(`${BASE_API_URL}/application`, application, {
    withCredentials: true,
  });
}
