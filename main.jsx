// ── Türkçe normalize ──────────────────────────────────────────────────────────
export function normalizeTR(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '')
    .replace(/0/g, 'o');
}

// ── Levenshtein distance ──────────────────────────────────────────────────────
export function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (__, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
  return dp[m][n];
}

// ── Fuzzy match for search bar ────────────────────────────────────────────────
export function fuzzyMatch(query, target) {
  const q = normalizeTR(query);
  const t = normalizeTR(target);
  if (!q) return true;
  if (t.includes(q)) return true;
  const dist = levenshtein(q, t);
  return dist <= Math.max(1, Math.floor(q.length / 3));
}

// ── Match product name to standard PDF list ───────────────────────────────────
export function matchToStandard(name, standardList) {
  if (!standardList || standardList.length === 0) return name;
  const norm = normalizeTR(name);
  let best = null, bestScore = Infinity;

  for (const std of standardList) {
    const sn = normalizeTR(std);
    if (sn === norm) return std;
    if (sn.includes(norm) || norm.includes(sn)) {
      const score = Math.abs(sn.length - norm.length);
      if (score < bestScore) { bestScore = score; best = std; }
    }
  }
  if (best && bestScore <= 4) return best;

  for (const std of standardList) {
    const sn = normalizeTR(std);
    const dist = levenshtein(norm, sn);
    const threshold = Math.max(2, Math.floor(Math.min(norm.length, sn.length) * 0.3));
    if (dist < bestScore && dist <= threshold) { bestScore = dist; best = std; }
  }
  return best && bestScore <= Math.max(2, Math.floor(norm.length * 0.3)) ? best : name;
}

// ── Read XLS/XLSX with XLSX library ──────────────────────────────────────────
export async function readXls(file) {
  const XLSX = await import('xlsx');
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const wb = XLSX.read(e.target.result, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
        res(data);
      } catch (err) { rej(err); }
    };
    reader.onerror = rej;
    reader.readAsArrayBuffer(file);
  });
}

// ── Load PDF.js from CDN ──────────────────────────────────────────────────────
function loadPdfJs() {
  return new Promise((res, rej) => {
    if (window.pdfjsLib) return res(window.pdfjsLib);
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      res(window.pdfjsLib);
    };
    script.onerror = rej;
    document.head.appendChild(script);
  });
}

// ── Read PDF text ─────────────────────────────────────────────────────────────
export async function readPdf(file) {
  const pdfjsLib = await loadPdfJs();
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const pdf = await pdfjsLib.getDocument({ data: e.target.result }).promise;
        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map(it => it.str).join(' ') + '\n';
        }
        res(text);
      } catch (err) { rej(err); }
    };
    reader.onerror = rej;
    reader.readAsArrayBuffer(file);
  });
}

// ── Parse UBA rows (A=name, C=qty with possible x+y) ─────────────────────────
export function parseUba(rows) {
  const result = {};
  for (const row of rows) {
    const name = String(row[0] || '').trim();
    if (!name) continue;
    const lower = name.toLowerCase();
    if (lower.includes('urun') || lower.includes('adi') || lower.includes('ürün')) continue;

    const rawC = String(row[2] || '').trim();
    let qty = 0, bonus = 0;
    if (rawC.includes('+')) {
      const parts = rawC.split('+');
      qty = parseFloat(parts[0]) || 0;
      bonus = parseFloat(parts[1]) || 0;
    } else {
      qty = parseFloat(rawC) || 0;
    }

    if (!result[name]) result[name] = { total: 0, campaigns: [] };
    result[name].total += qty;
    if (bonus > 0) result[name].campaigns.push(`${qty}+${bonus}`);
  }
  return result;
}

// ── Parse UBS rows (A=name, B=qty) ───────────────────────────────────────────
export function parseUbs(rows) {
  const result = {};
  for (const row of rows) {
    const name = String(row[0] || '').trim();
    if (!name) continue;
    const lower = name.toLowerCase();
    if (lower.includes('urun') || lower.includes('adi') || lower.includes('ürün')) continue;

    const qty = parseFloat(String(row[1] || '').trim()) || 0;
    if (!result[name]) result[name] = 0;
    result[name] += qty;
  }
  return result;
}

