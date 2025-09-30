import { useEffect, useState } from "react";
import { useParams } from "react-router";
import WebSite from "../../components/WebSite/WebSite";
// import { getSearchResult } from "../../services/search.service";
import Pagination from "../../components/Pagination/Pagination";
// import PeopleSearch from "../../components/PeopleSearch/PeopleSearch";
// import IntroduceCard from "../../components/IntroduceCard/IntroduceCard";
import { numberGenerator } from "../../utils/numberMethods";
import SkeletonWebSite from "../../components/WebSite/SkeletonWebSite";
import ResultHeader from "./ResultsHeader/ResultsHeader";
import Footer from "../../components/Footer/Footer";
import useFetch from "../../hooks/useFetch";
import {
  API_KEY,
  API_URL,
  API_CX,
  MAX_NUMBER_RESULT as MAX_RESULT,
} from "../../services/constant";
// import useLogger from "../../hooks/useLogger";
// import searchResult from "../../../data/search.json";

export default function AllResults() {
  const params = useParams();
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startPoint, setStartPoint] = useState(1);
  const [result, isResultLoaded] = useFetch(
    `${API_URL}?key=${API_KEY}&cx=${API_CX}&gl=ir&safe=active&q=${params.q}&num=${MAX_RESULT}&start=${startPoint}`
  );

  useEffect(() => {
    isResultLoaded && setPages(result?.items);
  }, [isResultLoaded]);

  useEffect(() => setCurrentPage(1), [params.q]);

  useEffect(
    () => setStartPoint(currentPage * MAX_RESULT - MAX_RESULT + 1),
    [currentPage]
  );

  function navigateHandler(page) {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // console.log("Render");

  return (
    <>
      <ResultHeader />
      <main>
        <div className="grid grid-rows-[auto_auto_auto] grid-cols-12 flex-col gap-y-7.5 h-auto py-7.5 px-4 xs:px-7 sm:px-8.5">
          <div className="row-start-2 sm:row-start-1 row-end-3 col-start-1 lg:col-start-2 col-end-12 sm:col-end-8 lg:col-end-9 pe-5 flex flex-col gap-y-7.5">
            <div className="flex flex-col gap-y-7.5">
              {isResultLoaded && pages
                ? pages.map((page) => <WebSite key={page.position} {...page} />)
                : numberGenerator(0, 10).map((id) => (
                    <SkeletonWebSite key={id} />
                  ))}
            </div>
            {/* People Also Search */}
            {/* {relatedSearches ? (
              <div className="max-w-full w-162.5 text-[22px]">
                <span>People also search for</span>
                <div className="flex gap-y-4 flex-wrap -mx-2 mt-1.5">
                  {relatedSearches.map((relatedSearch) => (
                    <PeopleSearch
                      key={relatedSearch.query}
                      query={relatedSearch.query}
                    />
                  ))}
                </div>
              </div>
            ) : (
              ""
            )} */}
          </div>

          {/* {knowledgeGraph ? (
            <div className="border-b sm:border-b-0 max-w-fit sm:border-s border-gainsboro sm:ps-5 row-start-1 row-end-2 col-start-1 sm:col-start-8 lg:col-start-9 col-end-13">
              <IntroduceCard {...knowledgeGraph} />
            </div>
          ) : (
            ""
          )} */}

          {/* <Pagination/> */}
          <div className="row-start-3 row-end-4 col-start-1 col-end-13 flex justify-center w-full max-h-fit">
            <Pagination
              count={10}
              page={currentPage}
              onChange={navigateHandler}
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
