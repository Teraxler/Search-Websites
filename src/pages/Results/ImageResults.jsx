import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import ImageGalery from "../../components/ImageGalery/ImageGalery";
import Loader from "../../components/Loader/Loader";
import { numberGenerator } from "../../utils/numberMethods";
import SkeletonImageGalery from "../../components/ImageGalery/SkeletonImageGalery";
import {
  API_CX,
  API_KEY,
  API_URL,
  MAX_NUMBER_OF_IMAGES as MAX_RESULT,
} from "../../services/constant";
import useFetch from "../../hooks/useFetch";

export default function ImageResults() {
  const params = useParams();
  console.count("ImageResults Render");
  const loaderContainerRef = useRef(null);
  const observerRef = useRef(null);

  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startPoint, setStartPoint] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [result, isResultLoaded] = useFetch(
    `${API_URL}?key=${API_KEY}&cx=${API_CX}&gl=ir&safe=active&q=${params.q}&num=${MAX_RESULT}&start=${startPoint}`
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isLastPage) {
          setCurrentPage((prevValue) => prevValue + 1);
          setStartPoint((prevValue) => prevValue + MAX_RESULT);
        }
      });
    });
  }, []);

  useEffect(() => {
    isResultLoaded &&
      !isLastPage &&
      observerRef.current.observe(loaderContainerRef.current);
  }, [isResultLoaded, isLastPage]);

  useEffect(() => {
    setCurrentPage(1);
    setStartPoint(1);
  }, [params.q]);

  useEffect(() => {
    if (result == null) return;

    if (result.items == null && currentPage !== 1) {
      setIsLastPage(true);
      return;
    }

    currentPage === 1
      ? setImages(result.items)
      : setImages((prevImages) => [...prevImages, ...result.items]);
  }, [result]);

  return (
    <>
      <section className="flex flex-wrap justify-start gap-5 p-5">
        {images?.length
          ? images.map((image) => (
              <ImageGalery key={image.title + image.link} {...image} />
            ))
          : numberGenerator(0, MAX_RESULT).map((id) => (
              <SkeletonImageGalery key={id} />
            ))}

        {isResultLoaded && !isLastPage ? (
          <div
            className="flex items-center justify-center w-full h-45"
            ref={loaderContainerRef}
          >
            <Loader className="border-[#474554]" />
          </div>
        ) : (
          ""
        )}
      </section>
    </>
  );
}
