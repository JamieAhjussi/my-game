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
import BlogPosts from "../../data/blogPost";
import BlogCard from "./BlogCard";
import axios from "axios";


function ArticleSection () {
  const [currentCategory, setCurrentCategory] = useState("highlight");
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  //ดึงข้อมูลจาก server//
  async function getPosts() {
    try {
      setIsLoading(true);
      const response = await axios.get("https://blog-post-project-api.vercel.app/posts");
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);
  
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
    </div>
  );
}


export default ArticleSection;