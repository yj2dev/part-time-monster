import axios from "axios";
import { AUTH_USER } from "./types";

export function authUser() {
  const request = axios
    .get("/api/user/auth")
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return false;
    });

  return {
    type: AUTH_USER,
    payload: request,
  };
}
