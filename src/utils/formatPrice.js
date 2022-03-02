export const formatPrice = (value, type = "short") =>
  new Intl.NumberFormat(
    'pt-BR',
    type === "long" && {
      style: 'currency',
      currency: 'BRL',
    }
  ).format(value)