import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import AuthStatus from "@/types/client/AuthStatus";

const getServerUser = async () =>{
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthStatus;
    return decoded;
  } catch {
    return null;
  }
}

export default getServerUser
