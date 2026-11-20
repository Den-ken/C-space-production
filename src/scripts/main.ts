import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);
const skipIntro = new URLSearchParams(location.search).has('skip');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));

/* ---------- Scroll suave ---------- */
let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
$$<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href')!;
    const target = id === '#top' ? document.body : $(id);
    if (!target) return;
    e.preventDefault();
    menu?.classList.remove('open');
    burger?.setAttribute('aria-expanded', 'false');
    if (lenis) lenis.scrollTo(target as HTMLElement, { offset: 0 });
    else target.scrollIntoView();
  })
);

/* ---------- Menú móvil ---------- */
const burger = $('.burger');
const menu = $('#menu');
burger?.addEventListener('click', () => {
  const open = menu!.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu?.classList.contains('open')) {
    menu.classList.remove('open');
    burger?.setAttribute('aria-expanded', 'false');
    (burger as HTMLElement | null)?.focus();
  }
});

/* ---------- Texto dividido en palabras ---------- */
function splitWords(el: HTMLElement) {
  const frag = document.createDocumentFragment();
  const wrap = (node: Node) => {
    const w = document.createElement('span');
    w.className = 'w';
    const i = document.createElement('span');
    i.appendChild(node);
    w.appendChild(i);
    return w;
  };
  Array.from(el.childNodes).forEach((n) => {
    if (n.nodeType === 3) {
      (n.textContent || '').split(/(\s+)/).forEach((p) => {
        if (!p) return;
        if (/^\s+$/.test(p)) frag.appendChild(document.createTextNode(' '));
        else frag.appendChild(wrap(document.createTextNode(p)));
      });
    } else frag.appendChild(wrap(n));
  });
  el.replaceChildren(frag);
}
$$('[data-split]').forEach(splitWords);

/* ---------- Loader + entrada del hero ---------- */
const loader = $('.loader');
function runLoader(): Promise<void> {
  return new Promise((resolve) => {
    if (reduce || skipIntro || !loader) { loader?.remove(); return resolve(); }
    const state = { v: 0 };
    const count = $('#lcount')!, bar = $('#lbar')!;
    gsap.to(state, {
      v: 100, duration: 1.8, ease: 'power2.inOut',
      onUpdate: () => { count.textContent = String(Math.round(state.v)).padStart(3, '0'); bar.style.width = state.v + '%'; },
      onComplete: () => {
        gsap.to(loader, { yPercent: -100, duration: 0.9, ease: 'power4.inOut', onComplete: () => { loader.remove(); resolve(); } });
      },
    });
  });
}

