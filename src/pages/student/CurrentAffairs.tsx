
import React, { useState, useRef } from 'react';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import CurrentAffairCard from '@/components/common/CurrentAffairCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileSearch, Newspaper, Tag } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { type CarouselApi } from '@/components/ui/carousel';

const CurrentAffairs: React.FC = () => {
  const { currentAffairs } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [api, setApi] = useState<CarouselApi>();
  
  // Extract unique categories
  const categories = Array.from(
    new Set(currentAffairs.map((article) => article.category))
  );
  
  // Filter current affairs based on search term and category
  const filteredArticles = currentAffairs.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.content.toLowerCase().includes(search.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    
    const matchesCategory = category ? article.category === category : true;
    
    return matchesSearch && matchesCategory;
  });

  // Sort by date (newest first)
  const sortedArticles = [...filteredArticles].sort(
    (a, b) => b.publishedDate.getTime() - a.publishedDate.getTime()
  );

  const handleNext = () => {
    if (api) {
      api.scrollNext();
    }
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="bg-gradient-to-r from-teal-600 to-emerald-500 rounded-lg p-6 shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Current Affairs</h1>
          <p className="text-white/80 text-sm md:text-base">
            {!isMobile ? "Stay updated with the latest news and developments around the world." : "Latest news for your exams"}
          </p>
        </div>
      </div>
      
      <div className="mb-6 space-y-4 sm:space-y-0 sm:grid sm:gap-4 sm:grid-cols-3">
        <div className="relative sm:col-span-2">
          <FileSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 border-teal-100 focus-visible:ring-teal-500 bg-white shadow-sm"
          />
        </div>
        
        <Select value={category || "all"} onValueChange={(val) => setCategory(val === "all" ? null : val)}>
          <SelectTrigger className="border-teal-100 focus-visible:ring-teal-500 bg-white shadow-sm">
            <div className="flex items-center">
              <Tag className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {sortedArticles.length === 0 ? (
        <div className="bg-slate-50 rounded-lg p-8 text-center shadow-md">
          <Newspaper className="h-12 w-12 mx-auto text-slate-400 mb-3" />
          <p className="text-slate-500 font-medium">No current affairs found based on your filters.</p>
        </div>
      ) : (
        <div className="relative bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-bold mb-4 text-teal-800 border-b border-teal-100 pb-3 flex items-center">
            <Newspaper className="mr-2 h-5 w-5 text-teal-600" />
            Latest News
          </h3>
          
          <Carousel setApi={setApi} opts={{ align: "start" }}>
            <CarouselContent className="h-full">
              {sortedArticles.map((article, index) => (
                <CarouselItem key={article.id} className="md:basis-1/2">
                  <CurrentAffairCard 
                    article={article} 
                    onNext={index < sortedArticles.length - 1 ? handleNext : undefined} 
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:block">
              <CarouselPrevious className="-left-3 top-1/2 bg-white" />
              <CarouselNext className="-right-3 top-1/2 bg-white" />
            </div>
          </Carousel>
        </div>
      )}
    </MainLayout>
  );
};

export default CurrentAffairs;
