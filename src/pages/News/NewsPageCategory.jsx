import { useEffect, useState } from "react";
import { useParams } from "react-router";
import NewsHeader from "./NewsHeader/NewsHeader";
import NewsSection from "./NewsSection/NewsSection";
import Footer from "../../components/Footer/Footer";
import useFetchFeeds from "../../hooks/useFetchFeeds";
import NewsTitle from "../../components/NewsTitle/NewsTitle";
import NewsItem from "../../components/NewsItem/NewsItem";
import rssFeedLinks from "../../data/rss-feeds.json";
import { paginateItems, shuffleArray } from "../../utils/arrayMethods";
import { numberGenerator } from "../../utils/numberMethods";
import SkeletonNewsItem from "../../components/NewsItem/SkeletonNewsItem";
import Skeleton from "@mui/material/Skeleton";
import Pagination from "../../components/Pagination/Pagination";
import { MAX_NUMBER_OF_NEWS as MAX_NEWS } from "../../services/constant";
import categories from "../../data/newsCategories.json";

export default function NewsByCategoryPage() {
  const { cat } = useParams();
  const [webFeeds] = useFetchFeeds(rssFeedLinks[cat]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageFeeds, setCurrentPageFeeds] = useState([]);
  const [shuffledFeeds, setShuffledFeeds] = useState([]);
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  const categoryTitle = categories.newsCategories.find(
    (newsCategory) => newsCategory.name === cat
  ).title;

  useEffect(() => setCurrentPage(1), [cat]);

  useEffect(() => {
    setCurrentPageFeeds(() => paginateItems(webFeeds, currentPage, MAX_NEWS));
    setShuffledFeeds(() => shuffleArray(webFeeds, MAX_NEWS));
    setIsContentLoaded(true);
  }, [webFeeds, currentPage]);

  function navigateHandler(newPage) {
    setCurrentPage(newPage);
    setIsContentLoaded(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <NewsHeader />
      <div className="container mx-auto flex flex-col-reverse lg:flex-row gap-4 p-4">
        <main className="flex flex-col gap-y-4 flex-2">
          <NewsSection title={categoryTitle}>
            {isContentLoaded && currentPageFeeds.length
              ? currentPageFeeds.map((feed) => (
                  <NewsItem key={feed.guid} {...feed} />
                ))
              : numberGenerator(0, MAX_NEWS).map((id) => (
                  <SkeletonNewsItem key={id} />
                ))}
          </NewsSection>
        </main>
        <aside className="flex flex-col gap-4 flex-1">
          <NewsSection title={categoryTitle}>
            {isContentLoaded && shuffledFeeds.length
              ? shuffledFeeds.map((feed) => (
                  <NewsTitle key={feed.guid} {...feed} />
                ))
              : numberGenerator(0, MAX_NEWS).map((id) => <Skeleton key={id} />)}
          </NewsSection>
        </aside>
      </div>
      <div className="flex justify-center mt-3.5 mb-7.5">
        <Pagination
          page={currentPage}
          count={Math.ceil(webFeeds.length / MAX_NEWS)}
          onChange={navigateHandler}
        />
      </div>
      <Footer />
    </>
  );
}
