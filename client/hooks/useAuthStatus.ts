import me from "@/lib/me";
import AuthStatus from "@/types/client/AuthStatus";
import { useQuery } from "@tanstack/react-query";

interface useAuthStatusProps {
  enabled: boolean;
  cookieHeader?: string;
}

export function useAuthStatus({ enabled, cookieHeader }: useAuthStatusProps) {
  return useQuery<AuthStatus | null, Error>({
    queryKey: ["auth-status", cookieHeader],
    queryFn: () => me(cookieHeader),
    retry: false,
    staleTime: 5 * 60 * 1000,
    enabled,
  });
}
