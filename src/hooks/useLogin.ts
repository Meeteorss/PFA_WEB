import { useState } from "react";
import axios from "../utils/axios";
type LoginCreds = {
  login: string;
  password: string;
};

export const useLogin = () => {
  // const [user, setUser] = useState(null);
  // const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const login = async (creds: LoginCreds) => {
    setLoading(true);
    let user: any;
    let errors: any[];
    try {
      const res = await axios.post("/auth/login", {
        // withCredentials: true,
        body: { login: creds.login, password: creds.password },
      });
      setLoading(false);
      const data = res.data;
      if (data.errors.length) {
        errors = data.errors;
      } else {
        user = data.user;
      }
    } catch (err) {
      setLoading(false);
      console.log("Error: ");
      console.log(err);
    }

    return { user: user, errors: errors };
  };

  return { login: login, loading: loading };
};
