export default function ImageGalery(props) {
  const { title, link, displayLink, pagemap } = props;

  const thumbnail = pagemap?.cse_thumbnail?.[0];
  if (thumbnail == null) return null;

  const aspectRatio = thumbnail?.width / thumbnail?.height;
  const dynamicWidth = aspectRatio * 180;

  return (
    <div
      className="flex grow shrink"
      style={{
        maxWidth: thumbnail.width + "px",
        flexBasis: dynamicWidth + "px",
      }}
    >
      <div className="hover:*:first:shadow-[0_2px_12px_0_rgba(0,0,0,.3)] w-full">
        <div className="rounded-xl bg-[#f7f7f7] overflow-hidden transition-shadow w-full h-45">
          <a className="flex items-center w-full h-full" href={link}>
            <img
              loading="lazy"
              className="object-cover object-top w-full h-full"
              src={thumbnail.src}
              alt={title}
              width={thumbnail.width}
              height={thumbnail.height}
              style={{ maxHeight: thumbnail.height + "px" }}
            />
          </a>
        </div>
        <div className="mt-2 mx-1 mb-0.5">
          <a href={link} className="hover:*:first:underline">
            <span className="text-xs text-davy-grey">{displayLink}</span>
            <p className="text-sm text-[#474747] line-clamp-1">{title}</p>
          </a>
        </div>
      </div>
    </div>
  );
}
