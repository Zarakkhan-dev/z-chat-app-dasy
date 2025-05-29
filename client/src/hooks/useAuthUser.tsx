import { useQuery } from "@tanstack/react-query";
import { FETCHME_URL } from "../lib/config";
import { UseFetchUserDetailQuery } from "../lib/auth";

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: () => UseFetchUserDetailQuery(FETCHME_URL),
    retry: false,
  });
  return {
    isLoading: authUser.isLoading,
    authUser: authUser.data?.user,
    isOnboarded: authUser.data?.user?.isOnboarded,
  };
};

export default useAuthUser;
