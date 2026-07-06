/*
  Hyperloop Awakening — MVP client-side app
  All numbers are illustrative. Wire to real chain data at production.
*/

// ---------- Mock market data ----------
const MARKETS = [
  {
    id: "btc-usdc-90d-100k",
    collateral: "BTC",
    loan: "USDC",
    spot: 108_240,
    strike: 100_000,
    ltv: 92.4,
    rate: 28.4,
    tenor: 90,
    maturity: "2026-10-01",
    daysToMaturity: 91,
    totalCredit: 42_800_000,
    availableCredit: 8_500_000,
    utilization: 80.1,
    patSrc: "deribit",
    patCoverage: 100.3,
    bestOffers: [
      { rate: 28.4, size: 3_500_000, patSrc: "deribit", price: 0.935 },
      { rate: 29.1, size: 2_200_000, patSrc: "derive",  price: 0.933 },
      { rate: 30.5, size: 1_800_000, patSrc: "internal", price: 0.928 },
      { rate: 32.0, size:   950_000, patSrc: "deribit", price: 0.923 },
    ],
    putPremiumAnnualized: 22.5,
  },
  {
    id: "btc-usdc-90d-80k",
    collateral: "BTC",
    loan: "USDC",
    spot: 108_240,
    strike: 80_000,
    ltv: 73.9,
    rate: 14.2,
    tenor: 90,
    maturity: "2026-10-01",
    daysToMaturity: 91,
    totalCredit: 28_400_000,
    availableCredit: 12_100_000,
    utilization: 57.4,
    patSrc: "deribit",
    patCoverage: 100.5,
    bestOffers: [
      { rate: 14.2, size: 5_200_000, patSrc: "deribit", price: 0.965 },
      { rate: 15.0, size: 3_700_000, patSrc: "derive",  price: 0.963 },
      { rate: 16.4, size: 2_100_000, patSrc: "internal", price: 0.959 },
    ],
    putPremiumAnnualized: 10.1,
  },
  {
    id: "btc-usdc-30d-105k",
    collateral: "BTC",
    loan: "USDC",
    spot: 108_240,
    strike: 105_000,
    ltv: 97.0,
    rate: 34.8,
    tenor: 30,
    maturity: "2026-08-01",
    daysToMaturity: 30,
    totalCredit: 12_100_000,
    availableCredit: 2_400_000,
    utilization: 80.2,
    patSrc: "derive",
    patCoverage: 100.1,
    bestOffers: [
      { rate: 34.8, size: 1_800_000, patSrc: "derive",  price: 0.972 },
      { rate: 36.2, size:   600_000, patSrc: "deribit", price: 0.971 },
    ],
    putPremiumAnnualized: 28.0,
  },
  {
    id: "eth-usdc-60d-3500",
    collateral: "ETH",
    loan: "USDC",
    spot: 3_820,
    strike: 3_500,
    ltv: 91.6,
    rate: 22.1,
    tenor: 60,
    maturity: "2026-09-01",
    daysToMaturity: 61,
    totalCredit: 18_500_000,
    availableCredit: 6_200_000,
    utilization: 66.5,
    patSrc: "derive",
    patCoverage: 100.4,
    bestOffers: [
      { rate: 22.1, size: 4_000_000, patSrc: "derive",  price: 0.964 },
      { rate: 23.8, size: 2_100_000, patSrc: "deribit", price: 0.961 },
    ],
    putPremiumAnnualized: 16.0,
  },
  {
    id: "eth-usdc-60d-3000",
    collateral: "ETH",
    loan: "USDC",
    spot: 3_820,
    strike: 3_000,
    ltv: 78.5,
    rate: 12.5,
    tenor: 60,
    maturity: "2026-09-01",
    daysToMaturity: 61,
    totalCredit: 24_100_000,
    availableCredit: 9_800_000,
    utilization: 59.3,
    patSrc: "internal",
    patCoverage: 100.2,
    bestOffers: [
      { rate: 12.5, size: 6_000_000, patSrc: "internal", price: 0.980 },
      { rate: 13.2, size: 3_800_000, patSrc: "derive",   price: 0.979 },
    ],
    putPremiumAnnualized: 7.3,
  },
  {
    id: "ada-usdc-30d-0.65",
    collateral: "ADA",
    loan: "USDC",
    spot: 0.71,
    strike: 0.65,
    ltv: 91.5,
    rate: 18.6,
    tenor: 30,
    maturity: "2026-08-01",
    daysToMaturity: 30,
    totalCredit: 2_400_000,
    availableCredit: 1_100_000,
    utilization: 54.2,
    patSrc: "internal",
    patCoverage: 100.6,
    bestOffers: [
      { rate: 18.6, size: 600_000, patSrc: "internal", price: 0.985 },
      { rate: 20.1, size: 400_000, patSrc: "derive",   price: 0.983 },
    ],
    putPremiumAnnualized: 14.2,
  },
  {
    id: "ada-usdc-90d-0.55",
    collateral: "ADA",
    loan: "USDC",
    spot: 0.71,
    strike: 0.55,
    ltv: 77.5,
    rate: 11.2,
    tenor: 90,
    maturity: "2026-10-01",
    daysToMaturity: 91,
    totalCredit: 1_100_000,
    availableCredit: 800_000,
    utilization: 27.3,
    patSrc: "internal",
    patCoverage: 100.4,
    bestOffers: [
      { rate: 11.2, size: 400_000, patSrc: "internal", price: 0.972 },
    ],
    putPremiumAnnualized: 6.8,
  },
];

