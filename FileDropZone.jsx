.page {
  min-height: 100vh;
  background: #f5f6f8;
}

/* ── Header ── */
.header {
  background: linear-gradient(135deg, #0f6e56 0%, #1D9E75 100%);
  padding: 20px 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}

.headerInner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  width: 46px;
  height: 46px;
  background: rgba(255,255,255,0.15);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.title {
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 2px;
}

.subtitle {
  font-size: 13px;
  color: rgba(255,255,255,0.8);
}

/* ── Main ── */
.main {
  max-width: 1100px;
  margin: 0 auto;
  padding: 28px 24px 60px;
}

/* ── Upload Section ── */
.uploadSection {
  background: #fff;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  margin-bottom: 24px;
}

.uploadGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 20px;
  margin-bottom: 16px;
}

.uploadCard {
  background: #fafbfd;
  border: 1px solid #e8ecf2;
  border-radius: 10px;
  padding: 18px;
}

.cardTitle {
  font-size: 13px;
  font-weight: 600;
  color: #555;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
}

.infoBox {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f0fdf8;
  border: 1px solid #a7f3d0;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 13px;
  color: #065f46;
  margin-bottom: 16px;
}

.infoIcon {
  font-size: 14px;
  flex-shrink: 0;
  background: #1D9E75;
  color: #fff;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
  font-size: 11px;
}

.errorBox {
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 13px;
  color: #b91c1c;
  margin-bottom: 16px;
}

.actionRow {
  display: flex;
  gap: 12px;
}

.calcBtn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #1D9E75;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 12px 28px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  box-shadow: 0 2px 6px rgba(29,158,117,0.3);
}

.calcBtn:hover:not(:disabled) {
  background: #0f6e56;
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(29,158,117,0.35);
}

.calcBtn:active:not(:disabled) {
  transform: translateY(0);
}

.calcBtnDisabled {
  background: #d1d5db;
  color: #9ca3af;
  cursor: not-allowed;
  box-shadow: none;
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ── Results Section ── */
.resultsSection {
  background: #fff;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}

.resultsHeader {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 18px;
  flex-wrap: wrap;
  gap: 12px;
}

.resultsTitle {
  font-size: 17px;
  font-weight: 600;
  color: #1a1a2e;
}

.resultsSubtitle {
  font-size: 13px;
  color: #888;
  margin-top: 2px;
}

.exportBtn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: #fff;
  border: 1.5px solid #1D9E75;
  color: #1D9E75;
  border-radius: 8px;
  padding: 9px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.exportBtn:hover {
  background: #f0fdf8;
}

/* ── Search ── */
.searchRow {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.searchWrap {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 420px;
}

.searchWrap > svg {
  position: absolute;
  left: 11px;
}

.searchInput {
  width: 100%;
  padding: 9px 36px 9px 34px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
  background: #fafbfd;
  color: #1a1a2e;
  outline: none;
  transition: border 0.15s;
}

.searchInput:focus {
  border-color: #1D9E75;
  background: #fff;
}

.clearSearch {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: #aaa;
  font-size: 11px;
  padding: 2px;
}

.resultCount {
  font-size: 13px;
  color: #888;
  white-space: nowrap;
}

/* ── Table ── */
.tableWrap {
  overflow-x: auto;
  border-radius: 10px;
  border: 1px solid #e8ecf2;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.table thead tr {
  background: #f8fafc;
}

.thLeft, .thRight {
  padding: 10px 14px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: #6b7280;
  border-bottom: 1px solid #e8ecf2;
  white-space: nowrap;
}

.thLeft { text-align: left; }
.thRight { text-align: right; }

.tr {
  border-bottom: 1px solid #f1f3f7;
  transition: background 0.1s;
}

.tr:hover {
  background: #fafbfd;
}

.tr:last-child {
  border-bottom: none;
}

.tdName {
  padding: 10px 14px;
  font-weight: 500;
  color: #1a1a2e;
  min-width: 200px;
}

.tdNum {
  padding: 10px 14px;
  text-align: right;
  color: #555;
  white-space: nowrap;
}

.tdNote {
  padding: 10px 14px;
  min-width: 160px;
}

.badgeGreen {
  display: inline-block;
  background: #dcfce7;
  color: #166534;
  border-radius: 6px;
  padding: 2px 10px;
  font-weight: 600;
}

.badgeGray {
  display: inline-block;
  background: #f3f4f6;
  color: #6b7280;
  border-radius: 6px;
  padding: 2px 10px;
  font-weight: 600;
}

.noteTag {
  display: inline-block;
  background: #fffbeb;
  color: #92400e;
  border: 1px solid #fde68a;
  border-radius: 5px;
  padding: 2px 8px;
  font-size: 11px;
  line-height: 1.5;
}

.noResult {
  padding: 32px;
  text-align: center;
  color: #9ca3af;
  font-size: 14px;
}
