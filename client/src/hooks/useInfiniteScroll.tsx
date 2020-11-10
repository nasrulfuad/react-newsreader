/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { debounce } from "../utils/debounce";
import { MAX_STORIES, STORY_INCREMENT } from "../constants";

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
