import { toast } from "react-toastify";

export const useToastMessageService = () => {
  const showErrorMessage = (message: string) => {
    toast.error(message);
  };

  const showSuccessMessage = (message: string) => {
    toast.success(message);
  };

  return { showErrorMessage, showSuccessMessage };
};
