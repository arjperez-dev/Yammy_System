# Yammy System

Proyecto de ejemplo en TypeScript para procesar pagos y aplicar descuentos de forma composable. El flujo principal valida el pago, calcula los descuentos disponibles y devuelve el monto final.

## Qué hace

- Valida datos básicos del pago.
- Aplica descuentos acumulables como VIP, Black Friday, cupón fijo y descuento por monto.
- Devuelve un resultado exitoso o un error tipado.

## Estructura

- `Yammy_System/src/domain`: entidades, tipos de error y contratos.
- `Yammy_System/src/services`: validación, composición de descuentos y procesamiento.
- `Yammy_System/src/main.ts`: ejemplo de uso del sistema.

## Cómo ejecutarlo

```bash
cd Yammy_System
npm install
node ./node_modules/ts-node/dist/bin.js src/main.ts
```

## Tecnologías

TypeScript, Node.js y `ts-node`.
