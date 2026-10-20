'use strict';

/* ============== CONFIG ============== */
const WA_NUMBER = '919876543210'; // change to the shop's WhatsApp number (country code + number, no +)
const PAGE_SIZE = 8;

const waLink = msg => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
const rupee = n => '₹' + n.toLocaleString('en-IN');

/* ============== DATA ============== */
const PHOTO_IDS = {
  a: 'photo-1610030469983-98e550d6193c',
  b: 'photo-1583391733956-3750e0ff4e8b',
  c: 'photo-1583391733975-b7c013560f3d',
  d: 'photo-1596783074918-c84cb06531ca',
  e: 'photo-1617627143754-dfbc0ecde1a8',
  f: 'photo-1602810318383-e386cc2a3ccf',
  g: 'photo-1623609163859-ca93c959b98b'
};
const PHOTO_KEYS = Object.keys(PHOTO_IDS);
const photo = (k, w = 600) => `https://images.unsplash.com/${PHOTO_IDS[k]}?w=${w}&q=80`;
// main photo first, then the next four in rotation
const galleryFor = main => {
  const start = PHOTO_KEYS.indexOf(main);
  return Array.from({ length: 5 }, (_, i) => PHOTO_KEYS[(start + i) % PHOTO_KEYS.length]);
};

const C = {
  maroon: ['Maroon', '#5B1A1F'], deep: ['Deep Maroon', '#3E0F12'], rose: ['Dusty Rose', '#C29A8E'],
  mustard: ['Mustard', '#E8B85F'], sage: ['Sage Green', '#7A8B69'], teal: ['Teal', '#1A535C'],
  gold: ['Antique Gold', '#A8874B'], ivory: ['Ivory', '#FBF6EE'], beige: ['Beige', '#E8DFCE']
};

const SIZES_STD = ['S', 'M', 'L', 'XL', 'XXL'];
const SIZES_PLUS = ['S', 'M', 'L', 'XL', 'XXL', '3XL'];
const SIZES_SLIM = ['XS', 'S', 'M', 'L', 'XL'];

