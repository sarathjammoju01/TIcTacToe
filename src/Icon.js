import React from "react";
import { FaPen } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

export default function Icon({ player }) {
  switch (player) {
    case "empty":
      return <FaPen />;
    case "cross":
      return <FaTimes />;
    case "circle": // Fixed the typo here
      return <FaRegCircle />;
    default:
      return null;
  }
}
