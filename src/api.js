export const getActivities = () =>
  fetch("https://api.moro.mama.sh/listPublicEvents", {
    method: "POST",
  }).then((res) => res.json());

export const postActivities = (obj) => {
  const { token, ...rest } = obj;
  fetch("https://api.moro.mama.sh/modifyEvent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(rest),
    redirect: "follow",
  });
};
