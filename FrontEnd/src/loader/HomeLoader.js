import api from "../lib/axios";

export default async function HomeLoader() {
  try {
    const myProfile = await api.get("employee");
    const allEmployee = await api.get("employee/all");

    return { user: myProfile.data.data, allEmployee: allEmployee.data.data };
  } catch (error) {
    console.log(error);
  }
}