// ---------- Mock maker offers ----------
const MAKER_OFFERS = [
  { market: "BTC/USDC · 90d · K=$100k", rate: 28.4, size: "500,000 USDC" },
  { market: "ETH/USDC · 60d · K=$3,500", rate: 22.1, size: "300,000 USDC" },
  { market: "BTC/USDC · 30d · K=$105k", rate: 34.8, size: "180,000 USDC" },
];

// ---------- Utility ----------
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function fmtUsd(n, decimals = 0) {
  if (n >= 1e9) return "$" + (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M";
  if (n >= 1e3) return "$" + (n / 1e3).toFixed(1) + "K";
  return "$" + n.toLocaleString(undefined, { maximumFractionDigits: decimals });
}
function fmtNumber(n, decimals = 0) {
  return n.toLocaleString(undefined, { maximumFractionDigits: decimals });
}
function fmtPct(n, decimals = 1) {
  return n.toFixed(decimals) + " %";
}
function fmtDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// ---------- State ----------
const state = {
  activeTab: "markets",
  filter: "all",
  search: "",
  detailMarketId: null,
  txMode: null,       // "borrow" | "lend"
  txMarketId: null,
  positions: {
    borrows: [
      { marketId: "btc-usdc-90d-100k", collateral: 0.5, debt: 50_000, daysLeft: 42 },
    ],
    credit: [
      { marketId: "eth-usdc-60d-3000", size: 100_000, rate: 12.5, daysLeft: 25 },
    ],
  },
  wallet: null,
};

// ---------- Tabs ----------
function switchTab(name) {
  state.activeTab = name;
  $$(".tab-panel").forEach((el) => el.classList.toggle("tab-panel-active", el.dataset.panel === name));
  $$(".nav-link").forEach((el) => el.classList.toggle("nav-link-active", el.dataset.tab === name));
  renderPositions();
}
$$(".nav-link").forEach((el) => {
  el.addEventListener("click", () => switchTab(el.dataset.tab));
});

// ---------- Filters ----------
$$(".filter-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    $$(".filter-chip").forEach((c) => c.classList.remove("filter-chip-active"));
    chip.classList.add("filter-chip-active");
    state.filter = chip.dataset.filter;
    renderMarkets();
  });
});
$("#marketSearch").addEventListener("input", (e) => {
  state.search = e.target.value.trim().toLowerCase();
  renderMarkets();
});

// ---------- Wallet ----------
$("#btnWallet").addEventListener("click", () => {
  if (state.wallet) return;
  state.wallet = "addr1q..." + Math.random().toString(36).slice(2, 6);
  const short = state.wallet.slice(0, 8) + "…" + state.wallet.slice(-4);
  $("#walletStatus").textContent = short;
});