const products = [
  { id: 1, name: 'Noor Begum Anarkali', cat: 'anarkali', tag: 'new', fabric: 'Pure Georgette', design: 'Hand-embroidered floral buti', price: 4499, orig: 5999, colors: [C.maroon, C.rose, C.deep], sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], main: 'a', desc: 'A flowing floor-skimming Anarkali in featherlight georgette, with floral butis embroidered by hand across the yoke and hem.' },
  { id: 2, name: 'Punjabi Phulkari Suit', cat: 'punjabi', tag: 'best', fabric: 'Pure Cotton', design: 'Traditional phulkari embroidery', price: 2199, colors: [C.mustard, C.rose, C.sage], sizes: SIZES_STD, main: 'b', desc: 'A classic Punjabi suit in breathable cotton, finished with bright phulkari thread-work that celebrates the heritage of the region.' },
  { id: 3, name: 'Patiala Royal Salwar', cat: 'patiala', tag: 'new', fabric: 'Cotton Silk', design: 'Patiala-style with chunari dupatta', price: 2899, colors: [C.maroon, C.deep, C.teal], sizes: SIZES_PLUS, main: 'c', desc: 'Generously pleated Patiala salwar paired with a printed chunari dupatta, tailored for festive afternoons and family functions.' },
  { id: 4, name: 'Plazo Festive Set', cat: 'plazo', tag: 'new', fabric: 'Rayon', design: 'Mirror-work plazo with kurti', price: 1899, colors: [C.maroon, C.mustard, C.rose], sizes: SIZES_STD, main: 'g', desc: 'A comfortable kurti and wide-leg plazo set accented with small mirror work — easy to wear, easy to dress up.' },
  { id: 5, name: 'Zari Work Anarkali', cat: 'party', tag: 'new', fabric: 'Net & Satin', design: 'Heavy zari embroidery', price: 6499, orig: 8499, colors: [C.maroon, C.deep, C.gold], sizes: SIZES_SLIM, main: 'e', desc: 'An evening Anarkali in net over satin lining, heavy with zari embroidery that catches the light as you move.' },
  { id: 6, name: 'Cotton Straight-Cut Suit', cat: 'straight', tag: 'best', fabric: 'Pure Cotton', design: 'Chikankari handwork', price: 1499, colors: [C.ivory, C.beige, C.rose], sizes: SIZES_PLUS, main: 'd', desc: 'A clean straight-cut suit in soft cotton with delicate chikankari handwork — ideal for daily wear and summer outings.' },
  { id: 7, name: 'Embroidered Kurti', cat: 'kurti', tag: 'best', fabric: 'Maslin Cotton', design: 'Thread embroidery', price: 999, colors: [C.rose, C.maroon, C.sage, C.teal], sizes: SIZES_STD, main: 'f', desc: 'A light maslin cotton kurti with neat thread embroidery on the neckline, made to pair with jeans, leggings or palazzos.' },
  { id: 8, name: 'Wedding Lehenga Suit', cat: 'party', tag: 'new', fabric: 'Velvet & Net', design: 'Heavy stone & thread embroidery', price: 12999, orig: 15999, colors: [C.maroon, C.deep, C.gold], sizes: SIZES_SLIM, main: 'a', desc: 'A statement bridal-occasion lehenga suit in velvet and net, richly worked with stones and thread for wedding functions.' },
  { id: 9, name: 'Silk Festive Dupatta', cat: 'dupatta', tag: 'new', fabric: 'Pure Tussar Silk', design: 'Hand-block printed', price: 1299, colors: [C.maroon, C.gold, C.sage], sizes: ['Free Size'], main: 'b', desc: 'A hand-block printed tussar silk dupatta that lifts a plain suit into something festive.' },
  { id: 10, name: 'Maslin Summer Suit', cat: 'punjabi', tag: 'best', fabric: 'Pure Maslin', design: 'Light floral print', price: 1299, colors: [C.ivory, C.beige, C.rose, C.sage], sizes: SIZES_PLUS, main: 'c', desc: 'A weightless maslin suit in a light floral print, designed for hot Punjab summers without giving up on style.' },
  { id: 11, name: 'Cotton Silk Anarkali', cat: 'anarkali', tag: 'new', fabric: 'Cotton Silk', design: 'Thread work with sequins', price: 3299, colors: [C.maroon, C.deep, C.rose], sizes: SIZES_STD, main: 'e', desc: 'A cotton silk Anarkali with thread work and a scattering of sequins — festive without being heavy.' },
  { id: 12, name: 'Organza Bridal Suit', cat: 'party', tag: 'new', fabric: 'Pure Organza', design: 'Hand-embroidered floral jaal', price: 8999, orig: 11499, colors: [C.ivory, C.rose, C.maroon], sizes: SIZES_SLIM, main: 'f', desc: 'A sheer organza suit with a hand-embroidered floral jaal, made for engagement, mehendi and wedding functions.' }
].map(p => ({ ...p, photos: galleryFor(p.main) }));

const catLabels = {
  punjabi: 'Punjabi Suits', anarkali: 'Anarkali Suits', kurti: 'Kurtis', patiala: 'Patiala Sets',
  plazo: 'Plazo Suits', straight: 'Straight-Cut', party: 'Party Wear', dupatta: 'Dupattas'
};
const fabricLabels = {
  cotton: 'Pure Cotton', silk: 'Silk', maslin: 'Maslin', organza: 'Organza', georgette: 'Georgette', chiffon: 'Chiffon'
};

/* ============== HELPERS ============== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const byId = id => products.find(p => p.id === id);

let toastTimer;
function toast(msg, icon = 'fa-check') {
  const el = $('#toast');
  el.innerHTML = `<i class="fa-solid ${icon}"></i>${msg}`;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

function syncScrollLock() {
  const open = $('#productModal').classList.contains('open') ||
    $('#infoModal').classList.contains('open') ||
    $('#searchOverlay').classList.contains('open') ||
    $('#navLinks').classList.contains('open');
  document.body.classList.toggle('no-scroll', open);
}

function scrollToCatalogue() {
  $('#catalogue').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ============== WISHLIST ============== */
let wishlist = new Set();
try {
  wishlist = new Set(JSON.parse(localStorage.getItem('nidiva_wishlist') || '[]'));
} catch (e) { /* storage unavailable */ }

function saveWishlist() {
  try { localStorage.setItem('nidiva_wishlist', JSON.stringify([...wishlist])); } catch (e) { /* ignore */ }
}

