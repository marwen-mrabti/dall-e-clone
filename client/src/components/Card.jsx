import React from "react";

import { download } from "../assets";
import { downloadImage } from "../utils";

const Card = ({ post }) => {
  return (
    <div className="rounded-2xl group relative shadow-card hover:shadow-cardhover card">
      <img
        src={post.photoUrl}
        alt={post.prompt}
        className="w-full h-auto object-cover rounder-2xl"
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-4 p-6 rounded-lg">
        <p
          className="font-semibold text-md text-slate-100
         overflow-y-auto "
        >
          {post.prompt}
        </p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-[2rem] h-[2rem] rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {post.name[0]}
            </div>
            <p className="text-white text-md">{post.name}</p>
          </div>
          <button
            type="button"
            onClick={() => downloadImage(post._id, post.photoUrl)}
            className="outline-none bg-transparent border-none"
          >
            <img
              src={download}
              alt="download"
              className="w-[2rem] h-[2rem] object-contain invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