function heroIn() {
  if (reduce) { gsap.set('.hero [data-hero-fade]', { opacity: 1 }); return; }
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  tl.from('.space span', { yPercent: 110, duration: 1.3, stagger: 0.09 }, 0)
    .from('.prod i', { scaleX: 0, duration: 1.2, stagger: 0.1 }, 0.5)
    .from('.prod span', { opacity: 0, letterSpacing: '1.2em', duration: 1.4 }, 0.5)
    .from('.claim .split-line > span', { yPercent: 110, duration: 1.1, stagger: 0.12 }, 0.4)
    .from('[data-hero-fade]', { opacity: 0, y: 14, duration: 1, stagger: 0.15 }, 0.9)
    .from('.vf i', { scale: 2.2, opacity: 0, duration: 1, stagger: 0.05 }, 0.2);
  gsap.to('.hero .word', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero .msg', { yPercent: -30, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: '70% top', scrub: true } });
}

/* timecode vivo */
const tc = $('.tc');
if (tc) {
  const t0 = performance.now();
  const p = (n: number) => String(n).padStart(2, '0');
  setInterval(() => {
    const e = (performance.now() - t0) / 1000;
    tc.textContent = `${p(Math.floor(e / 3600))}:${p(Math.floor(e / 60) % 60)}:${p(Math.floor(e) % 60)}`;
  }, 500);
}

/* ---------- Revelados al hacer scroll ---------- */
function scrollAnims() {
  if (reduce) return;
  $$('[data-split]').forEach((h) => {
    gsap.from($$('.w > span', h), {
      yPercent: 115, duration: 1, ease: 'power4.out', stagger: 0.05,
      scrollTrigger: { trigger: h, start: 'top 85%' },
    });
  });
  $$('[data-reveal]').forEach((el) =>
    gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } })
  );
  $$('[data-parallax]').forEach((el) => {
    const y = Number(el.dataset.parallax);
    gsap.fromTo(el, { yPercent: -y / 4 }, { yPercent: y / 4, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.from(el, { clipPath: 'inset(100% 0 0 0)', duration: 1.4, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
  });
  $$('.card').forEach((c) =>
    gsap.from(c, { opacity: 0, y: 60, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: c, start: 'top 92%' } })
  );
  $$('.row').forEach((r) =>
    gsap.from(r, { opacity: 0, y: 24, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: r, start: 'top 92%' } })
  );

  /* Proceso: cabezal que recorre la línea de tiempo */
  const tl = $('.tl');
  const ph = $('.playhead');
  const clips = $$('[data-clip]');
  if (tl && ph && window.matchMedia('(min-width: 761px)').matches) {
    const label = 112; // 7rem
    ScrollTrigger.create({
      trigger: tl, start: 'top 70%', end: 'bottom 40%', scrub: true,
      onUpdate: (self) => {
        const w = tl.clientWidth - label;
        const x = self.progress * w;
        ph.style.transform = `translateX(${x}px)`;
        const tr = tl.getBoundingClientRect();
        clips.forEach((c) => c.classList.toggle('on', c.getBoundingClientRect().left - tr.left - label <= x));
      },
    });
  } else clips.forEach((c) => c.classList.add('on'));
}

/* ---------- Servicios: el monitor muestra el servicio activo (hover o fila que cruza el centro) ---------- */
const sRows = $$<HTMLElement>('.services .row');
const sImgs = $$<HTMLElement>('.services .screen img');
const sNum = $('.services .mon-n');
function setService(i: number) {
  sRows.forEach((r, k) => r.classList.toggle('on', k === i));
  sImgs.forEach((m, k) => m.classList.toggle('on', k === i));
  if (sNum) sNum.textContent = String(i + 1).padStart(2, '0');
}
if (sRows.length) {
  setService(0);
  sRows.forEach((r, i) => r.addEventListener('mouseenter', () => setService(i)));
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) setService(sRows.indexOf(e.target as HTMLElement)); }),
    { rootMargin: '-45% 0px -45% 0px' }
  );
  sRows.forEach((r) => io.observe(r));
}

/* ---------- Cursor ---------- */
const cur = $('.cursor');       // aro: sigue al ratón con retraso
const dot = $('.cursor-dot');   // punto: pegado al ratón
if (cur && dot && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduce) {
  document.documentElement.classList.add('has-cursor');
  const rx = gsap.quickTo(cur, 'x', { duration: 0.35, ease: 'power3' });
  const ry = gsap.quickTo(cur, 'y', { duration: 0.35, ease: 'power3' });
  const dx = gsap.quickTo(dot, 'x', { duration: 0.05, ease: 'none' });
  const dy = gsap.quickTo(dot, 'y', { duration: 0.05, ease: 'none' });
  window.addEventListener('mousemove', (e) => { rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY); });
  document.addEventListener('mouseover', (e) => {
    const hit = (e.target as HTMLElement).closest('a, button, .card, input, select, textarea');
    cur.classList.toggle('big', !!hit);
  });
}

/* ---------- Portafolio: filtros y visor ---------- */
const formats: { id: string; title: string; category: string; format: string; blurb: string; tone: number; image?: string; pos?: string }[] =
  JSON.parse($('#formats-data')?.textContent || '[]');
const cards = $$<HTMLElement>('.card');
$$<HTMLButtonElement>('.filters button').forEach((b) =>
  b.addEventListener('click', () => {
    $$<HTMLButtonElement>('.filters button').forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
    const f = b.dataset.filter;
    cards.forEach((c) => {
      const show = f === 'all' || c.dataset.cat === f;
      if (show) { c.classList.remove('hide'); if (!reduce) gsap.fromTo(c, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }); }
      else c.classList.add('hide');
    });
    ScrollTrigger.refresh();
  })
);

const dlg = $<HTMLDialogElement>('.viewer');
let cur_i = 0;
function show(i: number) {
  if (!dlg || !formats.length) return;
  cur_i = (i + formats.length) % formats.length;
  const p = formats[cur_i];
  $('#v-cat')!.textContent = `${String(cur_i + 1).padStart(2, '0')} — ${p.category}`;
  $('#v-title')!.textContent = p.title;
  $('#v-blurb')!.textContent = p.blurb;
  $('#v-format')!.textContent = p.format;
  const sc = $('.v-scene', dlg)!;
  sc.dataset.tone = String(p.tone);
  $('img', sc)?.remove();
  if (p.image) { const im = document.createElement('img'); im.src = p.image; im.alt = p.title; if (p.pos) im.style.objectPosition = p.pos; sc.prepend(im); }
  if (!reduce) gsap.fromTo([sc, '.v-info > *'], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.05, ease: 'power3.out' });
}
cards.forEach((c) =>
  c.addEventListener('click', () => {
    show(formats.findIndex((p) => p.id === c.dataset.id));
    dlg!.showModal();
    lenis?.stop();
  })
);
if (dlg) $('.close', dlg)?.addEventListener('click', () => dlg.close());
dlg?.addEventListener('close', () => lenis?.start());
if (dlg) $$<HTMLButtonElement>('.nav2 button', dlg).forEach((b) => b.addEventListener('click', () => show(cur_i + Number(b.dataset.dir))));

