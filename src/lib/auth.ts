// middleware/authMiddleware.ts

import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import axios from 'axios';

const secret = process.env.JWT_SECRET || 'your-secret-key';

export function authMiddleware(handler: any) {
  return async (context: any) => {
    const { req, res } = context;

    // Obtener la cookie de token
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;

    // Si no hay token, redirigir a la página de login
    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    try {
      // Verificar el token
      const decoded: any = jwt.verify(token, secret);

      // Comprobar si el token es activo en la sesión
      const userId = req.session.userId;
      if (!userId || userId !== decoded.user.id) {
        throw new Error('Token no válido o sesión expirada');
      }

      // Obtener el usuario desde la API (opcional)
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${decoded.user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('Usuario no encontrado');
      }

      // Pasar el usuario al contexto de la solicitud
      context.req.user = decoded.user;

      // Ejecutar el manejador de la página protegida
      return handler(context);
    } catch (error: any) {
      console.error('Error de autenticación:', error.message);

      // Redirigir a la página de login en caso de error
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  };
}