// ---------- Markets list ----------
function renderMarkets() {
  const list = $("#marketsList");
  const filtered = MARKETS.filter((m) => {
    const f = state.filter === "all" || m.collateral === state.filter;
    const s = !state.search || (m.collateral + " " + m.loan).toLowerCase().includes(state.search);
    return f && s;
  });
  list.innerHTML = filtered.map((m) => marketRow(m)).join("");
  $$(".market-row", list).forEach((row) => {
    row.addEventListener("click", () => openMarketDetail(row.dataset.marketId));
  });
}

function tokenIcon(sym, cls = "") {
  const src = `assets/tokens/${sym.toLowerCase()}.svg`;
  return `<img src="${src}" alt="${sym}" class="token-icon token-${sym} ${cls}" />`;
}

function patSrcBadge(src) {
  const labels = { deribit: "Deribit", derive: "Derive", internal: "Internal" };
  return `<span class="pat-src-badge pat-src-${src}"><span class="pat-src-dot"></span>${labels[src]}</span>`;
}

function marketRow(m) {
  return `
  <div class="market-row" data-market-id="${m.id}">
    <div class="market-cell market-pair">
      <div class="token-stack">
        ${tokenIcon(m.collateral, "token-icon-a")}
        ${tokenIcon(m.loan, "token-icon-b")}
      </div>
      <div class="market-name">
        <div class="market-pair-label">${m.collateral} / ${m.loan}</div>
        <div class="market-tenor">${m.tenor}d · ${fmtDate(m.maturity)}</div>
      </div>
    </div>
    <div class="market-cell market-cell-num">${fmtUsd(m.strike)}</div>
    <div class="market-cell market-cell-num"><span class="rate-badge">${m.rate.toFixed(1)} %</span></div>
    <div class="market-cell maturity-cell">
      <div class="maturity-date">${fmtDate(m.maturity)}</div>
      <div class="maturity-days">${m.daysToMaturity} days</div>
    </div>
    <div class="market-cell market-cell-num">${fmtUsd(m.totalCredit)}</div>
    <div class="market-cell market-cell-num">${fmtUsd(m.availableCredit)}</div>
    <div class="market-cell market-cell-num">${patSrcBadge(m.patSrc)}</div>
    <div class="market-cell th-action">
      <button class="btn-row">Details</button>
    </div>
  </div>`;
}

// ---------- Market detail slide-over ----------
function openMarketDetail(id) {
  const m = MARKETS.find((x) => x.id === id);
  if (!m) return;
  state.detailMarketId = id;
  $("#marketDetailBody").innerHTML = marketDetailHtml(m);
  $("#marketDetail").classList.add("open");
  document.body.style.overflow = "hidden";

  bindPayoffSlider(m);
  $$(".offer-take").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openTxModal("borrow", m.id, +btn.dataset.rate);
    });
  });
  $$("[data-md-action]").forEach((btn) => {
    btn.addEventListener("click", () => openTxModal(btn.dataset.mdAction, m.id));
  });
}
function closeMarketDetail() {
  $("#marketDetail").classList.remove("open");
  document.body.style.overflow = "";
}

