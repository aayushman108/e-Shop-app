//import watchImage from "../../assets/images/hellow.jpg";
// export function renderHome() {
//   const homePage = `
//   <div>
//   <img
//         src= ${watchImage}
//         width="100%"
//         height="auto"
//         alt="..."
//       />
//   </div>
//   `;
//   return homePage;
// }

export async function renderHome(): Promise<string> {
  try {
    const response = await fetch("./src/pages/home/home.html");
    console.log(response);
    const homeTemplate = await response.text();
    return homeTemplate;
  } catch (error) {
    console.error("Error rendering home page:", error);
    return "";
  }
}
