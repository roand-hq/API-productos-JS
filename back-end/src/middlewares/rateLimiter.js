import rateLimit from "express-rate-limit";
//configurar el rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limitar cada IP a 100 solicitudes por ventana (aquí, por 15 minutos)
  message:
    "Demasiadas solicitudes desde esta IP, por favor intente de nuevo después de 15 minutos",
  standardHeaders: true, // Devuelve la información de límite de tasa en los encabezados `RateLimit-*`
  legacyHeaders: false, // Deshabilita los encabezados `X-RateLimit-*`
});

export default limiter;