function marketDetailHtml(m) {
  const spotDiscount = ((m.strike / m.spot - 1) * 100).toFixed(1);
  const strikeVsSpot = m.strike >= m.spot
    ? `+${spotDiscount}% above spot`
    : `${spotDiscount}% below spot`;

  const patCovClass = m.patCoverage >= 100 ? "positive" : "";

  const now = new Date();
  const fillTs = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);
  const matTs = new Date(m.maturity);

  return `
    <div class="md-head">
      <div class="market-pair">
        <div class="token-stack">
          ${tokenIcon(m.collateral, "token-icon-a")}
          ${tokenIcon(m.loan, "token-icon-b")}
        </div>
        <div>
          <div class="md-title">${m.collateral} / ${m.loan}</div>
          <div class="md-meta">${m.id}</div>
        </div>
      </div>
    </div>

    <div class="md-stats">
      <div class="md-stat">
        <div class="md-stat-label">STRIKE K</div>
        <div class="md-stat-value">${fmtUsd(m.strike)}</div>
        <div class="md-stat-sub">${strikeVsSpot}</div>
      </div>
      <div class="md-stat">
        <div class="md-stat-label">FIXED RATE</div>
        <div class="md-stat-value">${m.rate.toFixed(1)} %</div>
        <div class="md-stat-sub">put premium: ${m.putPremiumAnnualized.toFixed(1)} %</div>
      </div>
      <div class="md-stat">
        <div class="md-stat-label">MATURITY</div>
        <div class="md-stat-value">${fmtDate(m.maturity)}</div>
        <div class="md-stat-sub">${m.daysToMaturity} days from now</div>
      </div>
      <div class="md-stat">
        <div class="md-stat-label">PAT COVERAGE</div>
        <div class="md-stat-value ${patCovClass}" style="color: var(--success)">${m.patCoverage.toFixed(1)} %</div>
        <div class="md-stat-sub">source: ${m.patSrc}</div>
      </div>
    </div>

    <div class="md-section-title">Lender Payoff at Maturity</div>
    <div class="payoff-wrap">
      <div class="payoff-chart" id="payoffChart"></div>
      <div class="payoff-slider-row">
        <div class="payoff-slider-label">S at T_M</div>
        <input type="range" class="payoff-slider" id="payoffSlider"
               min="${Math.round(m.spot * 0.4)}" max="${Math.round(m.spot * 1.6)}"
               step="${Math.max(1, Math.round(m.spot * 0.005))}" value="${Math.round(m.spot)}" />
        <div class="payoff-readout" id="payoffReadout">— · —</div>
      </div>
    </div>

    <div class="md-section-title">Best Offers</div>
    <div class="offers-list">
      <div class="offer-row offer-row-head">
        <div>Rate (APR)</div>
        <div style="text-align:right">Size Available</div>
        <div style="text-align:right">PAT Source</div>
        <div></div>
      </div>
      ${m.bestOffers.map((o, i) => `
        <div class="offer-row">
          <div class="offer-rate">${o.rate.toFixed(1)} %</div>
          <div style="text-align:right;color:var(--text-mid)">${fmtUsd(o.size)}</div>
          <div style="text-align:right">${patSrcBadge(o.patSrc)}</div>
          <div style="text-align:right"><button class="offer-take" data-rate="${o.rate}">Take</button></div>
        </div>
      `).join("")}
    </div>

    <div class="md-section-title">PAT Inventory Backing This Market</div>
    <div class="pat-panel">
      <div class="pat-source-line">
        ${patSrcBadge(m.patSrc)}
        <div>
          <strong>${m.patSrc === "deribit" ? "Deribit · attested via Coinbase Custody"
                       : m.patSrc === "derive" ? "Derive protocol positions"
                       : "Awakening internal writer pool"}</strong>
          <span> · put @ K=${fmtUsd(m.strike)} · expiry ${fmtDate(m.maturity)}</span>
        </div>
      </div>
      <div>
        <div class="pat-cover-label">COVERAGE</div>
        <div class="pat-cover-num">${m.patCoverage.toFixed(1)} %</div>
      </div>
      <div>
        <div class="pat-cover-label">CONTESTED</div>
        <div class="pat-cover-num" style="color:var(--text-mid)">0</div>
      </div>
    </div>

    <div class="md-section-title">Settlement Timeline</div>
    <div class="timeline">
      <div class="timeline-step">
        <div class="timeline-num">01</div>
        <div class="timeline-label">Market Created</div>
        <div class="timeline-when">${fmtDate(new Date(fillTs.getTime() - 10 * 86400000).toISOString())}</div>
      </div>
      <div class="timeline-step timeline-step-active">
        <div class="timeline-num">02 · ACTIVE</div>
        <div class="timeline-label">Loan Term</div>
        <div class="timeline-when">no health checks · no liquidations</div>
      </div>
      <div class="timeline-step">
        <div class="timeline-num">03</div>
        <div class="timeline-label">Oracle Read at T_M</div>
        <div class="timeline-when">${fmtDate(m.maturity)}</div>
      </div>
      <div class="timeline-step">
        <div class="timeline-num">04</div>
        <div class="timeline-label">Repay Window · 24h</div>
        <div class="timeline-when">closes ${fmtDate(new Date(matTs.getTime() + 86400000).toISOString())}</div>
      </div>
    </div>

    <div class="md-actions">
      <button class="btn-secondary" data-md-action="lend">Lend · Buy Credit</button>
      <button class="btn-primary" data-md-action="borrow">Borrow · Post Collateral</button>
    </div>
  `;
}

