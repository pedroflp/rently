import React from 'react'
import { createContext, useState } from "react";

export const AnnouncementContext = createContext({
  announcement: null,
  announcementToEdit: null,
  setAnnouncement: () => { },
  setAnnouncementToEdit: () => { },
});

export default function AnnouncementContextProvider({ children }) {
  const [announcement, setAnnouncement] = useState(null)
  const [announcementToEdit, setAnnouncementToEdit] = useState(null)

  return (
    <AnnouncementContext.Provider value={{
      announcement,
      setAnnouncement,
      announcementToEdit,
      setAnnouncementToEdit
    }}>
      {children}
    </AnnouncementContext.Provider>
  )
}