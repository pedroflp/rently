import { DateTime } from "luxon"

export const formatDate = (date, type) => {
  const formatedDate = DateTime.fromISO(date).setLocale('pt-BR').toLocaleString(type)

  return formatedDate
}