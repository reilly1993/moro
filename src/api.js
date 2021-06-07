import { useAuthentication } from "./AuthenticationProvider";

export const useHandler = (request) => {
  const { signOut } = useAuthentication();
  return request.then(
    (res) => {
      return res;
    },
    (rejectReason) => {
      if (rejectReason.status === 401) {
        signOut();
      }
    }
  );
};