function updateWishUI() {
  const count = $('#wishCount');
  count.textContent = wishlist.size;
  count.hidden = wishlist.size === 0;
  $('#wishBtn i').className = (wishlist.size ? 'fa-solid' : 'fa-regular') + ' fa-heart';
  $$('[data-wish]').forEach(btn => {
    const on = wishlist.has(+btn.dataset.wish);
    btn.classList.toggle('wished', on);
    const icon = $('i', btn);
    if (icon) icon.className = (on ? 'fa-solid' : 'fa-regular') + ' fa-heart';
    if (btn.classList.contains('btn-wish')) btn.setAttribute('aria-pressed', on);
  });
}

function toggleWish(id) {
  const p = byId(id);
  if (wishlist.has(id)) {
    wishlist.delete(id);
    toast(`Removed ${p.name} from wishlist`, 'fa-heart-crack');
  } else {
    wishlist.add(id);
    toast(`Saved ${p.name} to wishlist`, 'fa-heart');
  }
  saveWishlist();
  updateWishUI();
  if (currentInfo === 'wishlist') openInfo('wishlist');
}

/* ============== PRODUCT CARDS ============== */
function cardHTML(p) {
  const tagClass = p.tag === 'new' ? 'new' : (p.tag === 'sale' ? 'sale' : '');
  const tagText = p.tag === 'new' ? 'New' : (p.tag === 'sale' ? 'Sale' : 'Bestseller');
  const on = wishlist.has(p.id);
  return `
    <article class="product-card" data-open="${p.id}" tabindex="0" role="button" aria-label="View details for ${p.name}">
      <div class="product-img">
        <span class="product-tag ${tagClass}">${tagText}</span>
        <div class="product-actions">
          <button class="icon-btn ${on ? 'wished' : ''}" data-wish="${p.id}" aria-label="Add to wishlist"><i class="${on ? 'fa-solid' : 'fa-regular'} fa-heart"></i></button>
          <button class="icon-btn" data-open="${p.id}" aria-label="Quick view"><i class="fa-regular fa-eye"></i></button>
        </div>
        <img src="${photo(p.main)}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-info">
        <div class="product-cat">${catLabels[p.cat]}</div>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-meta">${p.fabric} · ${p.design}</div>
        <div class="product-swatches" aria-label="Available colours">${p.colors.map(c => `<i style="background:${c[1]}" title="${c[0]}"></i>`).join('')}</div>
        <div class="product-bottom">
          <div class="product-price"><small>Starting at</small>${rupee(p.price)}</div>
          <span class="view-btn">View <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </div>
    </article>`;
}

function renderInto(gridId, list, emptyHTML) {
  const grid = document.getElementById(gridId);
  grid.innerHTML = list.length ? list.map(cardHTML).join('') : (emptyHTML || '');
}

/* ============== CATALOGUE STATE ============== */
const state = { type: 'cat', value: 'all', visible: PAGE_SIZE };

function matches(p) {
  const { type, value } = state;
  if (type === 'cat') {
    if (value === 'all') return true;
    if (value === 'new') return p.tag === 'new';
    return p.cat === value;
  }
  if (type === 'fabric') return p.fabric.toLowerCase().includes(value);
  if (type === 'search') {
    const q = value.toLowerCase();
    return [p.name, catLabels[p.cat], p.fabric, p.design].some(s => s.toLowerCase().includes(q));
  }
  return true;
}

function renderCatalogue() {
  const list = products.filter(matches);
  const shown = list.slice(0, state.visible);
  const empty = `
    <div class="empty-state">
      <i class="fa-solid fa-leaf"></i>
      <p>Nothing in this selection right now. Ask us on WhatsApp — we may have it in the shop.</p>
      <a class="btn btn-whatsapp" target="_blank" rel="noopener" href="${waLink('Hello NIDIVA, I am looking for ' + (state.type === 'cat' ? (catLabels[state.value] || 'new designs') : state.value) + '. Do you have it?')}"><i class="fa-brands fa-whatsapp"></i> Ask on WhatsApp</a>
      <button class="btn btn-outline" data-filter="all">Show all designs</button>
    </div>`;
  renderInto('productGrid', shown, empty);
  $('#loadMoreWrap').hidden = list.length <= state.visible;

  const note = $('#filterNote');
  if (state.type === 'fabric' || state.type === 'search') {
    const label = state.type === 'fabric' ? `${fabricLabels[state.value] || state.value} fabric` : `“${state.value}”`;
    note.innerHTML = `<span>Showing <strong>${label}</strong> · ${list.length} ${list.length === 1 ? 'design' : 'designs'}</span><button data-filter="all">Clear</button>`;
    note.hidden = false;
  } else {
    note.hidden = true;
  }
}

