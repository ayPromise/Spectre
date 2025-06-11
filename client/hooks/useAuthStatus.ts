import client_endpoints from "@/app/api/client_endpoints";
import { useQuery } from "@tanstack/react-query";

interface useAuthStatusProps {
  enabled: boolean;
}

export function useAuthStatus({ enabled }: useAuthStatusProps) {
  return useQuery({
    queryKey: ["auth-status"],
    queryFn: async () => {
      const res = await fetch(client_endpoints.isAuth, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Not authenticated");
      return res.json();
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    enabled,
  });
}
