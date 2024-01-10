export async function renderHome(): Promise<string> {
  try {
    const response = await fetch("./src/pages/home/index.html");
    console.log(response);
    const homeTemplate = await response.text();
    console.log(homeTemplate);
    return homeTemplate;
  } catch (error) {
    console.error("Error rendering home page:", error);
    return "";
  }
}
