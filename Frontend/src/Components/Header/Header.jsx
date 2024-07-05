import React from "react";

const Header = () => {
  return (
    <div
      style={{ backgroundImage: 'url("/header_img.png")' }}
      className="min-h-[40vw] m-3 mx-auto bg-no-repeat relative bg-cover  "
    >
      <div
        // style={{ animation: 'fadeIn 3s' }}
        className="absolute flex flex-col items-start gap-[4px] md:gap-2 animate-fadeIn 
      md:max-w-[60%] w-[80%] bottom-[10%] left-[6vw] p-2 "
      >
        <h2 className="font-semibold text-white text-xl drop-shadow-xl sm:text-2xl md:text-4xl lg:text-6xl ">
          Order your favourite foods here
        </h2>
        <p className="text-white hidden  lg:flex leading-tight text-lg">
          Craving something delicious? Look no further! we've got you covered
          with a wide variety of options from near restaurants. Order now and
          enjoy the convenience of quick delivery and the joy of great food with
          doorDash!
        </p>
        <button className="border-none text-[#747474] md:py-3 md:px-8 px-6 py-2 shadow-md bg-white font-outfit  font-semibold rounded-full text-sm">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
