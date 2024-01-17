import Toastify from "toastify-js";

/**
 * Displays a success toast notification with the provided message.
 * @param message - The success message to be displayed.
 */
export function showSuccessToast(message: string) {
  const toast = Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  });

  toast.showToast();
}

/**
 * Displays an error toast notification with the provided message.
 * @param message - The error message to be displayed.
 */
export function showErrorToast(message: string) {
  const toast = Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    style: {
      background: "linear-gradient(to right, #ff0000, #ff7f7f)",
    },
  });

  toast.showToast();
}
