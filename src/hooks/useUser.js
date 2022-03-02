import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function useUser() {
  const context = useContext(UserContext);

  return context
}