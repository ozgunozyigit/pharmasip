import { useRef, useState } from 'react';
import styles from './FileDropZone.module.css';

export default function FileDropZone({ label, accept, maxFiles, files, onAdd, onRemove, icon, required }) {
  const inputRef = useRef();
  const [drag, setDrag] = useState(false);

  const handleFiles = (fileList) => {
    const arr = Array.from(fileList).filter(f => {
      const name = f.name.toLowerCase();
      if (accept.includes('.pdf')) return name.endsWith('.pdf');
      return name.endsWith('.xls') || name.endsWith('.xlsx');
    });
    if (arr.length) onAdd(arr);
  };

  const remaining = maxFiles - files.length;

  return (
    <div className={styles.zone}>
      <div className={styles.header}>
        <span className={styles.icon}>{icon}</span>
        <span className={styles.label}>{label}</span>
        {required && <span className={styles.required}>*</span>}
        <span className={styles.counter}>{files.length}/{maxFiles}</span>
      </div>

      {remaining > 0 && (
        <div
          className={`${styles.dropArea} ${drag ? styles.dragging : ''}`}
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={e => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files); }}
          onClick={() => inputRef.current.click()}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <span>Sürükle & bırak veya tıkla</span>
          <span className={styles.acceptHint}>{accept.includes('.pdf') ? 'PDF' : 'XLS / XLSX'}</span>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={maxFiles > 1}
            style={{ display: 'none' }}
            onChange={e => { handleFiles(e.target.files); e.target.value = ''; }}
          />
        </div>
      )}

      {files.length > 0 && (
        <ul className={styles.fileList}>
          {files.map((f, i) => (
            <li key={i} className={styles.fileItem}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              <span className={styles.fileName}>{f.name}</span>
              <button className={styles.deleteBtn} onClick={() => onRemove(i)} title="Dosyayı sil">
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
