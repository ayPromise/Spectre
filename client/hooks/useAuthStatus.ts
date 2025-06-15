import me from "@/lib/me";
import AuthStatus from "@/types/client/AuthStatus";
import { useQuery } from "@tanstack/react-query";

interface useAuthStatusProps {
  enabled: boolean;
}

export function useAuthStatus({ enabled }: useAuthStatusProps) {
  return useQuery<AuthStatus | null, Error>({
    queryKey: ["auth-status"],
    queryFn: () => me(),
    retry: false,
    staleTime: 5 * 60 * 1000,
    enabled,
  });
}
