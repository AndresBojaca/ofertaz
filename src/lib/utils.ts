import { type ClassValue, clsx } from "clsx"
import { differenceInMonths, differenceInWeeks, differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function tiempoTranscurrido(fechaPublicacion:any) {
  const ahora = new Date();
  const diferenciaMeses = differenceInMonths(ahora, fechaPublicacion);
  const diferenciaSemanas = differenceInWeeks(ahora, fechaPublicacion);
  const diferenciaDias = differenceInDays(ahora, fechaPublicacion);
  const diferenciaHoras = differenceInHours(ahora, fechaPublicacion);
  const diferenciaMinutos = differenceInMinutes(ahora, fechaPublicacion);

  if (diferenciaMeses > 0) {
    return `Hace ${diferenciaMeses} mes${diferenciaMeses > 1 ? 'es' : ''}`;
  } else if (diferenciaSemanas > 0) {
    return `Hace ${diferenciaSemanas} semana${diferenciaSemanas > 1 ? 's' : ''}`;
  } else if (diferenciaDias > 0) {
    return `Hace ${diferenciaDias} día${diferenciaDias > 1 ? 's' : ''}`;
  } else if (diferenciaHoras > 0) {
    return `Hace ${diferenciaHoras} hora${diferenciaHoras > 1 ? 's' : ''}`;
  } else {
    return `Hace ${diferenciaMinutos} minuto${diferenciaMinutos > 1 ? 's' : ''}`;
  }
}
