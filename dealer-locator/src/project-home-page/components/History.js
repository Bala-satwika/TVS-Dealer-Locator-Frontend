import React, { useRef, useState, useEffect } from 'react';
import './History.css'; // Import the CSS for styling

const History = () => {
  const scrollRef = useRef(null);
  const scrollbarRef = useRef(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollPos, setStartScrollPos] = useState(0);

  const handleScroll = () => {
    const container = scrollRef.current;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const scrollPercentage = (container.scrollLeft / maxScrollLeft) * 100;
    setScrollPos(scrollPercentage);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartScrollPos(scrollPos);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const maxScrollLeft = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      const dragDistance = e.clientX - startX;
      const dragPercentage = (dragDistance / scrollbarRef.current.clientWidth) * 100;
      const newScrollPos = Math.min(100, Math.max(0, startScrollPos + dragPercentage));
      setScrollPos(newScrollPos);

      // Scroll the image container accordingly
      scrollRef.current.scrollLeft = (newScrollPos / 100) * maxScrollLeft;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    // Add mousemove and mouseup event listeners when dragging starts
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="scrollContainer" style={{ backgroundImage: 'url(https://www.tvsmotor.com/IBCountry_Assets/images/white-texture.jpg)' }}>
 
      <div className="imageContainer" ref={scrollRef} onScroll={handleScroll}>
        <img
          src="/timeline-2.png" // Path to your image in public folder
          alt="Scrollable Wide Image"
          className="scrollableImage"
        />
      </div>
      <div className="scrollbar" ref={scrollbarRef} onMouseDown={handleMouseDown}>
        <div
          className="scrollIndicator"
          style={{ left: `${scrollPos}%` }}
        ></div>
      </div>
    </div>
  );
};

export default History;
