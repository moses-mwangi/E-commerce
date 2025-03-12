import React from "react";
import LoadingState from "../components/loaders/LoadingState";

export default function page() {
  const name = "         Moses Mwangi";
  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
        dolores molestias aspernatur ad est quae repudiandae nulla, ipsam
        mollitia porro sapiente quam ipsa corporis, laboriosam saepe esse earum
        minus eius!
      </p>
      {/* <LoadingSpinner /> */}
      <p>{name}</p>
      <p>{name.trim()}</p>
      {/* <LoadingState /> */}
    </div>
  );
}
