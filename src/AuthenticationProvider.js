import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import jwt from "jsonwebtoken";

const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [state, setState] = useState("initial");
  const [token, setToken] = useState(null);

  const signIn = useCallback(async (username, password) => {
    setState("signing-in");
    try {
      const json = await fetch("https://api.moro.mama.sh/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        redirect: "follow",
      }).then((res) => res.json());
      setToken(json.token);
      setState("authenticated");
    } catch (err) {
      setState("error");
    }
  }, []);

  const signOut = useCallback(() => {
    setState("not-authenticated");
  }, []);

  useEffect(() => {
    if (!token) return;
    setUser(jwt.decode(token)?.user);
  }, [token]);

  useEffect(() => {
    setState("not-authenticated");
  }, []);

  const context = useMemo(() => ({ user, token, state, signIn, signOut }), [
    user,
    token,
    state,
    signIn,
    signOut,
  ]);
  return (
    <AuthenticationContext.Provider value={context}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => useContext(AuthenticationContext);
