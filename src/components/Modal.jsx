import React from "react";

export default function Modal({
  open,
  onClose,
  onConfirm,
  title,
  body,
  confirmText,
  cancelText,
  isDanger,
}) {
  return (
    <div className={open ? "modal is-active" : "modal"}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card" style={{ maxWidth: 520 }}>
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">{body}</section>
        <footer className="modal-card-foot is-justify-content-end">
          <button
            className={isDanger ? "button is-danger" : "button is-primary"}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button className="button" onClick={onClose}>
            {cancelText}
          </button>
        </footer>
      </div>
    </div>
  );
}
