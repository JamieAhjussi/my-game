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
import {useNavigate} from "react-router-dom";
import { useSearchSuggestions } from "@/hooks/useSearchSuggestions";
import { useBlogPosts } from "@/hooks/useBlogPosts";


function ArticleSection () {
  const navigate = useNavigate();
  const [currentCategory, setCurrentCategory] = useState("highlight");
  
  const { 
    posts, 
    isLoading, 
    hasMore, 
    isFetchMoreLoading, 
    loadMore 
  } = useBlogPosts(currentCategory);

  const {
    searchText,
    setSearchText,
    showSuggestions,
    setShowSuggestions,
    selectedIndex,
    suggestions,
    searchRef,
    handleKeyDown,
    handleSelectSuggestion,
  } = useSearchSuggestions(posts, "title");
  
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
          <div className="relative" ref={searchRef}>
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={handleKeyDown}
              className="py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
            />
            {showSuggestions && searchText.trim() !== "" && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 shadow-xl rounded-md z-50 overflow-hidden py-1">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`px-4 py-2.5 flex items-center gap-3 cursor-pointer text-sm transition-colors ${
                      selectedIndex === index
                        ? "bg-gray-100"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleSelectSuggestion(suggestion)}
                  >
                    <Search className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="truncate">{suggestion}</span>
                  </div>
                ))}
              </div>
            )}
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
            onClick={loadMore}
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