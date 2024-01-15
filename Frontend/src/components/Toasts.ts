import Toastify from "toastify-js";

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

// Function to show an error toast
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
