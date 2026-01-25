import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BlogCard from "./BlogCard";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function ArticleSection () {
  const navigate = useNavigate();
  const [currentCategory, setCurrentCategory] = useState("highlight");
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchMoreLoading, setIsFetchMoreLoading] = useState(false);

  //ดึงข้อมูลจาก server//
  async function getPosts(pageNumber = 1, isAppend = false) {
    try {
      if (isAppend) {
        setIsFetchMoreLoading(true);
      } else {
        setIsLoading(true);
      }
      
      const categoryParam = currentCategory === "highlight" ? "" : currentCategory;
      const response = await axios.get(`https://blog-post-project-api.vercel.app/posts?page=${pageNumber}&limit=6&category=${categoryParam}`);
      
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

  useEffect(() => {
    setPage(1);
    getPosts(1, false);
  }, [currentCategory]);

  const handleViewMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    getPosts(nextPage, true);
  };
  
  const categories = [
    { value: "highlight", label: "Highlight" },
    { value: "cat", label: "Cat" },
    { value: "inspiration", label: "Inspiration" },
    { value: "general", label: "General" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto md:px-6 lg:px-8 mb-20">
      <h2 className="text-xl font-bold mb-4 px-4">Latest articles</h2>
      <div className="bg-[#EFEEEB] px-4 py-4 md:py-3 md:rounded-sm flex flex-col space-y-4 md:flex-row-reverse md:items-center md:space-y-0 md:justify-between">
        <div className="w-full md:max-w-sm">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
            />
          </div>
        </div>
        <div className="md:hidden w-full">
          <Select value={currentCategory} onValueChange={setCurrentCategory}>
            <SelectTrigger className="w-full py-3 rounded-sm text-muted-foreground">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="hidden md:flex space-x-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setCurrentCategory(category.value)}
              className={`px-4 py-3 transition-colors rounded-sm text-sm font-medium ${
                currentCategory === category.value
                  ? "bg-[#DAD6D1] text-foreground"
                  : "text-muted-foreground hover:bg-black/5"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
      <article className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0">
        {isLoading ? (
          <div className="col-span-full py-20 text-center text-muted-foreground">
            Loading articles...
          </div>
        ) : (
          (() => {
            const filteredPosts = posts.filter((post) => {
              const matchesCategory =
                currentCategory === "highlight" ||
                post.category.toLowerCase() === currentCategory.toLowerCase();
              const matchesSearch =
                post.title.toLowerCase().includes(searchText.toLowerCase()) ||
                post.description.toLowerCase().includes(searchText.toLowerCase());
              return matchesCategory && matchesSearch;
            });

            if (filteredPosts.length === 0) {
              return (
                <div className="col-span-full py-20 text-center text-muted-foreground">
                  No articles found matching your criteria.
                </div>
              );
            }

            return filteredPosts.map((post) => (
              <BlogCard
                key={post.id}
                id={post.id}
                image={post.image}
                category={post.category}
                title={post.title}
                description={post.description}
                author={post.author}
                date={new Intl.DateTimeFormat('en-GB', { 
                day: '2-digit', 
                month: '2-digit', 
                year: '2-digit' 
              }).format(new Date(post.date))}
              />
            ));
          })()
        )}
      </article>
      <div className="flex justify-center mt-8">
        {hasMore && (
          <button
            onClick={handleViewMore}
            disabled={isFetchMoreLoading}
            className="px-4 py-3 transition-colors rounded-sm text-sm font-medium bg-[#DAD6D1] text-foreground disabled:opacity-50"
          >
            {isFetchMoreLoading ? "Loading..." : "View more"}
          </button>
        )}
      </div>
    </div>
  );
}


export default ArticleSection;