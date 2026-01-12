import { useState } from "react";
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


function ArticleSection () {
  const [currentCategory, setCurrentCategory] = useState("highlight");
  
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
      <article className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0">
        <BlogCard
          image={BlogPosts[0].image}
          category={BlogPosts[0].category}
          title={BlogPosts[0].title}
          description={BlogPosts[0].description}
          author={BlogPosts[0].author}
          date={BlogPosts[0].date}
        />
        <BlogCard
          image={BlogPosts[1].image}
          category={BlogPosts[1].category}
          title={BlogPosts[1].title}
          description={BlogPosts[1].description}
          author={BlogPosts[1].author}
          date={BlogPosts[1].date}
        />
        <BlogCard
          image={BlogPosts[2].image}
          category={BlogPosts[2].category}
          title={BlogPosts[2].title}
          description={BlogPosts[2].description}
          author={BlogPosts[2].author}
          date={BlogPosts[2].date}
        />
        <BlogCard
          image={BlogPosts[3].image}
          category={BlogPosts[3].category}
          title={BlogPosts[3].title}
          description={BlogPosts[3].description}
          author={BlogPosts[3].author}
          date={BlogPosts[3].date}
        />
        <BlogCard
          image={BlogPosts[4].image}
          category={BlogPosts[4].category}
          title={BlogPosts[4].title}
          description={BlogPosts[4].description}
          author={BlogPosts[4].author}
          date={BlogPosts[4].date}
        />
        <BlogCard
          image={BlogPosts[5].image}
          category={BlogPosts[5].category}
          title={BlogPosts[5].title}
          description={BlogPosts[5].description}
          author={BlogPosts[5].author}
          date={BlogPosts[5].date}
        />
      </article>
    </div>
  );
}


export default ArticleSection;