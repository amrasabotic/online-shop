import React, { useState } from "react";

function Header({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideStyle = {
    backgroundImage: `url(${slides[currentIndex].url})`,
  };

  function goToPrevious() {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }

  function goToNext() {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }

  return (
    <div className="containerStyle">
      <div className="leftArrowStyle" onClick={goToPrevious}>
        {" "}
        &lt;{" "}
      </div>
      <div className="rightArrowStyle" onClick={goToNext}>
        {" "}
        &gt;{" "}
      </div>
      <div className="slideStyle" style={slideStyle}></div>
    </div>
  );
}

export default Header;
