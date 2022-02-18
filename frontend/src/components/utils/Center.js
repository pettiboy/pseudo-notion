import React from "react";

const Center = ({ children, height = 100 }) => {
  let useHeight;
  if (typeof height === "string") useHeight = height;
  else useHeight = height + "vh";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: useHeight,
      }}
    >
      {children}
    </div>
  );
};

export default Center;
