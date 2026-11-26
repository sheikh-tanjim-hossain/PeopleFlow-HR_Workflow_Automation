import { redirect } from "react-router";
import api from "../../lib/axios";

/**
 * Loader for the HR Add Employee page; fetches available roles/designations.
 */
export default async function AddEmployeeLoader() {
  try {
    const response = await api.get("/hr/role/all");

    return {
      roles: response?.data?.data || [],
    };
  } catch (error) {
    if (error.response?.status === 401) {
      throw redirect("/auth/login");
    }

    console.error("Failed to load roles:", error);

    return {
      roles: [],
      error: error.response?.data?.message || "Failed to load roles.",
    };
  }
}
