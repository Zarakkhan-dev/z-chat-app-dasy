import { isOnboard, user, login } from "../type/user";
import { axiosInstance } from "./axios";

export const UseCreateQuery = async (url: string, body?: never | user | isOnboard | login) => {
    try {
        const response = await axiosInstance.post(url, body);
        return response.data;
    } catch (error) {
        console.error("Error creating data:", error);
        throw error;
    }
}

export const UseFetchAllQuery = async (url: string) => {
    try {
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; 
    }
}

export const UseFetchQuery = async (url: string, body?: never | user | isOnboard | login) => {
    try {
        const response = await axiosInstance.get(url, body ? { data: body } : undefined);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; 
    }
}

export const UseDeleteQuery = async (url: string, body?: never | user | isOnboard | login) => {
    try {
        const response = await axiosInstance.delete(url, body ? { data: body } : undefined);
        return response.data;
    } catch (error) {
        console.error("Error deleting data:", error);
        throw error; 
    }
}

export const UseUpdateQuery = async (url: string, body?: never | user | isOnboard | login) => {
    try {
        const response = await axiosInstance.put(url, body);
        return response.data;
    } catch (error) {
        console.error("Error updating data:", error);
        throw error; 
    }
}

export const postQueryWithUrl = async (url: string, body?: never | user | isOnboard | login) => {
    try {
        const response = await axiosInstance.post(url, body);
        return response.data;
    } catch (error) {
        console.error("Error posting data with ID:", error);
        throw error; 
    }
}