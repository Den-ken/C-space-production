// Contenido del sitio. SPACE PRODUCCIONES = productora digital: podcasts, transmisiones en vivo
// y agencia de creadores. Lo marcado como "ejemplo" es ilustrativo hasta tener material real.

export const platforms = ['TikTok', 'YouTube', 'Twitch', 'Kick', 'Facebook', 'Instagram'];

export type Category = 'Podcast' | 'En vivo' | 'Nocturno' | 'Clips';
export interface Format {
  id: string; title: string; category: Category; format: string;
  blurb: string; tone: number; size: 'xl' | 'tall' | 'wide' | 'sq'; image?: string; pos?: string;
}
export const categories: Category[] = ['Podcast', 'En vivo', 'Nocturno', 'Clips'];

// Formatos de EJEMPLO (no son programas reales). Sustituir por los de la productora
// y añadir `image: '/projects/archivo.jpg'` para cambiar la imagen temporal.
export const formats: Format[] = [
  { id: 'f1', image: '/projects/pod-studio.jpg', title: 'Mesa Abierta', category: 'Podcast', format: 'Video podcast semanal', blurb: 'Conversación larga a micrófono abierto, grabada en video y publicada en audio y en video en todas las plataformas.', tone: 0, size: 'xl' },
  { id: 'f2', image: '/projects/stream-desk.jpg', pos: '72% 50%', title: 'Prime Time', category: 'En vivo', format: 'Directo multiplataforma', blurb: 'Programa en vivo emitido a la vez en YouTube, Twitch, Kick y Facebook, con chat unificado y moderación.', tone: 1, size: 'tall' },
  { id: 'f3', image: '/projects/p4.jpg', title: 'Madrugada', category: 'Nocturno', format: 'Show nocturno en vivo', blurb: 'Formato de noche, solo para mayores de 18: invitados, retos y conversación con el chat en tiempo real.', tone: 2, size: 'sq' },
  { id: 'f4', image: '/projects/phone-live.jpg', pos: '50% 42%', title: 'Cortes', category: 'Clips', format: 'Clips verticales', blurb: 'Los mejores momentos de cada directo, recortados y editados para TikTok, Reels y Shorts.', tone: 3, size: 'wide' },
  { id: 'f5', image: '/projects/studio-live.jpg', pos: '62% 62%', title: 'Desde el Estudio', category: 'En vivo', format: 'Realización multicámara', blurb: 'Directo con varias cámaras, escenas, gráficos en pantalla y cambios de plano en tiempo real.', tone: 4, size: 'wide' },
  { id: 'f6', image: '/projects/red-lights.jpg', pos: '50% 35%', title: 'Luces Rojas', category: 'Nocturno', format: 'Evento transmitido', blurb: 'Show en directo con público, transmitido en simultáneo para quien no pudo estar en la sala.', tone: 5, size: 'sq' },
];

// Servicios (confirmar con el equipo cuáles se ofrecen y ajustar la redacción).
export const services = [
  { n: '01', image: '/projects/pod-mic.jpg', name: 'Podcast en audio y video', note: 'Del micrófono a todas las plataformas' },
  { n: '02', image: '/projects/stream-desk.jpg', name: 'Transmisiones en vivo', note: 'TikTok, YouTube, Twitch, Kick, Facebook e Instagram' },
  { n: '03', image: '/projects/studio-live.jpg', name: 'Realización y gráficos', note: 'Cámaras, escenas y overlays en tiempo real' },
  { n: '04', image: '/projects/phone-live.jpg', name: 'Clips y contenido vertical', note: 'Cada directo, convertido en piezas cortas' },
  { n: '05', image: '/projects/setup-desk.jpg', name: 'Gestión de canales', note: 'Calendario, publicación y crecimiento' },
  { n: '06', image: '/projects/p4.jpg', name: 'Agencia de creadores', note: 'Creadoras e influencers con respaldo' },
  { n: '07', image: '/projects/pod-host.jpg', name: 'Casting de talento', note: 'Para quien quiere empezar a transmitir' },
  { n: '08', image: '/projects/p8.jpg', name: 'Marcas y colaboraciones', note: 'Campañas con creadores que encajan' },
];

// Datos de contacto reales. Déjalos vacíos hasta confirmarlos: solo se muestran los que tengan valor.
export const contact = {
  email: '',
  phone: '',
  whatsapp: '', // solo dígitos con prefijo de país, p. ej. '573001234567'
  social: [] as { label: string; url: string }[], // p. ej. { label: 'Instagram', url: 'https://instagram.com/...' }
};

export const process = [
  { n: '01', t: 'Idea y formato', d: 'Definimos qué es el programa, para quién y en qué plataformas vive.' },
  { n: '02', t: 'Preproducción', d: 'Guion de programa, calendario, escenas, gráficos y plan técnico.' },
  { n: '03', t: 'Prueba de señal', d: 'Ensayo de audio, video, cámaras y conexión antes de salir al aire.' },
  { n: '04', t: 'En vivo', d: 'Realización, moderación del chat y emisión simultánea.' },
  { n: '05', t: 'Después del directo', d: 'Clips, publicación en redes y revisión de resultados.' },
];

// Caminos de entrada a la agencia: cada uno preselecciona el motivo en el formulario.
export const paths = [
  { k: '01', t: 'Ya creo contenido', d: 'Súmate a la agencia y profesionaliza tu canal.', need: 'Agencia de creadores' },
  { k: '02', t: 'Quiero empezar', d: 'Cuéntanos quién eres y entra al casting.', need: 'Casting de talento' },
  { k: '03', t: 'Soy una marca', d: 'Colabora con creadores que encajan contigo.', need: 'Marcas y colaboraciones' },
];
