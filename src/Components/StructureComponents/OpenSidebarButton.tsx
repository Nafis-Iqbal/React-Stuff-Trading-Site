const OpenSidebarButton = ({className, onClick} : {className?: string, onClick?: () => void}) => {
  return (
    <button
      onClick={() => {if(onClick) onClick();}}
      className={`rounded-md bg-pink-600 hover:bg-pink-400 text-white shadow-md transition ${className}`}
    >
      ☰
    </button>
  );
};

export default OpenSidebarButton;
