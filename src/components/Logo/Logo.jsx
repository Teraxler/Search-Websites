import logo from "../../assets/logo/lgoo.png";

export default function Logo(props) {
  return (
    <div className={props.className}>
      <img className="w-full" width={92} height={28} src={logo} alt="Logo" />
    </div>
  );
}
