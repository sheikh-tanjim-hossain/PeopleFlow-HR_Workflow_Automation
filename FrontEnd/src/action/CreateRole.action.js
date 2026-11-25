import { redirect } from "react-router";
import api from "../../lib/axios";

/**
 * React Router action for creating a new role via POST /hr/role/create.
 */
export default async function CreateRoleAction({ request }) {
  try {
    const payload = await request.json();

    const response = await api.post("/hr/role/create", {
      title: payload.title?.trim(),
      responsibility: payload.responsibility?.trim() || "",
      description: payload.description?.trim() || "",
    });

    return {
      success: true,
      message: response.data?.message || "Role created successfully.",
      role: response.data?.data || null,
    };
  } catch (error) {
    if (error.response?.status === 401) {
      throw redirect("/auth/login");
    }

    console.error("Role creation failed:", error);

    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to create role.",
    };
  }
}
