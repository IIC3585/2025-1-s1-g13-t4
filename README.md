## Acordion

**Uso**  
1. Inicia un servidor local.  
2. Abre `index.html` en:
   - `acordion-WebComponents/`  
   - `acordion-lit/`

**Personalización**  
- Añade/borra `<acordion-element>` para secciones.  
- Dentro de cada uno, usa slots `header` y `content`.  
- Ajusta ancho con `<acordion-group width="50%">`.

**Responsive**  
Funciona en cualquier tamaño de pantalla (móvil y escritorio).

---

## Suscripción

**Uso**  
1. Inicia un servidor local.  
2. Abre `index.html` en:
   - `suscripcion-WebComponents/`  
   - `suscripcion-lit/`

**Personalización**  
- Añade/borra `<article slot="plan">` para cada tarjeta.  
- Define `data-nombre="Plan"` y usa clases `.visits`, `.precio`, `.label-precio`, `.vat`, `.descripcion`, `.features`.  
- Cambia el color principal ajustando la variable CSS `--primary` en el componente.

**Responsive**  
Tarjetas adaptativas en cualquier ancho (móvil y escritorio).  
