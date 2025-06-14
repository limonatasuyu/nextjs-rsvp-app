import { useState, useCallback, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const modalContainerRef = useRef<HTMLElement | null>(null);

  // Create a div to render modal into if it doesn't exist
  useEffect(() => {
    let container = document.getElementById("modal-root");
    if (!container) {
      container = document.createElement("div");
      container.setAttribute("id", "modal-root");
      document.body.appendChild(container);
    }
    modalContainerRef.current = container;
  }, []);

  const openModal = useCallback((element: React.ReactNode, title?: string) => {
    setModalContent(element);
    setIsOpen(true);
    if (title) {
      setTitle(title);
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalContent(null);
  }, []);

  const ModalRenderer = () => {
    if (!isOpen || !modalContainerRef.current) return null;

    return ReactDOM.createPortal(
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        className="fixed inset-0 flex items-center justify-center z-40"
        onClick={closeModal}
      >
        <div
          style={{ background: "white", padding: "2rem", borderRadius: "8px" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full flex items-center justify-between">
            <h2 className="text-lg font-bold mb-4">{title}</h2>
            <button onClick={closeModal}>x</button>
          </div>
          {modalContent}
        </div>
      </div>,
      modalContainerRef.current
    );
  };

  return {
    openModal,
    closeModal,
    ModalRenderer,
    isOpen,
  };
}
