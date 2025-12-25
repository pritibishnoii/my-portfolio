/** @format */

import { useEffect, useRef } from "react";
import "./cursor.css";

const Cursor = () => {
  const cursorRef = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      // main dot (instant move)
      cursorRef.current.style.left = `${clientX}px`;
      cursorRef.current.style.top = `${clientY}px`;

      // outline (smooth follow)
      outlineRef.current.animate(
        {
          left: `${clientX}px`,
          top: `${clientY}px`,
        },
        {
          duration: 500,
          fill: "forwards",
        }
      );
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor"></div>
      <div ref={outlineRef} className="cursor-outline"></div>
    </>
  );
};

export default Cursor;
