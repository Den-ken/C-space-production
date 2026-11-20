// Contenido del sitio. Solo se afirma lo que la empresa ha confirmado:
// productora digital de entretenimiento · podcasts · transmisiones en vivo (TikTok, Facebook, YouTube,
// Instagram, Kick, Twitch) · shows y formatos nocturnos · agencia de creadoras e influencers con casting ·
// acceso solo para mayores de 18 · pantallas verde, blanca y negra (sesiones fotográficas).
// Cualquier dato nuevo (programas, clientes, cifras, precios) se añade solo cuando la empresa lo entregue.

export const platforms = ['TikTok', 'YouTube', 'Twitch', 'Kick', 'Facebook', 'Instagram'];

// `note` es opcional: si no hay dato confirmado, se deja vacío y no se muestra.
export const services = [
  { n: '01', image: `${import.meta.env.BASE_URL}projects/pod-mic.jpg`, name: 'Podcasts', note: '' },
  { n: '02', image: `${import.meta.env.BASE_URL}projects/stream-desk.jpg`, name: 'Transmisiones en vivo', note: 'TikTok, Facebook, YouTube, Instagram, Kick y Twitch' },
  { n: '03', image: `${import.meta.env.BASE_URL}projects/p4.jpg`, name: 'Shows y formatos nocturnos', note: 'En vivo y de noche' },
  { n: '04', image: `${import.meta.env.BASE_URL}projects/pod-host.jpg`, name: 'Agencia de creadores', note: 'Creadoras e influencers' },
  { n: '05', image: `${import.meta.env.BASE_URL}projects/phone-live.jpg`, name: 'Casting', note: 'Solo para mayores de 18' },
  { n: '06', image: `${import.meta.env.BASE_URL}projects/studio-foto.jpg`, name: 'Sesiones fotográficas', note: 'Con pantalla verde, blanca y negra' },
];

// Datos de contacto reales. Déjalos vacíos hasta confirmarlos: solo se muestran los que tengan valor.
export const contact = {
  email: '',
  phone: '',
  whatsapp: '', // solo dígitos con prefijo de país, p. ej. '573001234567'
  social: [] as { label: string; url: string }[], // p. ej. { label: 'Instagram', url: 'https://instagram.com/...' }
};

// Caminos de entrada a la agencia: cada uno preselecciona el motivo en el formulario.
export const paths = [
  { k: '01', t: 'Ya soy creador/a', d: 'Cuéntanos sobre tu canal.', need: 'Agencia de creadores' },
  { k: '02', t: 'Quiero hacer el casting', d: 'Déjanos tus datos y tus redes.', need: 'Casting' },
];
