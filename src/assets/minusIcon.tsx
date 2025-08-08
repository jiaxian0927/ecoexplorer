const minusIcon = ({ className = "fill-[#000000]" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      className={className}
    >
      <path d="M200-440v-80h560v80H200Z" />
    </svg>
  );
};

export default minusIcon;
