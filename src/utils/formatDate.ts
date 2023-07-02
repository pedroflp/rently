import { DateTime, DateTimeFormatOptions } from "luxon"

export const formatDate = (date: Date, type: DateTimeFormatOptions) => {
  const formatedDate = DateTime.fromISO(date.toISOString()).setLocale('pt-BR').toLocaleString(type)

  return formatedDate
}