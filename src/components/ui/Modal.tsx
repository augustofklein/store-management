import React from "react";

type ModalProps = {
  open: boolean;
  onClose?: () => void;
  disableBackdropClick?: boolean;
  children?: React.ReactNode;
  className?: string;
};

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  disableBackdropClick = false,
  children,
  className = "",
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={disableBackdropClick ? undefined : onClose}
      />

      <div
        className={`relative bg-white dark:bg-gray-800 rounded-lg p-6 z-10 w-11/12 max-w-md shadow-lg ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