function setChipActive(value) {
  $$('.filter-chip').forEach(c => c.classList.toggle('active', c.dataset.filter === value));
}

function applyCategory(value, scroll = true) {
  state.type = 'cat'; state.value = value; state.visible = PAGE_SIZE;
  setChipActive(value);
  renderCatalogue();
  if (scroll) scrollToCatalogue();
}

function applyFabric(value) {
  state.type = 'fabric'; state.value = value; state.visible = PAGE_SIZE;
  setChipActive(null);
  renderCatalogue();
  scrollToCatalogue();
}

function applySearch(q) {
  state.type = 'search'; state.value = q; state.visible = PAGE_SIZE;
  setChipActive(null);
  renderCatalogue();
  scrollToCatalogue();
}

/* ============== PRODUCT MODAL ============== */
let current = null; // { product, color, size, photoIndex }

function setPhoto(i) {
  const n = current.product.photos.length;
  current.photoIndex = (i + n) % n;
  const key = current.product.photos[current.photoIndex];
  const img = $('#mainImage');
  img.src = photo(key);
  img.alt = current.product.name;
  $$('.thumb').forEach((t, idx) => t.classList.toggle('active', idx === current.photoIndex));
}

function enquiryMessage() {
  const { product: p, color, size } = current;
  return `Hello NIDIVA, I'm interested in "${p.name}" (${rupee(p.price)}).\nColour: ${p.colors[color][0]}\nSize: ${size}\nPlease share more details and availability.`;
}

function openProduct(id) {
  const p = byId(id);
  if (!p) return;
  closeSearch();
  closeInfo();
  current = { product: p, color: 0, size: p.sizes[Math.min(1, p.sizes.length - 1)], photoIndex: 0 };

  $('#thumbs').innerHTML = p.photos.map((k, i) =>
    `<button class="thumb ${i === 0 ? 'active' : ''}" data-thumb="${i}" aria-label="Photo ${i + 1}"><img src="${photo(k, 200)}" alt=""></button>`).join('');
  setPhoto(0);

  const off = p.orig ? Math.round((1 - p.price / p.orig) * 100) : 0;
  const on = wishlist.has(p.id);
  $('#modalInfo').innerHTML = `
    <div class="breadcrumb-trail">Home · ${catLabels[p.cat]}</div>
    <h2>${p.name}</h2>
    <div class="price-tag">
      <small>Price</small>${rupee(p.price)}${p.orig ? `<span class="orig">${rupee(p.orig)}</span><span class="off">${off}% off</span>` : ''}
    </div>
    <p class="desc">${p.desc}</p>
    <div class="specs">
      <h4>Product Details</h4>
      <div class="spec-row"><strong>Fabric</strong><span>${p.fabric}</span></div>
      <div class="spec-row"><strong>Design</strong><span>${p.design}</span></div>
      <div class="spec-row"><strong>Category</strong><span>${catLabels[p.cat]}</span></div>
      <div class="spec-row"><strong>Stitching</strong><span>Ready-made · Custom alterations free</span></div>
      <div class="spec-row"><strong>Care</strong><span>Dry clean recommended</span></div>
      <div class="spec-row"><strong>Origin</strong><span>Handcrafted in Punjab, India</span></div>
    </div>
    <h4 class="opt-title">Colour<span id="colorName">${p.colors[0][0]}</span></h4>
    <div class="colors" id="colorRow">
      ${p.colors.map((c, i) => `<button class="color-dot ${i === 0 ? 'active' : ''}" data-color="${i}" style="background:${c[1]}" title="${c[0]}" aria-label="${c[0]}"></button>`).join('')}
    </div>
    <h4 class="opt-title">Size<span id="sizeName">${current.size}</span> · <a href="#" data-info="size" style="text-decoration:underline;color:var(--maroon);letter-spacing:0;text-transform:none;font-weight:400;font-size:13px">Size guide</a></h4>
    <div class="size-row" id="sizeRow">
      ${p.sizes.map(s => `<button class="size-pill ${s === current.size ? 'active' : ''}" data-size="${s}">${s}</button>`).join('')}
    </div>
    <div class="modal-cta">
      <button class="btn btn-whatsapp" id="enquireBtn"><i class="fa-brands fa-whatsapp"></i> Enquire</button>
      <a href="tel:+${WA_NUMBER}" class="btn btn-outline"><i class="fa-solid fa-phone"></i> Call Now</a>
      <button class="btn btn-wish ${on ? 'wished' : ''}" data-wish="${p.id}" aria-label="Wishlist"><i class="${on ? 'fa-solid' : 'fa-regular'} fa-heart"></i></button>
    </div>
    <p class="modal-note"><i class="fa-solid fa-shield-halved"></i> Authentic · Hand-finished · Free alterations</p>`;

  $('#productModal').classList.add('open');
  $('#productModal .modal').scrollTop = 0;
  syncScrollLock();
}

