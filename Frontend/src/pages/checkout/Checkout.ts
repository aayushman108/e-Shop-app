import * as yup from "yup";
import { showSuccessToast } from "../../components/Toasts";
import { navigateToPage } from "../../router";
import { checkoutSchema } from "../../schema";
import { ICartProduct, ICustomer, IPayment, IProduct } from "../../interface";
import { getCartProducts } from "../../services/ApiServices";

function renderOrderedProduct(product: IProduct, quantity: number) {
  const orderItem = document.createElement("div");
  orderItem.className = "order__item";
  orderItem.innerHTML = /* html */ `
        <div class= "order__item-description">
          <p>${product.productName}</p>
          <p>${quantity}</p>
        </div>
        <div class="order__item-price">
          <p>$${product.price.toFixed(2)}/piece</p>
          <p>Total: $${(product.price * quantity).toFixed(2)} </p>
        </div>
      `;
  return orderItem;
}

export async function renderCheckout() {
  const order = document.createElement("div");
  order.className = "order-summary";

  const userId = localStorage.getItem("userId");

  let orderDetails: ICartProduct[] = [];
  if (userId) {
    orderDetails = await getCartProducts(userId);
  }

  orderDetails.forEach((cart) => {
    const { Product, quantity } = cart;
    order.appendChild(renderOrderedProduct(Product, quantity));
  });

  const checkout = document.createElement("div");
  checkout.className = "checkout";
  checkout.innerHTML = /*html*/ `
    <div class="container mt-5">
      <h2 class="mb-4">Checkout</h2>
  
      <!-- Customer Information -->
      <div class="card mb-4">
          <div class="card-body">
              <h4 class="card-title">Customer Information</h4>
              <form id="customer-form">
                  <div class="form-group">
                      <label for="name">Name:</label>
                      <input type="text" class="form-control" id="name" name="name" required>
                      <div id="nameError" class="form-text text-danger"></div>
                  </div>
  
                  <div class="form-group">
                      <label for="email">Email:</label>
                      <input type="email" class="form-control" id="email" name="email" required>
                      <div id="emailError" class="form-text text-danger"></div>
                  </div>
  
                  <div class="form-group">
                      <label for="address">Address:</label>
                      <input type="text" class="form-control" id="address" name="address" required>
                      <div id="addressError" class="form-text text-danger"></div>
                  </div>
  
                  <div class="form-group">
                      <label for="phone">Phone:</label>
                      <input type="tel" class="form-control" id="phone" name="phone" required>
                      <div id="phoneError" class="form-text text-danger"></div>
                  </div>
              </form>
          </div>
      </div>
  
      <!-- Order Summary -->
      <div class="card mb-4">
          <div class="card-body">
              <h4 class="card-title">Order Summary</h4>
          </div>
      </div>
  
      <!-- Payment Information -->
      <div class="card mb-4">
          <div class="card-body">
              <h4 class="card-title">Payment Information</h4>
              <form id="payment-form">
  
                  <div class="form-row">
                      <div class="form-group col-md-6">
                          <label for="card-number">Card Number:</label>
                          <input type="text" class="form-control" id="card-number" name="card-number" required>
                          <div id="cardNumberError" class="form-text text-danger"></div>
                      </div>
                      <div class="form-group col-md-6">
                          <label for="expiration-date">Expiration Date:</label>
                          <input type="text" class="form-control" id="expiration-date" name="expiration-date" placeholder="MM/YY" required>
                          <div id="expDateError" class="form-text text-danger"></div>
                      </div>
  
                      <div class="form-group col-md-6">
                          <label for="cvv">CVV:</label>
                          <input type="text" class="form-control" id="cvv" name="cvv" required>
                          <div id="cvvError" class="form-text text-danger"></div>
                      </div>
                  </div>
              </form>
          </div>
      </div>
  
      <!-- Order Button -->
      <button class="btn btn-primary" id="place-order-btn">Place Order</button>
  </div>
    `;

  const customerForm = checkout.querySelector(
    "#customer-form"
  ) as HTMLFormElement;
  const paymentForm = checkout.querySelector(
    "#payment-form"
  ) as HTMLFormElement;

  // Event listener for resetting errors on input change
  const resetErrorOnInput = (inputId: string, errorId: string) => {
    const input = checkout.querySelector(
      `#${inputId}`
    ) as HTMLInputElement | null;
    const error = checkout.querySelector(`#${errorId}`) as HTMLDivElement;

    input?.addEventListener("input", (e) => {
      e.stopPropagation();
      error.innerHTML = "";
    });
  };

  resetErrorOnInput("name", "nameError");
  resetErrorOnInput("email", "emailError");
  resetErrorOnInput("address", "addressError");
  resetErrorOnInput("phone", "phoneError");
  resetErrorOnInput("card-number", "cardError");
  resetErrorOnInput("expiration-date", "expDateError");
  resetErrorOnInput("cvv", "cvvError");

  const placeOrderBtn = checkout.querySelector(
    "#place-order-btn"
  ) as HTMLButtonElement | null;
  placeOrderBtn?.addEventListener("click", async (event) => {
    event.preventDefault();
    const customerFormData = new FormData(customerForm);
    const paymentFormData = new FormData(paymentForm);
    const customerFormDataObject: ICustomer = {
      name: customerFormData.get("name") as string,
      email: customerFormData.get("email") as string,
      address: customerFormData.get("address") as string,
      phone: customerFormData.get("phone") as string,
    };
    const paymentFormDataObject: IPayment = {
      expDate: paymentFormData.get("expiration-date") as string,
      cvv: paymentFormData.get("cvv") as string,
      cardNumber: paymentFormData.get("card-number") as string,
    };

    const combinedFormValues = {
      ...customerFormDataObject,
      ...paymentFormDataObject,
    };

    try {
      await checkoutSchema.validate(combinedFormValues, {
        abortEarly: false,
      });

      showSuccessToast("Order placed successfully!");
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

  const orderSummary = checkout.querySelectorAll(".card-body")[1];
  orderSummary.appendChild(order);

  return checkout;
}
