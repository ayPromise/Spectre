import me from "@/lib/me";

export async function getServerUser() {
  try {
    const user = await me();
    return user;
  } catch (error: any) {
    if (error.message === "Not authenticated") {
      return null;
    }
    throw error;
  }
}
