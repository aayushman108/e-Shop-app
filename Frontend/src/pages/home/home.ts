import heroImage from "../../assets/images/hellow.jpg";

export async function renderHome() {
  const container = document.createElement("div");
  container.className = "home";
  container.innerHTML = /*html*/ `
  <div class="home__hero-image">
    <img src=${heroImage} alt="hero-image" />
  </div>
  `;

  return container;
}
