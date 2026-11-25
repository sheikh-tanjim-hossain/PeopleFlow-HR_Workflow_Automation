import api from "./../../lib/axios";
export default async function EditProfileLoader({ params }) {
  try {
    const { employeeid } = params;
    let allRoles = [];

    const user = await api.get("auth/varify");
    if (user?.data?.role === "hr") {
      const getAllRoles = await api.get("/hr/role/all");
      allRoles = getAllRoles?.data?.data;
    }

    const profile = await api.get(`/employee/${employeeid}`);

    return { roles: allRoles, data: profile.data.data };
  } catch (error) {
    console.log(error);
  }
}
