import React, { useEffect, useRef } from "react";
import "./modal.css";
import ReactDom from "react-dom";

function Modal({ isOpen, close, children, setURL }) {
  const contentRef = useRef();

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflowY = "hidden";
    function listner(event) {
      if (contentRef.current?.contains(event.target)) return;
      document.body.style.overflowY = "auto";
      if (setURL) {
        setURL("");
      }
      close();
    }

    window.addEventListener("click", listner);

    return () => {
      window.removeEventListener("click", listner);
    };
  }, [isOpen, close, setURL]);

  const crossHandler = () => {
    if (setURL) {
      setURL("");
    }
    close();
  };

  if (!isOpen) return null;

  return ReactDom.createPortal(
    <div className="modal">
      <div ref={contentRef} className="modal_content">
        <img onClick={crossHandler} alt="close" src="x.svg"></img>
        {children}
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default Modal;
