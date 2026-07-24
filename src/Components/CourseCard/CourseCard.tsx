import React, { useState } from "react";
import { FaRegHeart, FaHeart, FaStar, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleWishlist } from "../../features/courseSlice";
import { AppDispatch, RootState } from "../../app/store";

export interface CourseItem {
  id: string;
  userId: string;
  title: string;
  description?: string;
  videoUrl: string;
  author?: string;
  category?: string | string[];
  categories?: string | string[];
  tags?: string | string[];
  level?: string;
  price: number;
  views: number;
  likes?: string[];
  rating?: number;
  createdAt?: string;
}

interface CourseCardProps {
  item: CourseItem;
}

const timeAgo = (dateString?: string): string => {
  if (!dateString) return "Recently";

  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (isNaN(seconds) || seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} ${minutes === 1 ? "min" : "mins"} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} ${days === 1 ? "day" : "days"} ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} ${months === 1 ? "month" : "months"} ago`;

  const years = Math.floor(days / 365);
  return `${years} ${years === 1 ? "year" : "years"} ago`;
};

export const CourseCard: React.FC<CourseCardProps> = ({ item }) => {
  if (!item) return null;

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // RootState üçün təhlükəsiz tip təyini
  const user = useSelector((state: RootState) => (state as Record<string, any>).auth?.user);
  const currentUserId: string | null = user?.id || localStorage.getItem("userId");

  const isWishlisted =
    Boolean(currentUserId) &&
    Array.isArray(item.likes) &&
    item.likes.includes(currentUserId!);

  const handleWishlistClick = () => {
    if (!currentUserId) {
      navigate("/login");
      return;
    }
    dispatch(toggleWishlist({ courseId: item.id, userId: currentUserId }));
  };

  const getEmbedUrl = (url: string): string => {
    if (!url) return "";
    if (url.includes("youtube.com/embed/")) return url;

    let videoId = "";
    if (url.includes("v=")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const rawCategory = item.category || item.categories || item.tags;
  let categoriesArray: string[] = [];
  if (Array.isArray(rawCategory)) {
    categoriesArray = rawCategory;
  } else if (typeof rawCategory === "string") {
    categoriesArray = rawCategory.split(",").map((c) => c.trim());
  }

  const visibleCategories = categoriesArray.slice(0, 2);
  const hiddenCategories = categoriesArray.slice(2);

  return (
    <div className="rounded-2xl shadow-lg border bg-white overflow-hidden transition-all duration-300 h-full flex flex-col justify-between">
      <div className="relative h-[200px] shrink-0">
        <iframe
          src={getEmbedUrl(item.videoUrl)}
          title={item.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full rounded-t-2xl object-cover"
        ></iframe>
        <span className="absolute left-3 top-3 rounded-md bg-black/70 backdrop-blur-md px-2.5 py-1 text-xs text-white font-medium shadow-sm">
          {timeAgo(item.createdAt)}
        </span>

        <button
          type="button"
          onClick={handleWishlistClick}
          className="absolute right-4 top-4 rounded-full bg-black text-white p-3 shadow hover:scale-110 transition-transform"
        >
          {isWishlisted ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="hover:text-red-500 transition-colors" />
          )}
        </button>
      </div>

      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex flex-wrap gap-1.5 items-center transition-all duration-300">
            {visibleCategories.map((cat, index) => (
              <span
                key={index}
                className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600 max-w-[120px] truncate inline-block"
              >
                {cat}
              </span>
            ))}

            {hiddenCategories.length > 0 && !isExpanded && (
              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                className="rounded-full bg-gray-100 hover:bg-gray-200 px-2.5 py-1 text-xs text-gray-600 font-semibold transition-colors duration-200"
              >
                +{hiddenCategories.length}
              </button>
            )}

            <div
              className={`w-full flex flex-wrap gap-1.5 transition-all duration-300 overflow-hidden ${
                isExpanded ? "max-h-24 mt-2 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {hiddenCategories.map((cat, index) => (
                <span
                  key={index}
                  className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-600 max-w-[120px] truncate inline-block"
                >
                  {cat}
                </span>
              ))}

              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="text-xs text-red-500 hover:underline ml-auto font-medium"
              >
                Hide
              </button>
            </div>
          </div>

          <h3 className="mt-3 text-xl font-bold line-clamp-1">{item.title}</h3>
          <p className="text-gray-500 mt-1">{item.author || "Instructor"}</p>
        </div>

        <div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-semibold">
                <FaStar className="text-yellow-400" />
                {item.rating || 5.0}
              </span>
              <span className="text-gray-500">{item.views || 0} views</span>
            </div>

            <span className="text-xs text-gray-500 font-medium">
              • {timeAgo(item.createdAt)}
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-2xl font-bold">${item.price}</span>
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-white hover:bg-gray-800 transition-colors"
            >
              <FaShoppingCart />
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;