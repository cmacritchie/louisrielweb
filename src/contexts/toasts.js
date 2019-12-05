import { toast } from 'react-toastify';

export const toastSuccess = (message) => {
    toast.success(message, { className: "green lighten-3" })
}

export const toastError = (message) => {
    toast.error(message, { className: "red darken-1" })
}