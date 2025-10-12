// src/components/StarRating.jsx
import React from "react";
import { Star } from "lucide-react";

export default function StarRating({ value, onChange, size = 22 }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          type="button"
          key={i}
          onClick={() => onChange?.(i)}
          className="focus:outline-none"
          title={`${i} star`}
        >
          <Star
            className={`transition ${i <= value ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
            style={{ width: size, height: size }}
          />
        </button>
      ))}
    </div>
  );
}
