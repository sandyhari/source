import "./index.css";
import React, { useEffect, useState } from "react";

const Navbar = (params) => {
  const [handleShow, sethandleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        sethandleShow(true);
      } else {
        sethandleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${handleShow && "nav__black"}`}>
      <h2>Datified</h2>
    </div>
  );
};

export default Navbar;
