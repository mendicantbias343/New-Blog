// import { useState } from "react";
// import { RiFilter3Fill, RiSortDesc, RiFileUserFill } from "react-icons/ri";

// interface FilterButton {
//   content: string;
//   type: string;
//   isActive: boolean;
//   className?: string;
// }

// export default function FilterButton({ content, type, isActive }) {
//   const [active, setActive] = useState(isActive);

//   function handleClick() {
//     isActive = !isActive;
//     setActive(!active);
//   }
//   const classNames = active
//     ? "active border filter-button"
//     : "border filter-button";
//   return (
//     <>
//       <button type="button" className={classNames} onClick={handleClick}>
//         <Icon type={type} />
//         <span className="block">{content}</span>
//       </button>
//     </>
//   );
// }

// function Icon({ type }) {
//   switch (type) {
//     case "filter":
//       return <RiFilter3Fill className="icon" />;
//       break;
//     case "sort":
//       return <RiSortDesc className="icon" />;
//       break;
//     default:
//       return <RiFileUserFill />;
//       break;
//   }
// }