// ── Parse Envanter rows (A=name, K=stock) ────────────────────────────────────
export function parseEnvanter(rows) {
  const result = {};
  for (const row of rows) {
    const name = String(row[0] || '').trim();
    if (!name) continue;
    const stock = parseFloat(String(row[10] || '').trim()) || 0;
    result[name] = stock;
  }
  return result;
}

// ── Extract standard names from PDF text ─────────────────────────────────────
export function extractStandardNames(pdfText) {
  return pdfText
    .split(/[\n\r]+/)
    .map(l => l.trim())
    .filter(l => l.length > 2 && l.length < 120);
}

// ── Find stock for a product with fuzzy fallback ──────────────────────────────
export function findStock(rawName, stdName, envanterMap) {
  const normRaw = normalizeTR(rawName);
  const normStd = normalizeTR(stdName);

  for (const [eName, eStock] of Object.entries(envanterMap)) {
    const ne = normalizeTR(eName);
    if (ne === normRaw || ne === normStd) return eStock;
  }

  let best = 0, bestDist = Infinity;
  for (const [eName, eStock] of Object.entries(envanterMap)) {
    const ne = normalizeTR(eName);
    const d = levenshtein(normRaw, ne);
    if (d < bestDist && d <= 3) { bestDist = d; best = eStock; }
  }
  return best;
}

// ── Run full calculation ──────────────────────────────────────────────────────
export async function runCalculation({ ubaFiles, ubsFiles, stokFile, pdfFile }) {
  let standardNames = [];
  if (pdfFile) {
    const pdfText = await readPdf(pdfFile);
    standardNames = extractStandardNames(pdfText);
  }

  const ubsMerged = {};
  for (const f of ubsFiles) {
    const rows = await readXls(f);
    const parsed = parseUbs(rows);
    for (const [name, qty] of Object.entries(parsed)) {
      ubsMerged[name] = (ubsMerged[name] || 0) + qty;
    }
  }

  const ubaMerged = {};
  for (const f of ubaFiles) {
    const rows = await readXls(f);
    const parsed = parseUba(rows);
    for (const [name, info] of Object.entries(parsed)) {
      if (!ubaMerged[name]) ubaMerged[name] = { total: 0, campaigns: [] };
      ubaMerged[name].total += info.total;
      ubaMerged[name].campaigns.push(...info.campaigns);
    }
  }

  const envanterRows = await readXls(stokFile);
  const envanterMap = parseEnvanter(envanterRows);

  const monthCount = ubsFiles.length || 3;
  const resultMap = {};

  for (const [rawName, totalSales] of Object.entries(ubsMerged)) {
    if (!rawName) continue;
    const stdName = matchToStandard(rawName, standardNames);
    const stock = findStock(rawName, stdName, envanterMap);

    let note = '';
    const normRaw = normalizeTR(rawName);
    for (const [uName, uInfo] of Object.entries(ubaMerged)) {
      if (normalizeTR(uName) === normRaw && uInfo.campaigns.length > 0) {
        note = 'Kampanyali alim gecmisi var: ' + uInfo.campaigns.join(', ');
        break;
      }
    }

    const key = stdName;
    if (!resultMap[key]) {
      resultMap[key] = { name: stdName, totalSales: 0, avgMonthly: 0, stock, orderQty: 0, note };
    }
    resultMap[key].totalSales += totalSales;
    resultMap[key].avgMonthly = resultMap[key].totalSales / monthCount;
    resultMap[key].orderQty = Math.max(0, Math.ceil(resultMap[key].avgMonthly + 4 - resultMap[key].stock));
    if (note && !resultMap[key].note) resultMap[key].note = note;
  }

  return Object.values(resultMap).sort((a, b) => a.name.localeCompare(b.name, 'tr'));
}

// ── Export to Excel ───────────────────────────────────────────────────────────
export async function exportToExcel(rows) {
  const XLSX = await import('xlsx');
  const wsData = [
    ['Urun Adi', 'Son 3 Ay Toplam Satis', 'Aylik Ort. Satis', 'Mevcut Stok', 'Onerilen Siparis Miktari', 'Not'],
    ...rows.map(r => [r.name, r.totalSales, +r.avgMonthly.toFixed(2), r.stock, r.orderQty, r.note])
  ];
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  ws['!cols'] = [{ wch: 40 }, { wch: 22 }, { wch: 18 }, { wch: 14 }, { wch: 24 }, { wch: 50 }];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Siparis Listesi');
  XLSX.writeFile(wb, 'eczane_siparis_listesi.xlsx');
}
