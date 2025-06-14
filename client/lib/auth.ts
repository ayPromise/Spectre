import me from "@/lib/me";

export async function getServerUser(cookieHeader?: string) {
  try {
    const user = await me(cookieHeader);
    return user;
  } catch (error: any) {
    if (error.message === "Not authenticated") {
      return null;
    }
    throw error;
  }
}
