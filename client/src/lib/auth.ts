import { axiosInstance } from "./axios";

export const UseAuthQuery = async (url: string, body?: never) => {
  try {
    const response = await axiosInstance.post(url, body);
    return response.data;
  } catch (error) {
    console.error("Error in account data:", error);
    throw error
  }
};

export const UseFetchUserDetailQuery = async (url: string) => {
    try {
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null
    }
}