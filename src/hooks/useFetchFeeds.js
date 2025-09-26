import React, { useEffect, useState } from "react";

export default function useFetchFeeds(urls) {
  const [webFeeds, setWebFeeds] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFeeds() {
      try {
        const allResponse = urls.map(async (url) => {
          const response = await fetch(
            `${
              process.env.REACT_APP_XML2JSON_API_URL
            }?rss_url=${encodeURIComponent(url)}&api_key=${
              process.env.REACT_APP_XML2JSON_API_KEY
            }`
          );

          return response.json();
        });

        const rssResult = await Promise.allSettled(allResponse);

        setWebFeeds(() =>
          rssResult.flatMap((rss) =>
            rss.status === "fulfilled" ? rss.value.items : []
          )
        );
      } catch (error) {
        setError(error);
      } finally {
        setIsLoaded(true);
      }
    }

    setError(null);
    setIsLoaded(false);
    urls?.length && fetchFeeds();
  }, [urls]);

  return [webFeeds, isLoaded, error];
}
// export default function useFetchFeeds(urls) {
//   const [webFeeds, setWebFeeds] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchFeeds() {
//       try {
//         const allResponse = urls.map(async (url) => {
//           const response = await fetch(
//             `${
//               process.env.REACT_APP_XML2JSON_API_URL
//             }?rss_url=${encodeURIComponent(url)}&api_key=${
//               process.env.REACT_APP_XML2JSON_API_KEY
//             }`
//           );

//           return response.json();
//         });

//         const rssResult = await Promise.allSettled(allResponse);

//         setWebFeeds(() =>
//           rssResult.flatMap((rss) =>
//             rss.status === "fulfilled" ? rss.value.items : []
//           )
//         );
//       } catch (error) {
//         setError(error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     urls?.length && fetchFeeds();
//   }, [urls]);

//   return webFeeds;
// }
