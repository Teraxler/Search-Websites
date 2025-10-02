import { lazy } from "react";
import ResultsHeader from "./ResultsHeader/ResultsHeader";
import { useParams } from "react-router";
import Footer from "../../components/Footer/Footer";
import { Helmet } from "react-helmet";
const ImageResults = lazy(() => import("./ImageResults"));
const AllResults = lazy(() => import("./AllResults"));

export default function ResultsPage() {
  const params = useParams();

  return (
    <>
      <Helmet>
        <title>پارسی‌جو</title>
      </Helmet>
      <ResultsHeader />
      <main>
        {params.type === "images" && <ImageResults />}
        {params.type === "all" && <AllResults />}
      </main>
      <Footer />
    </>
  );
}
