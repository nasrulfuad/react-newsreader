import { useState, useEffect } from "react";
import { MAX_STORIES, STORY_INCREMENT } from "../constants";
import { debounce } from "../utils/debounce";

export const useInfiniteScroll = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(STORY_INCREMENT);

  const handleScroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      setIsLoading(true);
    }
  }, 500);

  useEffect(() => {
    if (!isLoading) return;

    if (count + STORY_INCREMENT >= MAX_STORIES) {
      setCount(MAX_STORIES);
    } else {
      setCount(count + STORY_INCREMENT);
    }

    setIsLoading(false);
  }, [count, isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { count };
};
