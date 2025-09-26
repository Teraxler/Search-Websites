import { calcRelativeDateTimeDifference } from "../../utils/dateTimeMethods";
import noImage from "../../assets/images/no-image.png";

export default function NewsItemMini(props) {
  const { title, pubDate, link, author, enclosure } = props;

  return (
    <div className="flex-1 basis-full lg:basis-1/2 lg:odd:pe-4 lg:even:ps-4 h-19 lg:even:border-s border-[#eeeeee]">
      <div className="flex items-center gap-x-4 py-2 border-b border-b-[#eeeeee] h-full">
        <div className="h-11.5">
          <a
            target="_blank"
            href={link}
            className="hidden xs:block shrink-0 w-20 h-full overflow-hidden text-xs rounded-xs "
          >
            <img
              loading="lazy"
              width={80}
              height={46}
              className="w-full max-h-full object-scale-down"
              src={enclosure?.link ?? noImage}
              // src={thumbnail ? thumbnail : enclosure.link}
              alt={title}
            />
          </a>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-[#0D4CDE] line-clamp-2 ">
            <a target="_blank" href={link}>
              {title}
            </a>
          </h3>
          <div className="flex gap-x-1.25 text-xs mt-1">
            <span className="text-davy-grey">{author}</span>
            <span className="text-[#7b7b7b]">
              {pubDate && calcRelativeDateTimeDifference(pubDate)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
