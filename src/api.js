export const fetchActivities = (token) =>
  fetch("https://api.moro.mama.sh/listEvents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const postActivities = (obj, token) => {
  fetch("https://api.moro.mama.sh/modifyEvent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(obj),
    redirect: "follow",
  });
};
