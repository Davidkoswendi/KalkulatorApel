// src/pages/PowerBook.js
import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import "../styles/notesBook.css";

const PowerBook = () => {
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

  const contentPages = Array.from({ length: 3 }, (_, i) => {
    const base = i * 10 + 1;
    return {
      type: "content",
      title: `Pangkat 2 (${base} – ${base + 9})`,
      content: Array.from({ length: 10 }, (_, j) => {
        const num = base + j;
        return `${num}² = ${num * num}`;
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
                <h2>📗 Buku Pangkat 2</h2>
                <p className="cover-sub">1² sampai 30²</p>
              </div>
            );
          } else if (page.type === "end") {
            return (
              <div key={idx} className="page end-page">
                <h2>✨ Tamat!</h2>
                <p className="cover-sub">Kamu hebat!</p>
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

export default PowerBook;