// ---------- Payoff chart (SVG) ----------
function bindPayoffSlider(m) {
  const slider = $("#payoffSlider");
  const readout = $("#payoffReadout");
  const svg = renderPayoffSVG(m, +slider.value);
  $("#payoffChart").innerHTML = svg;
  updateReadout(m, +slider.value);

  slider.addEventListener("input", () => {
    const S = +slider.value;
    $("#payoffChart").innerHTML = renderPayoffSVG(m, S);
    updateReadout(m, S);
  });

  function updateReadout(m, S) {
    const put = Math.max(m.strike - S, 0);
    const collat = Math.min(S, m.strike);
    const lender = collat + put;
    readout.innerHTML =
      `<span style="color:var(--text-mute)">S=</span> ${fmtUsd(S)}` +
      ` &nbsp; <span style="color:var(--text-mute)">lender=</span> <span style="color:var(--success)">${fmtUsd(lender)}</span>`;
  }
}

function renderPayoffSVG(m, S) {
  const W = 640;
  const H = 220;
  const padL = 44, padR = 24, padT = 16, padB = 34;
  const xMin = m.spot * 0.4;
  const xMax = m.spot * 1.6;
  const yMax = m.strike * 1.3;

  const x = (v) => padL + ((v - xMin) / (xMax - xMin)) * (W - padL - padR);
  const y = (v) => padT + (1 - v / yMax) * (H - padT - padB);

  const collatPts = [];
  const putPts = [];
  const totalPts = [];
  for (let i = 0; i <= 100; i++) {
    const s = xMin + (i / 100) * (xMax - xMin);
    collatPts.push([x(s), y(Math.min(s, m.strike))]);
    putPts.push([x(s), y(Math.max(m.strike - s, 0))]);
    totalPts.push([x(s), y(Math.min(s, m.strike) + Math.max(m.strike - s, 0))]);
  }
  const toPath = (pts) => "M " + pts.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" L ");

  const put = Math.max(m.strike - S, 0);
  const collat = Math.min(S, m.strike);
  const total = collat + put;

  const gridY = [0, m.strike * 0.5, m.strike, m.strike * 1.2];
  const gridYSvg = gridY.map((g) => `
    <line x1="${padL}" y1="${y(g)}" x2="${W - padR}" y2="${y(g)}" stroke="rgba(147,0,228,0.08)" stroke-width="1"/>
    <text x="${padL - 6}" y="${y(g) + 3}" fill="rgba(155,138,174,0.6)" font-size="9" font-family="JetBrains Mono" text-anchor="end">${fmtUsd(g).replace("$", "")}</text>
  `).join("");

  const strikeMarker = `
    <line x1="${x(m.strike)}" y1="${padT}" x2="${x(m.strike)}" y2="${H - padB}" stroke="rgba(255,255,255,0.12)" stroke-dasharray="2 3" stroke-width="1"/>
    <text x="${x(m.strike)}" y="${padT + 12}" fill="var(--accent-sh)" font-size="10" font-family="JetBrains Mono" text-anchor="middle">K = ${fmtUsd(m.strike).replace("$", "")}</text>
  `;
  const spotMarker = `
    <line x1="${x(m.spot)}" y1="${H - padB}" x2="${x(m.spot)}" y2="${H - padB + 4}" stroke="rgba(155,138,174,0.4)"/>
    <text x="${x(m.spot)}" y="${H - padB + 14}" fill="rgba(155,138,174,0.6)" font-size="9" font-family="JetBrains Mono" text-anchor="middle">spot</text>
  `;
  const sMarker = `
    <line x1="${x(S)}" y1="${padT}" x2="${x(S)}" y2="${H - padB}" stroke="rgba(255,255,255,0.6)" stroke-width="1"/>
    <circle cx="${x(S)}" cy="${y(total)}" r="4.5" fill="var(--success)" stroke="white" stroke-width="1.5"/>
  `;

  return `
    <svg viewBox="0 0 ${W} ${H}" width="100%" preserveAspectRatio="none">
      <defs>
        <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="rgba(63,224,160,0.35)"/>
          <stop offset="1" stop-color="rgba(63,224,160,0)"/>
        </linearGradient>
      </defs>
      ${gridYSvg}
      ${strikeMarker}
      ${spotMarker}
      <path d="${toPath(totalPts)} L ${x(xMax)},${y(0)} L ${x(xMin)},${y(0)} Z"
            fill="url(#totalGrad)" opacity="0.6"/>
      <path d="${toPath(collatPts)}" fill="none" stroke="rgba(180,77,255,0.75)" stroke-width="1.8"/>
      <path d="${toPath(putPts)}" fill="none" stroke="rgba(245,184,75,0.85)" stroke-width="1.8"/>
      <path d="${toPath(totalPts)}" fill="none" stroke="var(--success)" stroke-width="2.4"/>
      ${sMarker}

      <!-- Legend -->
      <g transform="translate(${W - padR - 190}, ${padT + 4})">
        <rect width="185" height="52" rx="6" fill="rgba(4,6,12,0.7)" stroke="rgba(147,0,228,0.15)"/>
        <line x1="8" y1="14" x2="22" y2="14" stroke="var(--success)" stroke-width="2.4"/>
        <text x="28" y="17" fill="white" font-size="10" font-family="Inter">lender total = K</text>
        <line x1="8" y1="28" x2="22" y2="28" stroke="rgba(180,77,255,0.75)" stroke-width="1.8"/>
        <text x="28" y="31" fill="var(--text-mid)" font-size="10" font-family="Inter">collateral = min(S,K)</text>
        <line x1="8" y1="42" x2="22" y2="42" stroke="rgba(245,184,75,0.85)" stroke-width="1.8"/>
        <text x="28" y="45" fill="var(--text-mid)" font-size="10" font-family="Inter">put = max(K−S, 0)</text>
      </g>
    </svg>
  `;
}

