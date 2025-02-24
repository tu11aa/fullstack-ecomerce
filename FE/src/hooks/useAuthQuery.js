import { useQuery } from "@tanstack/react-query";
import api from "../config/api";

const useAuthQuery = () => {
  const getUser = async () => {
    const { user } = await api.get("/users/me");

    return user;
  };

  const queryData = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return {
    ...queryData,
    user: queryData.data,
  };
};
