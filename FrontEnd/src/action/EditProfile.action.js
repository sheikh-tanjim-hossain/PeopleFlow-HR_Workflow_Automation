import { redirect } from "react-router";
import api from "../lib/axios";

export default async function EditProfileAction({ request, params }) {
  try {
    const data = await request.json();

    if (!data.password) {
      delete data.password;
    }
    console.log(data);

    // Send update request to Express backend
    await api.patch(`/employee/${params.employeeid}`, data);

    // Redirect after successful update
    return redirect(`/profile/${params.employeeid}`);
  } catch (error) {
    console.error("Profile update failed:", error);

    return {
      error:
        error.response?.data?.message || "Failed to update employee profile.",
    };
  }
}
