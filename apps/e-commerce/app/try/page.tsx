import React from "react";
import LoadingState from "../components/LoadingState";

export default function page() {
  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
        dolores molestias aspernatur ad est quae repudiandae nulla, ipsam
        mollitia porro sapiente quam ipsa corporis, laboriosam saepe esse earum
        minus eius!
      </p>
      {/* <LoadingSpinner /> */}
      <LoadingState />
    </div>
  );
}
