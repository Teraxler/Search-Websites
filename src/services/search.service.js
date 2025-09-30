import { API_KEY_2, API_URL_2, MAX_NUMBER_RESULT } from "./constant";

async function getSearchResult(query, page = 1) {
  try {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `${API_URL_2}/search?q=${query}&gl=ir&hl=fa&num=${MAX_NUMBER_RESULT}&page=${page}&apiKey=${API_KEY_2}`,
      requestOptions
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export { getSearchResult };
