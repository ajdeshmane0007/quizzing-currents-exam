
import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import CurrentAffairCard from '@/components/common/CurrentAffairCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileSearch } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const CurrentAffairs: React.FC = () => {
  const { currentAffairs } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
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

  return (
    <MainLayout>
      <PageHeader
        title="Current Affairs"
        description={!isMobile ? "Stay updated with the latest news and developments around the world." : ""}
      />
      
      <div className="mb-4 space-y-3 sm:space-y-0 sm:grid sm:gap-3 sm:grid-cols-3">
        <div className="relative sm:col-span-2">
          <FileSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={category || ""} onValueChange={(val) => setCategory(val || null)}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {sortedArticles.length === 0 ? (
        <p className="text-center py-8 text-muted-foreground">No current affairs found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {sortedArticles.map((article) => (
            <CurrentAffairCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default CurrentAffairs;
