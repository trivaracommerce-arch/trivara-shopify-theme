/* Trivara Superfoods — Interactive Components */

/* ─── Ingredient / Benefit Tabs ─────────────────────────────── */
class TrivaraTabs {
  constructor(el) {
    this.el = el;
    this.tabs = el.querySelectorAll('.trivara-tabs__tab');
    this.panels = el.querySelectorAll('.trivara-tabs__panel');
    this.tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => this.activate(i));
    });
  }
  activate(index) {
    this.tabs.forEach(t => t.classList.remove('is-active'));
    this.panels.forEach(p => p.classList.remove('is-active'));
    this.tabs[index].classList.add('is-active');
    this.panels[index].classList.add('is-active');
  }
}

document.querySelectorAll('.trivara-tabs').forEach(el => new TrivaraTabs(el));

/* ─── Sticky Add to Cart Bar ────────────────────────────────── */
class TrivaraStickyAtc {
  constructor() {
    this.bar = document.querySelector('.trivara-sticky-atc');
    this.trigger = document.querySelector('.product-form__submit, [data-atc-trigger]');
    if (!this.bar || !this.trigger) return;
    this.observe();
    this.bar.querySelector('.trivara-sticky-atc__btn')?.addEventListener('click', () => {
      this.trigger.click();
    });
  }
  observe() {
    const io = new IntersectionObserver(([entry]) => {
      this.bar.classList.toggle('is-visible', !entry.isIntersecting);
    }, { threshold: 0.5 });
    io.observe(this.trigger);
  }
}

document.addEventListener('DOMContentLoaded', () => new TrivaraStickyAtc());

/* ─── Before / After Comparison Slider ─────────────────────── */
class TrivaraComparison {
  constructor(el) {
    this.el = el;
    this.overlay = el.querySelector('.trivara-comparison__overlay');
    this.handle = el.querySelector('.trivara-comparison__handle');
    this.dragging = false;
    this.el.addEventListener('mousedown', e => this.start(e));
    this.el.addEventListener('touchstart', e => this.start(e), { passive: true });
    document.addEventListener('mousemove', e => this.move(e));
    document.addEventListener('touchmove', e => this.move(e), { passive: true });
    document.addEventListener('mouseup', () => (this.dragging = false));
    document.addEventListener('touchend', () => (this.dragging = false));
  }
  start(e) { this.dragging = true; this.move(e); }
  move(e) {
    if (!this.dragging) return;
    const rect = this.el.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const pct = Math.min(Math.max(x / rect.width * 100, 5), 95);
    this.overlay.style.width = pct + '%';
    this.handle.style.left = pct + '%';
  }
}

document.querySelectorAll('.trivara-comparison').forEach(el => new TrivaraComparison(el));
