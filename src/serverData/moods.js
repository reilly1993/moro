import { useQuery } from "react-query";
import { useAuthentication } from "../AuthenticationProvider";
const empty = [];

const fetchMoods = (token) =>
  fetch("http://mama.lan:8080/mood", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const useMoods = () => {
  const { token } = useAuthentication();
  const { data = empty, ...rest } = useQuery("moods", () => fetchMoods(token));

  return { data, ...rest };
};
