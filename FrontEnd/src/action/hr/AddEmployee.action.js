import { redirect } from "react-router";
import api from "../../lib/axios";

/**
 * React Router action for creating a new employee account via POST /auth/createaccount.
 */
export default async function AddEmployeeAction({ request }) {
  try {
    const formData = await request.formData();

    const response = await api.post("/auth/createaccount", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const createdEmployeeId =
      response.data?.data?._id || response.data?.user?._id || response.data?._id;

    if (createdEmployeeId) {
      return redirect(`/profile/${createdEmployeeId}`);
    }

    return redirect("/hr/dashboard");
  } catch (error) {
    console.error("Employee creation failed:", error);

    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to create employee account.",
    };
  }
}