// ---------- Tx modal ----------
function openTxModal(mode, marketId, rate) {
  const m = MARKETS.find((x) => x.id === marketId);
  if (!m) return;
  state.txMode = mode;
  state.txMarketId = marketId;
  const chosenRate = rate || m.rate;

  $("#txModalBody").innerHTML = txModalHtml(m, mode, chosenRate);
  $("#txModal").classList.add("open");
  bindTxInputs(m, mode, chosenRate);
}
function closeTxModal() {
  $("#txModal").classList.remove("open");
}

function txModalHtml(m, mode, rate) {
  const isBorrow = mode === "borrow";
  const title = isBorrow ? "Post Collateral · Borrow" : "Buy Credit · Lend";
  const subtitle = isBorrow
    ? `Post ${m.collateral}, receive ${m.loan} at fixed rate. Never liquidated during term.`
    : `Buy credit units at a discount, redeemed 1:1 for ${m.loan} at maturity.`;
  const inputToken = isBorrow ? m.collateral : m.loan;
  const inputPlaceholder = isBorrow ? "0.5" : "10,000";
  const inputSuffix = isBorrow ? m.collateral : m.loan;

  return `
    <div class="modal-title">${title}</div>
    <div class="modal-subtitle">${subtitle} · Market: ${m.collateral}/${m.loan} · K=${fmtUsd(m.strike)} · ${m.daysToMaturity}d</div>

    <div class="tx-input-group">
      <div class="tx-input-head">
        <span class="tx-input-label">${isBorrow ? "Collateral In" : "Funding In"}</span>
        <span class="tx-input-max">Balance: ${isBorrow ? (m.collateral === "BTC" ? "1.24 " : m.collateral === "ETH" ? "18.4 " : "42,180 ") + m.collateral : "50,000 " + m.loan} · Max</span>
      </div>
      <div class="tx-input-row">
        <input type="text" id="txAmount" value="${inputPlaceholder}" />
        <div class="tx-token-tag">${tokenIcon(inputSuffix)} ${inputSuffix}</div>
      </div>
    </div>

    <div class="tx-pat-chip">
      <span class="pat-src-dot" style="background: ${m.patSrc === 'deribit' ? '#F5B84B' : m.patSrc === 'derive' ? '#3FE0A0' : 'var(--accent-hi)'}"></span>
      <div>
        <strong>PAT attached:</strong> put @ K=${fmtUsd(m.strike)} · exp ${fmtDate(m.maturity)} · source ${m.patSrc}
      </div>
    </div>

    <div class="tx-preview" id="txPreview"></div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
      <button class="btn-secondary" onclick="closeTxModal()">Cancel</button>
      <button class="btn-primary" onclick="confirmTx()">${isBorrow ? "Post & Borrow" : "Buy Credit"}</button>
    </div>
  `;
}

