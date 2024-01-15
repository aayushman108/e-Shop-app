import * as yup from "yup";
import { navigateToPage } from "../../router";
import { ISignup } from "../../interface";
import { signup } from "../../services/ApiServices";
import { AxiosError } from "axios";
import { showErrorToast, showSuccessToast } from "../../components/Toasts";
import { signupSchema } from "../../schema";

export async function renderSignup() {
  const signupPage = document.createElement("div") as HTMLDivElement;
  signupPage.className = "signup";
  signupPage.innerHTML = /* html */ `
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <form id="signupForm">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" name="username" placeholder="Enter your username">
                <div id="usernameError" class="form-text text-danger"></div>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="text" class="form-control" id="email" name="email" placeholder="Enter your email">
                <div id="emailError" class="form-text text-danger"></div>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" placeholder="Enter your password">
                <div id="passwordError" class="form-text text-danger"></div>
              </div>
              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password">
                <div id="confirmPasswordError" class="form-text text-danger"></div>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    `;
  const form = signupPage.querySelector(
    "#signupForm"
  ) as HTMLFormElement | null;

  // Event listener for resetting errors on input change
  const resetErrorOnInput = (inputId: string, errorId: string) => {
    const input = signupPage.querySelector(
      `#${inputId}`
    ) as HTMLInputElement | null;
    const error = signupPage.querySelector(`#${errorId}`) as HTMLDivElement;

    input?.addEventListener("input", (e) => {
      e.preventDefault();
      error.innerHTML = "";
    });
  };

  // Reset errors for each input field
  resetErrorOnInput("username", "usernameError");
  resetErrorOnInput("email", "emailError");
  resetErrorOnInput("password", "passwordError");
  resetErrorOnInput("confirmPassword", "confirmPasswordError");

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const formDataObject: ISignup = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      username: formData.get("username") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    try {
      await signupSchema.validate(formDataObject, { abortEarly: false });
      await signup(formDataObject);
      showSuccessToast("Logged in successfully");
      navigateToPage("home");
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((e) => {
          const errorField = document.getElementById(`${e.path}Error`);
          if (errorField) {
            errorField.textContent = e.message;
          }
        });
      }
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data;

        if (errorMessage && errorMessage.message) {
          showErrorToast(`${errorMessage.message}`);
        } else if (errorMessage && errorMessage.error) {
          showErrorToast(`${errorMessage.error}`);
        } else {
          showErrorToast("An unknown error occurred");
        }
      }
    }
  });

  return signupPage;
}
