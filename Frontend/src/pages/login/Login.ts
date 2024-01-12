import * as yup from "yup";
import { navigateToPage } from "../../router";
import { ILogin } from "../../interface";
import { login } from "../../services/ApiServices";

export async function renderLogin() {
  const loginPage = document.createElement("div") as HTMLDivElement;
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

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters, with at least one capital letter, one special character, and one number"
      ),
  });
  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const formDataObject: ILogin = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    console.log(formDataObject);
    try {
      await schema.validate(formDataObject, { abortEarly: false });
      login(formDataObject);
      console.log("Form submitted successfully!");
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
    }
  });
  return loginPage;
}
