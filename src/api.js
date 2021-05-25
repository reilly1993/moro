export const fetchActivities = (token) =>
  fetch("http://mama.lan:8080/event", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const putActivities = (obj, token) => {
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
