import { useMutation, useQuery } from "react-query";
import { queryClient } from "../App";
import { useAuthentication } from "../AuthenticationProvider";
const empty = [];

const fetchVenues = (token) =>
  fetch("https://api.moro.mama.sh/venue", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const useVenues = () => {
  const { token } = useAuthentication();
  const { data = empty, ...rest } = useQuery("venues", () =>
    fetchVenues(token)
  );

  return { data, ...rest };
};

const postVenue = (obj, token) => {
  const { id, ...rest } = obj;
  return fetch(`https://api.moro.mama.sh/venue`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(rest),
    redirect: "follow",
  }).then((res) => res.json());
};

export const useCreateVenue = () => {
  const { token } = useAuthentication();
  return useMutation((obj) => postVenue(obj, token), {
    onSuccess: (data) => {
      queryClient.setQueryData("venues", (prev) => {
        return [...prev, data];
      });
    },
  });
};
