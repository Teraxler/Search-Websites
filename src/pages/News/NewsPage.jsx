import { useMemo } from "react";
import { Link } from "react-router";
import Footer from "../../components/Footer/Footer";
import HeaderNews from "./NewsHeader/NewsHeader";
import NewsTitle from "../../components/NewsTitle/NewsTitle";
import NewsPicture from "../../components/NewsPicture/NewsPicture";
import NewsSection from "./NewsSection/NewsSection";
import NewsItem from "../../components/NewsItem/NewsItem";
import MiniNewsItem from "../../components/MiniNewsItem/MiniNewsItem";
import { FiChevronsLeft } from "react-icons/fi";
import { shuffleArray } from "../../utils/arrayMethods";
import useFetchFeeds from "../../hooks/useFetchFeeds";
import rssLinks from "../../data/rss-feeds.json";
import { numberGenerator } from "../../utils/numberMethods";
import SkeletonMiniNewsItem from "../../components/MiniNewsItem/SkeletonMiniNewsItem";
import SkeletonNewsPicture from "../../components/NewsPicture/SkeletonNewsPicture";
import SkeletonNewsItem from "../../components/NewsItem/SkeletonNewsItem";
import SkeletonNewsTitle from "../../components/NewsTitle/SkeletonNewsTitle";
import Skeleton from "@mui/material/Skeleton";

export default function NewsPage() {
  const [politicalFeeds, isPoliticalFeedsLoaded, errorPoliticalFeeds] = useFetchFeeds(rssLinks.political);
  const [economyFeeds, isEconomyFeedsLoaded, errorEconomyFeeds] = useFetchFeeds(rssLinks.economy);
  const [healthFeeds, isHealthFeedsLoaded, errorHealthFeeds] = useFetchFeeds(rssLinks.health);
  const [sportFeeds, isSportFeedsLoaded, errorSportFeeds] = useFetchFeeds(rssLinks.sports);
  const [latestFeeds, isLatestFeedsLoaded, errorLatestFeeds] = useFetchFeeds(rssLinks.latest);

  const shuffledPoliticalFeeds = useMemo(
    () => shuffleArray(politicalFeeds).slice(0, 10),
    [politicalFeeds]
  );
  const shuffledEconomyFeeds = useMemo(
    () => shuffleArray(economyFeeds).slice(0, 10),
    [economyFeeds]
  );
  const shuffledLatestFeeds = useMemo(
    () => shuffleArray(latestFeeds).slice(0, 10),
    [latestFeeds]
  );
  const shuffledHealthFeeds = useMemo(
    () => shuffleArray(healthFeeds).slice(0, 10),
    [healthFeeds]
  );
  const shuffledSportFeeds = useMemo(
    () => shuffleArray(sportFeeds).slice(0, 10),
    [sportFeeds]
  );

  return (
    <>
      <HeaderNews />

      <div className="container mx-auto flex flex-col lg:flex-row gap-4 p-4">
        <main className="flex flex-col gap-y-4 flex-2">
          <NewsSection title={"آخرین خبر‌ها"}>
            {isLatestFeedsLoaded && shuffledLatestFeeds.length
              ? shuffledLatestFeeds.map((feed) => (
                  <NewsTitle key={feed.guid} {...feed} showAuthor showPubDate />
                ))
              : numberGenerator(0, 10).map((id) => (
                  <SkeletonNewsTitle key={id} />
                ))}
          </NewsSection>
          <NewsSection title={"سیاسی"}>
            {isPoliticalFeedsLoaded && shuffledPoliticalFeeds.length
              ? shuffleArray(shuffledPoliticalFeeds).map((feed) => (
                  <NewsItem key={feed.guid} {...feed} />
                ))
              : numberGenerator(0, 10).map((id) => (
                  <SkeletonNewsItem key={id} />
                ))}
          </NewsSection>
          <NewsSection title={"اقتصادی"}>
            <div className="flex flex-wrap gap-y-4 mt-4">
              {isEconomyFeedsLoaded&& shuffledEconomyFeeds.length
                ? shuffleArray(shuffledEconomyFeeds).map((feed) => (
                    <NewsPicture key={feed.guid} {...feed} />
                  ))
                : numberGenerator(0, 10).map((id) => (
                    <SkeletonNewsPicture key={id} />
                  ))}
            </div>
            <div className="flex items-end">
              <Link
                to={"/khabar/economy"}
                className="flex items-center gap-x-0.5 text-primary ms-auto"
              >
                بیشتر
                <FiChevronsLeft />
              </Link>
            </div>
          </NewsSection>
          <NewsSection title={"ورزشی"}>
            <div className="flex flex-wrap">
              {isSportFeedsLoaded &&shuffledSportFeeds.length
                ? shuffleArray(shuffledSportFeeds).map((feed) => (
                    <MiniNewsItem key={feed.guid} {...feed} />
                  ))
                : numberGenerator(0, 10).map((id) => (
                    <SkeletonMiniNewsItem key={id} />
                  ))}
            </div>
            <div className="flex items-end">
              <Link
                to={"/khabar/sports"}
                className="flex items-center gap-x-0.5 text-primary ms-auto"
              >
                بیشتر
                <FiChevronsLeft />
              </Link>
            </div>
          </NewsSection>
        </main>
        <aside className="flex flex-col gap-4 flex-1">
          <NewsSection title={"سلامت"}>
            {isHealthFeedsLoaded && shuffledHealthFeeds.length
              ? shuffleArray(shuffledHealthFeeds).map((feed) => (
                  <NewsTitle key={feed.guid} {...feed} />
                ))
              : numberGenerator(0, 10).map((id) => <Skeleton key={id} />)}
          </NewsSection>
          <NewsSection title={"خبرگزاری‌های تحت پوشش"}>
            <div className="flex items-center justify-between flex-wrap">
              {rssLinks.websites &&
                rssLinks.websites.map((website) => (
                  <div key={website} className="p-2 w-1/3">
                    <span className="line-clamp-1" title={website}>
                      {website}
                    </span>
                  </div>
                ))}
            </div>
          </NewsSection>
        </aside>
      </div>

      <Footer />
    </>
  );
}
