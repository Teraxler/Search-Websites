import { HiOutlineDotsVertical } from "react-icons/hi";
import SiteLink from "./SiteLink";

export default function WebSite(props) {
  const { title, link, snippet, date, sitelinks, displayLink } = props;

  return (
    <div className="max-w-full w-162.5">
      <div className="max-w-full flex gap-x-2 items-center">
        {/* <div className="shrink-0 size-7 border border-[#d2d2d2] rounded-full me-3">
          <img src="" alt="" />
        </div> */}
        <a className="max-w-[calc(100%-24px)] flex flex-col" href={link}>
          <span className="max-w-full text-sm text-[#202124] line-clamp-1">
            {title}
          </span>
          <cite className="max-w-full text-xs text-[#4d5156] truncate">
            {displayLink}
          </cite>
        </a>
        <div className="flex items-center mt-auto size-6">
          <HiOutlineDotsVertical className="size-4.5" />
        </div>
      </div>
      <div>
        <h3 className="relative text-xl text-neon-blue mt-0.75 pt-1.25 line-clamp-1">
          <a className="hover:underline" href={link}>
            {title}
          </a>
        </h3>
        <p className="text-sm text-[#474747] line-clamp-2">
          {date ? <span>{date} — </span> : ""}
          {snippet}
        </p>
      </div>

      <div className="mt-3 ps-4.5">
        {sitelinks
          ? sitelinks.map((sitelink) => (
              <SiteLink key={sitelink.title} {...sitelink} />
            ))
          : ""}
      </div>
    </div>
  );
}