function closeModal(id) {
  $('#' + id).classList.remove('open');
  if (id === 'infoModal') currentInfo = null;
  syncScrollLock();
}

/* ============== INFO MODAL ============== */
let currentInfo = null;
const infoContent = {
  shipping: `
    <h3>Shipping</h3>
    <ul>
      <li>Free shipping across India on all orders.</li>
      <li>Insured delivery in 5–7 working days.</li>
      <li>Custom-stitched pieces need 3–5 extra days before dispatch.</li>
      <li>Tracking details are shared on WhatsApp once your order ships.</li>
    </ul>
    <a class="btn btn-whatsapp" target="_blank" rel="noopener" href="${waLink('Hello NIDIVA, I have a question about shipping.')}"><i class="fa-brands fa-whatsapp"></i> Ask about shipping</a>`,
  returns: `
    <h3>Returns &amp; Exchange</h3>
    <ul>
      <li>Exchange within 7 days of delivery for unworn pieces with tags intact.</li>
      <li>Custom-stitched and altered pieces cannot be returned.</li>
      <li>Send photos on WhatsApp so we can arrange a pickup or exchange.</li>
    </ul>
    <a class="btn btn-whatsapp" target="_blank" rel="noopener" href="${waLink('Hello NIDIVA, I would like to exchange an item.')}"><i class="fa-brands fa-whatsapp"></i> Start an exchange</a>`,
  size: `
    <h3>Size Guide</h3>
    <p>Garment measurements in inches. For a custom fit, share your measurements on WhatsApp.</p>
    <table>
      <tr><th>Size</th><th>Bust</th><th>Waist</th><th>Hip</th></tr>
      <tr><td>XS</td><td>32</td><td>26</td><td>34</td></tr>
      <tr><td>S</td><td>34</td><td>28</td><td>36</td></tr>
      <tr><td>M</td><td>36</td><td>30</td><td>38</td></tr>
      <tr><td>L</td><td>38</td><td>32</td><td>40</td></tr>
      <tr><td>XL</td><td>40</td><td>34</td><td>42</td></tr>
      <tr><td>XXL</td><td>42</td><td>36</td><td>44</td></tr>
      <tr><td>3XL</td><td>44</td><td>38</td><td>46</td></tr>
    </table>
    <a class="btn btn-whatsapp" target="_blank" rel="noopener" href="${waLink('Hello NIDIVA, I need help choosing a size.')}"><i class="fa-brands fa-whatsapp"></i> Get sizing help</a>`,
  care: `
    <h3>Care Instructions</h3>
    <ul>
      <li>Dry clean embroidered, silk, organza and net pieces.</li>
      <li>Cotton and maslin: gentle hand wash in cold water with mild detergent.</li>
      <li>Dry in shade; direct sun fades colours.</li>
      <li>Iron on the reverse side at low heat; never iron directly over embroidery.</li>
      <li>Store in a muslin cloth bag, away from moisture.</li>
    </ul>`
};

function wishlistHTML() {
  const items = [...wishlist].map(byId).filter(Boolean);
  if (!items.length) {
    return `<h3>Your Wishlist</h3><p>You haven't saved anything yet. Tap the heart on any piece to keep it here.</p><button class="btn btn-primary" data-action="browse">Browse the catalogue</button>`;
  }
  return `<h3>Your Wishlist</h3>
    <ul class="wish-list">${items.map(p => `
      <li class="wish-item" data-open="${p.id}">
        <img src="${photo(p.main, 200)}" alt="${p.name}">
        <div><strong>${p.name}</strong><span>${rupee(p.price)} · ${catLabels[p.cat]}</span></div>
        <button data-unwish="${p.id}" aria-label="Remove ${p.name}"><i class="fa-solid fa-xmark"></i></button>
      </li>`).join('')}</ul>
    <a class="btn btn-whatsapp" target="_blank" rel="noopener" href="${waLink('Hello NIDIVA, I am interested in these pieces:\n' + items.map(p => `- ${p.name} (${rupee(p.price)})`).join('\n'))}"><i class="fa-brands fa-whatsapp"></i> Enquire about all</a>`;
}

