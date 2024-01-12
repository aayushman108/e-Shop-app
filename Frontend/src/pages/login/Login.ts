import * as yup from "yup";
import { navigateToPage } from "../../router";

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
  const password = loginPage.querySelector(
    "#password"
  ) as HTMLInputElement | null;
  const passwordError = loginPage.querySelector(
    "#passwordError"
  ) as HTMLDivElement;

  password?.addEventListener("input", (e) => {
    e.preventDefault();
    passwordError.innerHTML = "";
  });

  const email = loginPage.querySelector("#email") as HTMLInputElement | null;
  const emailError = loginPage.querySelector("#emailError") as HTMLDivElement;

  email?.addEventListener("input", (e) => {
    e.preventDefault();
    emailError.innerHTML = "";
  });

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
    const formDataObject: Record<string, string> = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value.toString();
    });
    console.log(formDataObject);
    try {
      await schema.validate(formDataObject, { abortEarly: false });
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
