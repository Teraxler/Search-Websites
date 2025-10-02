import { lazy } from "react";
import Footer from "../../components/Footer/Footer";
import NewsHeader from "./NewsHeader/NewsHeader";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";

const NewsFeeds = lazy(() => import("./NewsFeeds"));
const NewsFeedsByCategory = lazy(() => import("./NewsFeedsByCategory"));

export default function NewsPage() {
  const params = useParams();

  return (
    <>
      <Helmet>
        <title>اخبار پارسی‌جو</title>
      </Helmet>
      <NewsHeader />

      {params.cat == null && <NewsFeeds />}
      {params.cat != null && <NewsFeedsByCategory cat={params.cat} />}

      <Footer />
    </>
  );
}
