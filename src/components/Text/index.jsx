import React from "react";

const sizeClasses = {
  txtNunitoSemiBold28: "font-nunito font-semibold",
  txtSourceSansProSemiBold32: "font-semibold font-sourcesanspro",
  txtNunitoBlack64: "font-black font-nunito",
  txtNunitoBlack48: "font-black font-nunito",
  txtNunitoBlack36: "font-black font-nunito",
  txtNunitoSemiBold96: "font-nunito font-semibold",
  txtNunitoExtraBold56: "font-extrabold font-nunito",
  txtSourceSansProBold32: "font-bold font-sourcesanspro",
  txtNunitoBlackItalic96: "font-black font-nunito italic",
  txtPoppinsExtraBold80: "font-extrabold font-poppins",
  txtNunitoBlack40: "font-black font-nunito",
};

const Text = ({ children, className = "", size, as, ...restProps }) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
