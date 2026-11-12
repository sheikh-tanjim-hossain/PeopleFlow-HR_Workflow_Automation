import api from "./../../lib/axios";
export default async function EditProfileLoader({ params }) {
  const { employeeid } = params;
  const allRoles = await api.get("/hr/role/all");
  const profile = await api.get(`/employee/${employeeid}`);
  return { roles: allRoles.data.data, data: profile.data.data };
}
