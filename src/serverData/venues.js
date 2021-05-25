import { useQuery } from "react-query";
import { useAuthentication } from "../AuthenticationProvider";
const empty = [];

const fetchVenues = (token) =>
  fetch("http://mama.lan:8080/venue", {
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
