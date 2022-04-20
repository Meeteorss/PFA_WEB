import { useEffect, useState } from "react";
import axios from "../utils/axios";

export const useGetUser = () => {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(false);
  const getUser = async () => {
    try {
      const res = await axios.get("/auth", { withCredentials: true });
      return { user: res.data.user };
    } catch (err) {
      console.log(err);
      return { user: null };
    }
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get("/auth", { withCredentials: true })
      .then((response) => {
        const data = response.data;

        setUser(data.user);

        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:");
        console.log(err);
        setLoading(false);
      });
  }, []);

  return { getUser: getUser, user: user, loading: loading };
};
