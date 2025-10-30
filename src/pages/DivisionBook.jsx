// src/pages/DivisionBook.js
import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import "../styles/notesBook.css";

const DivisionBook = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [bookSize, setBookSize] = useState({ width: 360, height: 520 });
  const bookRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setBookSize({
        width: mobile ? 280 : 360,
        height: mobile ? 400 : 520
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const contentPages = Array.from({ length: 15 }, (_, i) => {
    const num = i + 1;
    return {
      type: "content",
      title: `Pembagian ${num}`,
      content: Array.from({ length: 12 }, (_, j) => {
        const dividend = num * (j + 1);
        return `${dividend} ÷ ${num} = ${dividend / num}`;
      })
    };
  });

  let pages = [{ type: "cover" }, ...contentPages, { type: "end" }];
  if (pages.length % 2 !== 0) pages.push({ type: "blank" });

  return (
    <div className="notes-book">
      <HTMLFlipBook
        width={bookSize.width}
        height={bookSize.height}
        showCover={true}
        useMouseEvents={!isMobile}
        mobileScrollSupport={false}
        ref={bookRef}
        className="flip-book"
      >
        {pages.map((page, idx) => {
          if (page.type === "cover") {
            return (
              <div key={idx} className="page cover">
                <h2>📕 Buku Pembagian</h2>
                <p className="cover-sub">Tabel 1–15</p>
              </div>
            );
          } else if (page.type === "end") {
            return (
              <div key={idx} className="page end-page">
                <h2>🧠 Tamat!</h2>
                <p className="cover-sub">Terus semangat belajar!</p>
              </div>
            );
          } else if (page.type === "blank") {
            return <div key={idx} className="page" />;
          } else {
            return (
              <div key={idx} className="page">
                <h2>{page.title}</h2>
                <div className="page-list">
                  {page.content.map((line, i) => <p key={i}>{line}</p>)}
                </div>
              </div>
            );
          }
        })}
      </HTMLFlipBook>

      {isMobile && (
        <div className="nav-buttons">
          <button onClick={() => bookRef.current.pageFlip().flipPrev()}>⬅️</button>
          <button onClick={() => bookRef.current.pageFlip().flipNext()}>➡️</button>
        </div>
      )}
    </div>
  );
};

export default DivisionBook;
