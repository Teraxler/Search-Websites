import noImage from "../../assets/images/no-image.png";

export default function NewsPicture(props) {
  const { title, link, enclosure } = props;

  return (
    <div className="flex flex-col items-center w-1/2">
      <div className="w-31.25 h-31.25 rounded-xs overflow-hidden">
        <a target="_blank" href={link} className="max-w-full max-h-full">
          <img
            className="w-full h-full object-scale-down"
            src={enclosure?.link ?? noImage}
            alt={title}
            loading="lazy"
            width={125}
            height={125}
          />
        </a>
      </div>
      <h3
        className="text-[#0D4CDE] text-center max-w-51 line-clamp-2"
        title={title}
      >
        <a target="_blank" href={link}>
          {title}
        </a>
      </h3>
    </div>
  );
}
