import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "../utils/axios";

export const useGetMyCoordinates = () => {
  const { isAuth, user, loading: loadingCtx } = useAuthContext();
  const [coordinates, setcoordinates] = useState<any>();
  const [loading, setLoading] = useState(false);

  const getCoordinates = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`/coordinates/user/${user.id}`, {
        withCredentials: true,
      });
      setLoading(false);
      //   console.log("res ,", res);
      const { data } = res;
      const coordinates = data.data;
      setcoordinates(coordinates);
    } catch (err) {
      setLoading(false);
      console.log(err);
      return { coordinates: [], error: err };
    }
  };

  useEffect(() => {
    setLoading(true);

    if (!loadingCtx && user) {
      axios
        .get(`/coordinates/user/${user.id}`, {
          withCredentials: true,
        })
        .then((response) => {
          setLoading(false);
          const { data } = response;
          const coordinates = data.data;

          setcoordinates(coordinates);
        })
        .catch((err) => {
          console.log("Error:");
          console.log(err);
          setLoading(false);
        });
    }
  }, [loadingCtx, user]);

  const refetch = () => {
    axios
      .get(`/coordinates/user/${user.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setLoading(false);
        const { data } = response;
        const coordinates = data.data;

        setcoordinates(coordinates);
      })
      .catch((err) => {
        console.log("Error:");
        console.log(err);
        setLoading(false);
      });
  };

  return {
    getCoordinates: getCoordinates,
    coordinates: coordinates,
    setcoordinates: setcoordinates,
    loading: loading,
    refetch: refetch,
  };
};
