import { calcRelativeDateTimeDifference } from "../../utils/dateTimeMethods";

import noImage from "../../assets/images/no-image.png";

export default function NewsItem(props) {
  const { title, pubDate, link, author, description, enclosure } = props;

  return (
    <div className="flex items-center gap-x-4 py-2 border-b border-b-[#eeeeee]">
      <div className="hidden xs:block shrink-0 w-22.5 max-h-22.5 overflow-hidden rounded-xs">
        <a
          target="_blank"
          href={link}
          className="block text-xs max-w-full max-h-full"
        >
          <img
            loading="lazy"
            width={90}
            height={90}
            className="w-full object-scale-down"
            src={enclosure?.link ?? noImage}
            // src={thumbnail ? thumbnail : enclosure.link}
            alt={title}
          />
        </a>
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-bold line-clamp-1 text-[#0D4CDE]">
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
        <p className="text-[12.22px] my-1.5 line-clamp-2">{description}</p>
      </div>
    </div>
  );
}
