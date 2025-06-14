import server_endpoints from "@/app/api/server_endpoints";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const uploadLecture = async (formData: FormData) => {
  const response = await fetch(`${SERVER_URL}${server_endpoints.upload}`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Не вдалося отримати матеріали");
  }

  return response.json();
};

export default uploadLecture;
