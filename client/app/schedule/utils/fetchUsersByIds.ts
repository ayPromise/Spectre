const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function fetchUsersByIds(userIds: string[]): Promise<string[]> {
    const response = await fetch(`${SERVER_URL}/auth/get-users-by-ids`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: userIds }),
      credentials:"include"
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }
  
    return response.json();
  }
  