function bindTxInputs(m, mode, rate) {
  const input = $("#txAmount");
  const preview = $("#txPreview");

  const update = () => {
    const raw = input.value.replace(/,/g, "");
    const amt = parseFloat(raw) || 0;
    preview.innerHTML = previewHtml(m, mode, rate, amt);
  };
  input.addEventListener("input", update);
  update();
}

function previewHtml(m, mode, rate, amt) {
  const price = 1 / (1 + rate / 100 * (m.daysToMaturity / 365));
  if (mode === "borrow") {
    const collatValue = amt * m.spot;
    const debtNotional = Math.min(collatValue, amt * m.strike);
    const proceeds = debtNotional * price;
    const cost = debtNotional - proceeds;
    return `
      <div class="tx-preview-row"><span class="tx-preview-label">Collateral posted</span><span class="tx-preview-value">${amt.toFixed(4)} ${m.collateral} · ${fmtUsd(collatValue)}</span></div>
      <div class="tx-preview-row"><span class="tx-preview-label">Debt notional</span><span class="tx-preview-value">${fmtUsd(debtNotional)}</span></div>
      <div class="tx-preview-row"><span class="tx-preview-label">Proceeds now</span><span class="tx-preview-value" style="color:var(--success)">${fmtUsd(proceeds)}</span></div>
      <div class="tx-preview-row"><span class="tx-preview-label">Discount price</span><span class="tx-preview-value">${price.toFixed(4)}</span></div>
      <div class="tx-preview-row"><span class="tx-preview-label">Fixed cost</span><span class="tx-preview-value">${fmtUsd(cost)} · ${rate.toFixed(1)} % APR</span></div>
      <div class="tx-preview-row"><span class="tx-preview-label">Liquidation risk during term</span><span class="tx-preview-value" style="color:var(--success)">None</span></div>
    `;
  } else {
    const creditUnits = amt / price;
    const redemption = creditUnits;  // 1 credit unit -> 1 loan token at T_M
    const yieldGained = redemption - amt;
    return `
      <div class="tx-preview-row"><span class="tx-preview-label">Funding in</span><span class="tx-preview-value">${fmtUsd(amt)}</span></div>
      <div class="tx-preview-row"><span class="tx-preview-label">Credit units received</span><span class="tx-preview-value">${fmtNumber(creditUnits, 2)}</span></div>
      <div class="tx-preview-row"><span class="tx-preview-label">Redemption at T_M</span><span class="tx-preview-value" style="color:var(--success)">${fmtUsd(redemption)}</span></div>
      <div class="tx-preview-row"><span class="tx-preview-label">Fixed yield</span><span class="tx-preview-value">${fmtUsd(yieldGained)} · ${rate.toFixed(1)} % APR</span></div>
      <div class="tx-preview-row"><span class="tx-preview-label">Downside protection</span><span class="tx-preview-value" style="color:var(--success)">Put @ K=${fmtUsd(m.strike)}</span></div>
    `;
  }
}

function confirmTx() {
  const amt = parseFloat($("#txAmount").value.replace(/,/g, "")) || 0;
  if (!amt) return;
  const m = MARKETS.find((x) => x.id === state.txMarketId);
  if (state.txMode === "borrow") {
    state.positions.borrows.push({
      marketId: m.id,
      collateral: amt,
      debt: amt * m.strike,
      daysLeft: m.daysToMaturity,
    });
  } else {
    state.positions.credit.push({
      marketId: m.id,
      size: amt,
      rate: m.rate,
      daysLeft: m.daysToMaturity,
    });
  }
  closeTxModal();
  closeMarketDetail();
  switchTab("positions");
}