function openInfo(key) {
  const html = key === 'wishlist' ? wishlistHTML() : infoContent[key];
  if (!html) return;
  closeMenu();
  currentInfo = key;
  $('#infoBody').innerHTML = html;
  $('#infoModal').classList.add('open');
  syncScrollLock();
}
function closeInfo() { closeModal('infoModal'); }

/* ============== SEARCH ============== */
function openSearch() {
  closeMenu();
  $('#searchOverlay').classList.add('open');
  $('#searchInput').focus();
  liveSearch('');
  syncScrollLock();
}
function closeSearch() {
  $('#searchOverlay').classList.remove('open');
  $('#searchInput').value = '';
  $('#searchSuggest').innerHTML = '';
  syncScrollLock();
}
function liveSearch(q) {
  const sug = $('#searchSuggest');
  q = q.trim();
  if (!q) {
    sug.innerHTML = `<h5>Popular searches</h5><ul>${['Anarkali', 'Punjabi', 'Patiala', 'Kurti', 'Cotton', 'Silk', 'Bridal'].map(t => `<li data-search="${t}">${t}</li>`).join('')}</ul>`;
    return;
  }
  const lq = q.toLowerCase();
  const results = products.filter(p =>
    [p.name, catLabels[p.cat], p.fabric, p.design].some(s => s.toLowerCase().includes(lq)));
  if (!results.length) {
    sug.innerHTML = '<h5>No matches found</h5><p style="color:var(--gold-light)">Try “suit”, “cotton” or “dupatta”.</p>';
    return;
  }
  sug.innerHTML = `<h5>${results.length} match${results.length > 1 ? 'es' : ''} found</h5><ul>` +
    results.slice(0, 6).map(p => `<li data-open="${p.id}">${p.name} <small>· ${catLabels[p.cat]} · ${rupee(p.price)}</small></li>`).join('') +
    `</ul><button class="see-all" data-search-all="${q.replace(/"/g, '&quot;')}">See all results in catalogue</button>`;
}

/* ============== NAV ============== */
function openMenu() {
  $('#navLinks').classList.add('open');
  $('#navBackdrop').classList.add('open');
  syncScrollLock();
}
function closeMenu() {
  $('#navLinks').classList.remove('open');
  $('#navBackdrop').classList.remove('open');
  syncScrollLock();
}

/* ============== CLICK HANDLING (event delegation) ============== */
document.addEventListener('click', e => {
  const t = e.target;
  let el;

  if ((el = t.closest('[data-unwish]'))) { e.stopPropagation(); toggleWish(+el.dataset.unwish); return; }
  if ((el = t.closest('[data-wish]'))) { e.stopPropagation(); toggleWish(+el.dataset.wish); return; }
  if ((el = t.closest('[data-open]'))) { openProduct(+el.dataset.open); return; }

  if ((el = t.closest('[data-thumb]'))) { setPhoto(+el.dataset.thumb); return; }
  if ((el = t.closest('[data-color]'))) {
    current.color = +el.dataset.color;
    $$('.color-dot').forEach(d => d.classList.toggle('active', d === el));
    $('#colorName').textContent = current.product.colors[current.color][0];
    return;
  }
  if ((el = t.closest('[data-size]'))) {
    current.size = el.dataset.size;
    $$('.size-pill').forEach(d => d.classList.toggle('active', d === el));
    $('#sizeName').textContent = current.size;
    return;
  }
  if (t.closest('#enquireBtn')) { window.open(waLink(enquiryMessage()), '_blank', 'noopener'); return; }
  if (t.closest('#galPrev')) { setPhoto(current.photoIndex - 1); return; }
  if (t.closest('#galNext')) { setPhoto(current.photoIndex + 1); return; }

  if ((el = t.closest('[data-close]'))) { closeModal(el.dataset.close); return; }
  if (t.classList.contains('modal-overlay')) { closeModal(t.id); return; }

  if ((el = t.closest('[data-filter]'))) { applyCategory(el.dataset.filter); return; }
  if ((el = t.closest('[data-cat]'))) { e.preventDefault(); applyCategory(el.dataset.cat); return; }
  if ((el = t.closest('[data-fabric]'))) { applyFabric(el.dataset.fabric); return; }

  if ((el = t.closest('[data-info]'))) { e.preventDefault(); openInfo(el.dataset.info); return; }
  if (t.closest('[data-action="browse"]')) { closeInfo(); scrollToCatalogue(); return; }

  if ((el = t.closest('[data-search]'))) { $('#searchInput').value = el.dataset.search; liveSearch(el.dataset.search); return; }
  if ((el = t.closest('[data-search-all]'))) { const q = el.dataset.searchAll; closeSearch(); applySearch(q); return; }

  if ((el = t.closest('[data-interest]'))) {
    $('#cInterest').value = el.dataset.interest;
    setTimeout(() => $('#cMessage').focus({ preventScroll: true }), 600);
    return;
  }

  if (t.closest('#loadMore')) { state.visible += PAGE_SIZE; renderCatalogue(); return; }
  if (t.closest('#searchOpen')) { openSearch(); return; }
  if (t.closest('#searchClose')) { closeSearch(); return; }
  if (t.closest('#wishBtn')) { openInfo('wishlist'); return; }
  if (t.closest('#menuBtn')) { openMenu(); return; }
  if (t.closest('#navClose') || t.closest('#navBackdrop')) { closeMenu(); return; }
  if (t.closest('#navLinks a')) { closeMenu(); return; }
});

