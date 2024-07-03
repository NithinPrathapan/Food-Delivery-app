import React from "react";

const Header = () => {
  return (
    <div
      style={{ backgroundImage: 'url("/header_img.png")' }}
      className="h-[34vw] m-3 mx-auto bg-no-repeat relative bg-contain "
    >
      <div
        // style={{ animation: 'fadeIn 3s' }}
        className="absolute flex flex-col items-start gap-[1.5vw] animate-fadeIn 
      max-w-[50%] wf bottom-[10%] left-[6vw] "
      >
        <h2 className="font-semibold text-white  text-7xl leading-snug  ">
          Order your favourite foods here
        </h2>
        <p className="text-white text-lg leading-tight">
          Craving something delicious? Look no further! we've got you covered
          with a wide variety of options from near restaurants. Order now and
          enjoy the convenience of quick delivery and the joy of great food with
          doorDash!
        </p>
        <button className="border-none text-[#747474] py-3 px-8 bg-white font-outfit  font-semibold rounded-full">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
