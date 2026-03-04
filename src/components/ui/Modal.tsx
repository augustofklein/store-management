import React from "react";

type ModalProps = {
  open: boolean;
  title?: string;
  onClose?: () => void;
  disableBackdropClick?: boolean;
  children?: React.ReactNode;
  className?: string;
};

const Modal: React.FC<ModalProps> = ({
  open,
  title,
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
        {(title || onClose) && (
          <div className="mb-4 flex items-start justify-between">
            {title ? (
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </h2>
            ) : (
              <div />
            )}
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="text-3xl leading-none text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
              >
                ×
              </button>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
