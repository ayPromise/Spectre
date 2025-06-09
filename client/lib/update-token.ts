import client_endpoints from "@/app/api/client_endpoints";

const updateToken = async (token: string) => {
  await fetch(client_endpoints.updateToken, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
};

export default updateToken;