// Keyboard support for card-like elements
document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.product-card, .cat-card, .fabric-card')) {
    e.preventDefault();
    e.target.click();
  }
  if (e.key === 'Escape') {
    closeModal('productModal');
    closeInfo();
    closeSearch();
    closeMenu();
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openSearch();
  }
  if ($('#productModal').classList.contains('open') && current) {
    if (e.key === 'ArrowLeft') setPhoto(current.photoIndex - 1);
    if (e.key === 'ArrowRight') setPhoto(current.photoIndex + 1);
  }
});

$('#searchInput').addEventListener('input', e => liveSearch(e.target.value));
$('#searchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.value.trim()) {
    const q = e.target.value.trim();
    closeSearch();
    applySearch(q);
  }
});

/* ============== FORMS ============== */
$('#contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target;
  const lines = [
    'Hello NIDIVA, I would like to enquire.',
    `Name: ${f.name.value.trim()}`,
    `Phone: ${f.phone.value.trim()}`
  ];
  if (f.email.value.trim()) lines.push(`Email: ${f.email.value.trim()}`);
  if (f.interest.value) lines.push(`Interested in: ${f.interest.value}`);
  if (f.message.value.trim()) lines.push(`Message: ${f.message.value.trim()}`);
  window.open(waLink(lines.join('\n')), '_blank', 'noopener');
  toast('Opening WhatsApp with your enquiry');
  f.reset();
});

$('#newsletterForm').addEventListener('submit', e => {
  e.preventDefault();
  toast('Thank you for subscribing to NIDIVA updates');
  e.target.reset();
});

/* ============== IMAGE FALLBACK ============== */
const FALLBACK_IMG = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800"><rect width="100%" height="100%" fill="#E8DFCE"/><text x="50%" y="50%" fill="#5B1A1F" font-family="serif" font-size="48" text-anchor="middle" letter-spacing="8">NIDIVA</text></svg>');
document.addEventListener('error', e => {
  const img = e.target;
  if (img.tagName === 'IMG' && !img.dataset.fallback) {
    img.dataset.fallback = '1';
    img.src = FALLBACK_IMG;
  }
}, true);

/* ============== SCROLL EFFECTS ============== */
const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
      });
    }, { threshold: 0.05 })
  : null;
$$('.fade-in').forEach(el => revealObserver ? revealObserver.observe(el) : el.classList.add('visible'));

const navSections = ['home', 'catalogue', 'categories', 'fabrics', 'about', 'contact'];
window.addEventListener('scroll', () => {
  let current = 'home', best = -1;
  navSections.forEach(id => {
    const sec = document.getElementById(id);
    if (!sec) return;
    const top = sec.offsetTop;
    if (window.scrollY >= top - 150 && top > best) { best = top; current = id; }
  });
  $$('.nav-links a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
}, { passive: true });

/* ============== INIT ============== */
renderCatalogue();
renderInto('newGrid', products.filter(p => p.tag === 'new'));
updateWishUI();
