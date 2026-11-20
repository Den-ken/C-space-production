# SPACE PRODUCCIONES
Astro + GSAP + Lenis. `npm run dev` · `npm run build` · `npm run preview`.

- Proyectos, servicios y proceso: `src/data/projects.ts` (añade `image: '/projects/x.jpg'` y coloca el archivo en `public/projects/`).
- Formulario: define `PUBLIC_FORM_ENDPOINT` (p. ej. URL de Formspree) en `.env`; sin él solo valida.
- `?skip` en la URL omite el cargador (útil para pruebas).

## Imágenes provisionales
Las fotos de `public/projects/` son de stock de [Unsplash](https://unsplash.com/license) (licencia libre, sin atribución obligatoria) y sirven de marcador hasta tener material propio. Sustituye cada archivo por el definitivo con el mismo nombre (`p4.jpg`, `p8.jpg`, `pod-*.jpg`, `stream-desk.jpg`, `setup-desk.jpg`, `phone-live.jpg`, `studio-live.jpg`, `red-lights.jpg`) y actualiza las rutas en `src/data/site.ts` y retira las etiquetas "Foto de stock" / "Ejemplo ficticio".
