import { useQuery } from "react-query";
import { useAuthentication } from "../AuthenticationProvider";
import { SERVER_URL } from "../constants";

const fetchCategories = (token) =>
  fetch(`${SERVER_URL}/category`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

const empty = [];

export const useCategories = () => {
  const { token } = useAuthentication();
  const { data = empty, ...rest } = useQuery("categories", () =>
    fetchCategories(token)
  );

  return { data, ...rest };
};
