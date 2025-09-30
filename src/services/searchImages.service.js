import { API_KEY_2, API_URL_2, MAX_NUMBER_OF_IMAGES } from "./constant";

async function getSearchImages(query, page = 1) {
  try {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `${API_URL_2}/images?q=${query}&gl=ir&hl=fa&num=${MAX_NUMBER_OF_IMAGES}&page=${page}&apiKey=${API_KEY_2}`,
      requestOptions
    );
    const result = await response.json();

    return result.images;
  } catch (error) {
    console.error(error);
  }
}

export { getSearchImages };
