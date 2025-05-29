import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { UseAuthQuery } from "../lib/auth";

const useLogin = () => {
    const navigate = useNavigate();

     const queryClient = useQueryClient();
  const { mutate: Login, isPending, isError } = useMutation({
    mutationFn: ({ url, body }: { url: string; body: any }) =>
      UseAuthQuery(url, body),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Login successfully");
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
        navigate("/");
      } else {
        toast.error("Something went wrong");
      }
    },
    onError: (error: any) => {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });
  return {Login, isPending, isError}
};

export default useLogin;
