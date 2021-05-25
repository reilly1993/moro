import { useMutation, useQuery } from "react-query";
import * as api from "../api";
import { queryClient } from "../App";
import { useAuthentication } from "../AuthenticationProvider";
const empty = [];

export const useActivities = () => {
  const { token } = useAuthentication();
  const { data = empty, ...rest } = useQuery("activities", () =>
    api.fetchActivities(token)
  );

  return { data, ...rest };
};

export const useUpdateActivity = () => {
  const { token } = useAuthentication();
  return useMutation((obj) => api.putActivities(obj, token), {
    onSuccess: (data, variables) => {
      console.log({ data });
      queryClient.setQueryData("activities", (prev) => {
        return prev.map((item) => (item.id === variables.id ? data : item));
      });
      //queryClient.invalidateQueries("activities");
    },
  });
};
