import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useGetUser } from "../hooks/useGetUser";
import { useLogin } from "../hooks/useLogin";
import { useLogout } from "../hooks/useLogout";

export const AuthContext = createContext(null);

export const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { login, loading: loadingL } = useLogin();
  const { logout, loading: loadingF } = useLogout();
  const { getUser, loading: loadingG } = useGetUser();
  useEffect(() => {
    console.log("HERE : ", process.env.REACT_APP_API_URL);

    getUser().then((res) => {
      setLoading(false);
      if (res.user && !loadingG) {
        setUser(res.user);
      }
    });
  }, []);

  const loginF = async ({ l, p }) => {
    const res = await login({
      login: l,
      password: p,
    });
    if (res.user) {
      setUser(res.user);
    }
    return res;
  };
  const logoutF = async () => {
    const res = await logout();

    if (res.value) {
      setUser(null);
    }
  };

  const value = useMemo(() => {
    return { isAuth: !!user, user, loginF, logoutF, loading };
  }, [user, login, logout, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
