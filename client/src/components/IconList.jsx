import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const IconList = () => {
  return (
    <div className="relative inline-block me-8 justify-center mt-2">
      <FontAwesomeIcon icon={faBookmark} className="text-blue-900" size="lg" />
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
        0
      </span>
    </div>
  );
};

export default IconList;
