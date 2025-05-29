import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseAuthQuery } from '../lib/auth';
import { LOGOUT_URL } from '../lib/config';

const useLogout = () => {
      const queryClient = useQueryClient();
   const { mutate: LogoutMutation } = useMutation({
    mutationFn: () => UseAuthQuery(LOGOUT_URL),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });
  return {LogoutMutation}
}

export default useLogout
