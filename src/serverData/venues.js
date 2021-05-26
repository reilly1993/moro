import { useQuery } from "react-query";
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
