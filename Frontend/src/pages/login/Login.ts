import * as yup from "yup";
import { navigateToPage } from "../../router";
import { ILogin } from "../../interface";
import { login } from "../../services/ApiServices";
import { AxiosError } from "axios";
import { loginSchema } from "../../schema";
import { showErrorToast, showSuccessToast } from "../../components/Toasts";

/**
 * Renders the login page with a form for user login.
 * @returns The rendered login page.
 */
export async function renderLogin(): Promise<HTMLDivElement> {
  const loginPage = document.createElement("div") as HTMLDivElement;
  loginPage.className = "login";
  loginPage.innerHTML = /* html */ `
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <form id="loginForm">
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
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    `;
  const form = loginPage.querySelector("#loginForm") as HTMLFormElement | null;

  // Event listener for resetting errors on input change
  const resetErrorOnInput = (inputId: string, errorId: string) => {
    const input = loginPage.querySelector(
      `#${inputId}`
    ) as HTMLInputElement | null;
    const error = loginPage.querySelector(`#${errorId}`) as HTMLDivElement;

    input?.addEventListener("input", (e) => {
      e.preventDefault();
      error.innerHTML = "";
    });
  };

  resetErrorOnInput("email", "emailError");
  resetErrorOnInput("password", "passwordError");

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const formDataObject: ILogin = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    try {
      await loginSchema.validate(formDataObject, { abortEarly: false });
      const user = await login(formDataObject);
      localStorage.setItem("userId", user.user.userId);
      showSuccessToast("Logged in successfully!");
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
  return loginPage;
}
