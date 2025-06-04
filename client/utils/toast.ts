import { toast } from 'react-toastify';

export const showSuccess = (message: string) =>
  toast.success(message, {
    position: 'bottom-right',
    autoClose: 3000,
    className:"border border-black"
  });

export const showError = (message: string) =>
  toast.error(message, {
    position: 'bottom-right',
    autoClose: 3000,
    className:"border border-black"
  });
