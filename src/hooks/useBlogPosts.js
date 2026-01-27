import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Custom hook to handle blog post fetching and pagination
 * @param {string} category - The category to filter by
 * @returns {Object} Posts data, loading states, and pagination controls
 */
export function useBlogPosts(category = "highlight") {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchMoreLoading, setIsFetchMoreLoading] = useState(false);

  async function getPosts(pageNumber = 1, isAppend = false) {
    try {
      if (isAppend) {
        setIsFetchMoreLoading(true);
      } else {
        setIsLoading(true);
      }

      const categoryParam = category === "highlight" ? "" : category;
      const response = await axios.get(
        `https://blog-post-project-api.vercel.app/posts?page=${pageNumber}&limit=6&category=${categoryParam}`
      );

      const newPosts = response.data.posts;

      if (isAppend) {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      } else {
        setPosts(newPosts);
      }

      // If we got fewer than 6 posts, it means there are no more articles to load
      if (newPosts.length < 6) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
      setIsFetchMoreLoading(false);
    }
  }

  // Effect to reset and fetch when category changes
  useEffect(() => {
    setPage(1);
    getPosts(1, false);
  }, [category]);

  const loadMore = () => {
    if (isFetchMoreLoading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    getPosts(nextPage, true);
  };

  return {
    posts,
    isLoading,
    hasMore,
    isFetchMoreLoading,
    loadMore,
  };
}
