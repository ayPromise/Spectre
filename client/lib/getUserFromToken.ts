import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

const getUserFromToken = async (token: string | undefined) => {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error: Error) {
    console.error(error.message);
    return null;
  }
};

export default getUserFromToken;
