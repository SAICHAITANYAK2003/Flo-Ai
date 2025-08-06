const Popover = ({ name }) => {
  return (
    <div className="bg-black text-white absolute top-14 right-1 px-3 py-1 rounded-md hidden group-hover:block z-50 ">
      {name ? <p>{name}</p> : null}
    </div>
  );
};

export default Popover;
