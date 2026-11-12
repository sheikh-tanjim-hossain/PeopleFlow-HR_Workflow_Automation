import { redirect } from "react-router";
import api from "../lib/axios";

export default async function GetLoggedInUserLoader() {
  try {
    // Verify authentication
    const response = await api.get("/auth/varify");

    console.log(response.data);
    return {
      user: response.data,
    };
  } catch (error) {
    if (error.response?.status === 401) {
      throw redirect("/auth/login");
    }

    console.error("Authentication verification failed:", error);

    throw error;
  }
}
