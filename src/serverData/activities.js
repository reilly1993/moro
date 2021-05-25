import { useMutation, useQuery } from "react-query";
import { queryClient } from "../App";
import { useAuthentication } from "../AuthenticationProvider";
const empty = [];

const fetchActivities = (token) =>
  fetch("http://mama.lan:8080/event", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

const putActivities = (obj, token) => {
  const { id, ...rest } = obj;
  return fetch(`http://mama.lan:8080/event/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(rest),
    redirect: "follow",
  }).then((res) => res.json());
};

export const useActivities = () => {
  const { token } = useAuthentication();
  const { data = empty, ...rest } = useQuery("activities", () =>
    fetchActivities(token)
  );

  return { data, ...rest };
};

export const useUpdateActivity = () => {
  const { token } = useAuthentication();
  return useMutation((obj) => putActivities(obj, token), {
    onSuccess: (data, variables) => {
      console.log({ data });
      queryClient.setQueryData("activities", (prev) => {
        return prev.map((item) => (item.id === variables.id ? data : item));
      });
      //queryClient.invalidateQueries("activities");
    },
  });
};
