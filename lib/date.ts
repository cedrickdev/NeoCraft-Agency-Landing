import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const formatFullDate = (date: Date) => {
  return format(date, "dd MMM yyyy", { locale: fr });
};
