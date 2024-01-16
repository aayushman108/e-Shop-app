export async function renderCheckout() {
  const container = document.createElement("div");
  container.className = "checkout";
  container.innerHTML = /*html*/ `
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
                  </div>
  
                  <div class="form-group">
                      <label for="email">Email:</label>
                      <input type="email" class="form-control" id="email" name="email" required>
                  </div>
  
                  <div class="form-group">
                      <label for="address">Address:</label>
                      <textarea class="form-control" id="address" name="address" rows="3" required></textarea>
                  </div>
  
                  <div class="form-group">
                      <label for="phone">Phone:</label>
                      <input type="tel" class="form-control" id="phone" name="phone" required>
                  </div>
              </form>
          </div>
      </div>
  
      <!-- Order Summary -->
      <div class="card mb-4">
          <div class="card-body">
              <h4 class="card-title">Order Summary</h4>
              <!-- Display the items in the cart with their prices -->
  
              <!-- Example item -->
              <div class="d-flex justify-content-between mb-2">
                  <span>Product Name</span>
                  <span>$X.XX</span>
              </div>
  
              <!-- Display total price -->
              <div class="d-flex justify-content-between">
                  <span>Total:</span>
                  <span>$X.XX</span>
              </div>
          </div>
      </div>
  
      <!-- Payment Information -->
      <div class="card mb-4">
          <div class="card-body">
              <h4 class="card-title">Payment Information</h4>
              <form id="payment-form">
                  <div class="form-group">
                      <label for="card-number">Card Number:</label>
                      <input type="text" class="form-control" id="card-number" name="card-number" required>
                  </div>
  
                  <div class="form-row">
                      <div class="form-group col-md-6">
                          <label for="expiration-date">Expiration Date:</label>
                          <input type="text" class="form-control" id="expiration-date" name="expiration-date" placeholder="MM/YY" required>
                      </div>
  
                      <div class="form-group col-md-6">
                          <label for="cvv">CVV:</label>
                          <input type="text" class="form-control" id="cvv" name="cvv" required>
                      </div>
                  </div>
              </form>
          </div>
      </div>
  
      <!-- Order Button -->
      <button class="btn btn-primary" onclick="placeOrder()">Place Order</button>
  </div>
    `;

  return container;
}
