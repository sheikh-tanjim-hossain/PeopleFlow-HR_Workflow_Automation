import api from "../../lib/axios";
export default async function ProfileLoader({ params }) {
  let { employeeid } = params;

  try {
    const response = await api.get(`/employee/${employeeid}`);
    return { data: response.data.data };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
