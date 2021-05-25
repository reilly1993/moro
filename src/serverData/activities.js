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
  return useMutation((obj) => api.postActivities(obj, token), {
    onSuccess: (_, variables) => {
      queryClient.setQueryData("activities", (prev) => {
        console.log(prev);
        return prev.map((item) =>
          item.id === variables.id ? variables : item
        );
      });
      //queryClient.invalidateQueries("activities");
    },
  });
};
