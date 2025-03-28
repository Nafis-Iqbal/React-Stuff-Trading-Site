import { useEffect, useState } from "react";

const OpenSidebarButton = ({customStyle, onClick} : {customStyle?: string, onClick?: () => void}) => {
  return (
    <button
      onClick={() => {if(onClick) onClick();}}
      className={`rounded-lg bg-pink-600 hover:bg-pink-400 text-white shadow-md transition ${customStyle}`}
    >
      ☰
    </button>
  );
};

export default OpenSidebarButton;
