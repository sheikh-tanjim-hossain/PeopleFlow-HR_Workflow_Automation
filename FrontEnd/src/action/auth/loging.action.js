import { redirect } from "react-router";
import api from "../../lib/axios";

export default async function loginAction({ request }) {
  // Read submitted form data
  const { email, password } = await request.json();

  try {
    // API Call
    // eslint-disable-next-line no-unused-vars
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    return redirect("/");
  } catch (error) {
    if (error.response) {
      // Return the complete backend payload
      console.log("Backend payload:", error.response.data);

      return error.response.data;
    }

    return {
      success: false,
      message: "Unable to connect to the server.",
    };
  }
}
