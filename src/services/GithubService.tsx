import axios from "axios";
import { Repository } from "../interfaces/Repository";
import { GithubUser } from "../interfaces/GithubUser";

const GITHUB_API_URL =
  import.meta.env.VITE_GITHUB_API_URL || "https://api.github.com";

const GITHUB_API_TOKEN =
  import.meta.env.VITE_GITHUB_API_TOKEN;

const apiClient = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    Authorization: `Bearer ${GITHUB_API_TOKEN}`,
    Accept: "application/vnd.github.v3+json"
  }
});

export const fetchRepositories = async (): Promise<Repository[]> => {
  try {
    const response = await apiClient.get("/user/repos", {
      params: {
        sort: "created",
        direction: "desc",
        per_page: 100,
        affiliation: "owner",
        t: Date.now()
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchUserInfo = async (): Promise<GithubUser> => {
  try {
    const response = await apiClient.get("/user");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// ✅ NUEVO: crear repositorio
export const createRepository = async (
  name: string,
  description: string,
  isPrivate: boolean
): Promise<Repository> => {
  try {
    const response = await apiClient.post("/user/repos", {
      name,
      description,
      private: isPrivate,
      auto_init: true
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};