// ---------- Positions ----------
function renderPositions() {
  const hasAny = state.positions.borrows.length + state.positions.credit.length > 0;
  $("#positionsEmpty").style.display = hasAny ? "none" : "block";
  $("#positionsContent").style.display = hasAny ? "block" : "none";

  $("#borrowsList").innerHTML = state.positions.borrows.map((p) => {
    const m = MARKETS.find((x) => x.id === p.marketId);
    if (!m) return "";
    return `
      <div class="position-card">
        <div class="market-pair">
          <div class="token-stack">
            ${tokenIcon(m.collateral, "token-icon-a")}
            ${tokenIcon(m.loan, "token-icon-b")}
          </div>
          <div class="market-name">
            <div class="market-pair-label">${m.collateral} / ${m.loan}</div>
            <div class="market-tenor">${m.tenor}d · K=${fmtUsd(m.strike)}</div>
          </div>
        </div>
        <div>
          <div class="pos-label">COLLATERAL</div>
          <div class="pos-value">${p.collateral} ${m.collateral}</div>
        </div>
        <div>
          <div class="pos-label">DEBT</div>
          <div class="pos-value">${fmtUsd(p.debt)}</div>
        </div>
        <div>
          <div class="pos-label">FIXED RATE</div>
          <div class="pos-value" style="color: var(--success)">${m.rate.toFixed(1)} %</div>
        </div>
        <div>
          <div class="pos-label">DAYS LEFT</div>
          <div class="pos-value">${p.daysLeft}</div>
        </div>
        <button class="btn-secondary" style="padding: 8px 16px; font-size: 12px;">Repay</button>
      </div>
    `;
  }).join("");

  $("#creditList").innerHTML = state.positions.credit.map((p) => {
    const m = MARKETS.find((x) => x.id === p.marketId);
    if (!m) return "";
    return `
      <div class="position-card">
        <div class="market-pair">
          <div class="token-stack">
            ${tokenIcon(m.collateral, "token-icon-a")}
            ${tokenIcon(m.loan, "token-icon-b")}
          </div>
          <div class="market-name">
            <div class="market-pair-label">${m.collateral} / ${m.loan}</div>
            <div class="market-tenor">${m.tenor}d · K=${fmtUsd(m.strike)}</div>
          </div>
        </div>
        <div>
          <div class="pos-label">CREDIT UNITS</div>
          <div class="pos-value">${fmtNumber(p.size, 0)}</div>
        </div>
        <div>
          <div class="pos-label">REDEMPTION</div>
          <div class="pos-value">${fmtUsd(p.size)}</div>
        </div>
        <div>
          <div class="pos-label">APR</div>
          <div class="pos-value" style="color: var(--success)">${p.rate.toFixed(1)} %</div>
        </div>
        <div>
          <div class="pos-label">DAYS LEFT</div>
          <div class="pos-value">${p.daysLeft}</div>
        </div>
        <button class="btn-secondary" style="padding: 8px 16px; font-size: 12px;">Exit Early</button>
      </div>
    `;
  }).join("");
}

// ---------- Maker offers ----------
function renderMakerOffers() {
  $("#makerOffers").innerHTML = MAKER_OFFERS.map((o) => `
    <div class="offer-mini-row">
      <div class="offer-mini-market">${o.market}</div>
      <div class="offer-mini-rate">${o.rate.toFixed(1)} %</div>
      <div class="offer-mini-size">${o.size}</div>
    </div>
  `).join("");
}

// Segmented (maker side)
$$(".segmented .seg").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.querySelectorAll(".seg").forEach((s) => s.classList.remove("seg-active"));
    btn.classList.add("seg-active");
  });
});

// PAT radio in maker
$$(".pat-radio input").forEach((r) => {
  r.addEventListener("change", () => {
    $$(".pat-radio").forEach((el) => el.classList.remove("pat-radio-active"));
    r.closest(".pat-radio").classList.add("pat-radio-active");
  });
});

// Maker implied rate re-compute
function computeImplied() {
  const priceEl = $("#makerPrice");
  const rateEl = $("#makerImpliedRate");
  const p = parseFloat(priceEl.value) || 0;
  if (p <= 0) { rateEl.textContent = "—"; return; }
  const tenor = 90;
  const rate = (1 / p - 1) * 365 / tenor;
  rateEl.textContent = (rate * 100).toFixed(1) + " %";
}
if ($("#makerPrice")) {
  $("#makerPrice").addEventListener("input", computeImplied);
}

// Expose for inline onclicks
window.switchTab = switchTab;
window.closeMarketDetail = closeMarketDetail;
window.closeTxModal = closeTxModal;
window.confirmTx = confirmTx;

// ---------- Init ----------
renderMarkets();
renderPositions();
renderMakerOffers();
