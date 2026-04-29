.zone {
  margin-bottom: 20px;
}

.header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
}

.icon { font-size: 15px; }

.label {
  font-size: 13px;
  font-weight: 600;
  color: #1a1a2e;
}

.required {
  color: #e53935;
  font-size: 13px;
}

.counter {
  margin-left: auto;
  font-size: 11px;
  color: #888;
  background: #f0f0f0;
  border-radius: 10px;
  padding: 1px 7px;
}

.dropArea {
  border: 1.5px dashed #c8d0e0;
  border-radius: 10px;
  padding: 14px;
  text-align: center;
  cursor: pointer;
  background: #fafbfd;
  transition: all 0.15s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #666;
}

.dropArea:hover {
  border-color: #1D9E75;
  background: #f0fdf8;
  color: #1D9E75;
}

.dragging {
  border-color: #1D9E75;
  background: #e8f8f2;
  color: #1D9E75;
}

.acceptHint {
  font-size: 11px;
  color: #aaa;
}

.fileList {
  list-style: none;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fileItem {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1px solid #e8ecf2;
  border-radius: 8px;
  padding: 7px 10px;
}

.fileName {
  flex: 1;
  font-size: 12px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.deleteBtn {
  background: none;
  border: none;
  cursor: pointer;
  color: #e53935;
  font-size: 11px;
  padding: 2px 5px;
  border-radius: 4px;
  flex-shrink: 0;
  transition: background 0.1s;
}

.deleteBtn:hover {
  background: #fdecea;
}
