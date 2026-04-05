# Cliente Web

Frontend en React + Vite para la gestión de clientes.

## Requisitos

- Node.js 20 o superior
- Backend disponible en `http://localhost:8081`

## Configuración

1. Crea el archivo `.env` a partir de `.env.example`.
2. Verifica estas variables:

```env
VITE_API_URL=/api/clientes
VITE_API_PROXY_TARGET=http://localhost:8081
```

`VITE_API_URL` usa `/api/clientes` para aprovechar el proxy de Vite en desarrollo y evitar problemas de CORS.

## Ejecutar

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera el build de producción.
- `npm run lint`: ejecuta ESLint.
