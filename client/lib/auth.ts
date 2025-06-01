import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const getServerUser = async () =>{
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string; id: string };
    return decoded;
  } catch {
    return null;
  }
}

export default getServerUser