/* ---------- Caminos de la agencia: preseleccionan el motivo del formulario ---------- */
$$<HTMLAnchorElement>('[data-need]').forEach((a) =>
  a.addEventListener('click', () => {
    const sel = $<HTMLSelectElement>('#tipo');
    if (sel && a.dataset.need) sel.value = a.dataset.need;
  })
);

/* ---------- Formulario ---------- */
const form = $<HTMLFormElement>('#quote');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const status = $('#fstatus')!;
  let ok = true;
  $$<HTMLInputElement>('input[required], select[required], textarea[required]', form).forEach((f) => {
    const box = f.closest('.f')!;
    const err = $('.err', box)!;
    let msg = '';
    if (f.type === 'checkbox') { if (!f.checked) msg = 'Debes confirmar que eres mayor de 18 años.'; }
    else if (!f.value.trim()) msg = 'Este campo es obligatorio.';
    else if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value)) msg = 'Introduce un correo válido.';
    err.textContent = msg;
    box.classList.toggle('bad', !!msg);
    f.setAttribute('aria-invalid', String(!!msg));
    if (msg) ok = false;
  });
  if (!ok) { status.textContent = 'Revisa los campos marcados.'; $('.bad input, .bad select, .bad textarea', form)?.focus(); return; }
  const endpoint = form.dataset.endpoint;
  if (!endpoint) {
    // Sin destino configurado no se envía nada: se dice con claridad para no dar una falsa confirmación.
    if (import.meta.env.DEV) console.warn('[formulario] Falta PUBLIC_FORM_ENDPOINT en .env: la solicitud no se envió.');
    status.textContent = 'Todavía no podemos recibir solicitudes desde este formulario. No se ha enviado nada; vuelve a intentarlo pronto.';
    return;
  }
  try {
    const r = await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
    if (!r.ok) throw new Error();
    status.textContent = 'Gracias. Hemos recibido tu solicitud y te responderemos pronto.';
    form.reset();
  } catch { status.textContent = 'No se pudo enviar. Inténtalo de nuevo más tarde.'; }
});

/* ---------- Arranque ---------- */
/* ---------- Aviso +18 ---------- */
function ageGate() {
  const gate = $<HTMLDialogElement>('dialog.gate');
  if (!gate) return;
  let ok = false;
  try { ok = localStorage.getItem('space-18') === '1'; } catch { /* sin almacenamiento: se vuelve a preguntar */ }
  if (ok) return;
  gate.addEventListener('cancel', (e) => e.preventDefault()); // Escape no lo salta: hay que elegir
  gate.addEventListener('close', () => { document.documentElement.classList.remove('gate-open'); lenis?.start(); });
  $('[data-gate="yes"]', gate)?.addEventListener('click', () => {
    try { localStorage.setItem('space-18', '1'); } catch { /* se pregunta de nuevo la próxima vez */ }
    gate.close();
  });
  $('[data-gate="no"]', gate)?.addEventListener('click', () => { location.href = 'https://www.google.com'; });
  document.documentElement.classList.add('gate-open');
  lenis?.stop();
  gate.showModal();
}

runLoader().then(() => { heroIn(); scrollAnims(); ScrollTrigger.refresh(); ageGate(); });
if (reduce) $$('[data-reveal]').forEach((e) => ((e as HTMLElement).style.opacity = '1'));

/* Menú: marca la sección que se está viendo (aria-current) */
const navLinks = $$<HTMLAnchorElement>('#menu a[href^="#"]');
const spy = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const id = '#' + e.target.id;
    navLinks.forEach((a) => (a.getAttribute('href') === id ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
  }),
  { rootMargin: '-45% 0px -50% 0px' }
);
$$('main > section[id]').forEach((s) => spy.observe(s));

/* Barra de navegación: fondo sólido al desplazarse */
const navEl = $('.nav');
const onScroll = () => navEl?.classList.toggle('solid', window.scrollY > 80);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
