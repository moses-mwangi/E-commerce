import axios from "axios";
import React from "react";

export default function EcomercePage() {
  async function first() {
    const data = await axios.get("http://127.0.0.1:8010/api/users");
    console.log(data);
  }
  return (
    <div>
      <div>E-commerce page</div>
      <div
        onClick={() => {
          console.log(first());
        }}
      >
        <button>CLICK ME</button>
      </div>
    </div>
  );
}
