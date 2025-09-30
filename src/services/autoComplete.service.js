import { API_KEY_2, API_URL_2 } from "./constant";

async function getAutoCompeleteSuggestions(query) {
  try {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `${API_URL_2}/autocomplete?q=${query}&gl=ir&apiKey=${API_KEY_2}`,
      requestOptions
    );
    const result = await response.json();
    return result.suggestions;
  } catch (error) {
    console.error(error);
  }
}

export { getAutoCompeleteSuggestions };
