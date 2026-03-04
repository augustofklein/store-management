import React from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

type ConfirmDeleteProps = {
  open: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
};

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  open,
  title = "Confirm delete",
  message = "Are you sure you want to delete this item?",
  onCancel,
  onConfirm,
  loading = false,
}) => {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      disableBackdropClick={loading}
      title={title}
    >
      <p className="mb-4 text-sm">{message}</p>

      <div className="flex justify-end space-x-3">
        <Button variant="muted" onClick={onCancel} loading={loading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} loading={loading}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDelete;
