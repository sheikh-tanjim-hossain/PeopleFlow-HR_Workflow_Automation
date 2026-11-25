import { redirect } from "react-router";
import api from "../lib/axios";

export default async function EditProfileAction({ request, params }) {
  try {
    const formData = await request.formData();

    await api.patch(`/employee/${params.employeeid}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return redirect(`/profile/${params.employeeid}`);
  } catch (error) {
    console.error("Profile update failed:", error);

    return {
      error:
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to update employee profile.",
    };
  }
}
