import { useContext } from "react";
import { AnnouncementContext } from "../contexts/AnnoucementContext";

export default function useAnnouncemen() {
  const context = useContext(AnnouncementContext);

  return context
}