import { useState } from "react";
import { RiFilter3Fill, RiSortDesc, RiFileUserFill } from "react-icons/ri";

interface Button {
  content: string;
  type: string;
  isActive: boolean;
}

export default function Button({ content, type, isActive }) {
  const [active, setActive] = useState(isActive);

  function handleClick() {
    isActive = !isActive;
    setActive(!active);
  }

  return (
    <button
      type="button"
      className={
        active ? "active border filter-button" : "border filter-button"
      }
      onClick={handleClick}
    >
      <Icon type={type} />
      <span className="block">{content}</span>
    </button>
  );
}

function Icon({ type }) {
  switch (type) {
    case "filter":
      return <RiFilter3Fill className="icon" />;
      break;
    case "sort":
      return <RiSortDesc className="icon" />;
      break;
    default:
      return <RiFileUserFill />;
      break;
  }
}
