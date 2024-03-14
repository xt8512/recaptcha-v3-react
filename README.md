# React + TypeScript + Vite

Esto ya compila, no se si sera de forma permanente

- V2 recaptcha
- V3 recaptcha

## Inicia el proyecto

```bash
npm install
```

```bash
npm run dev
```
## Rutas

```js
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginV3 />,
  },
  {
    path: "/v2",
    element: <LoginV2 />
  }
]);
```