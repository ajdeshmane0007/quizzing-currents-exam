
import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import CurrentAffairCard from '@/components/common/CurrentAffairCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileSearch, Newspaper, Tag, ChevronUp, Lightbulb, BookOpen, Brain, Search, Filter, X, Calendar, RefreshCcw } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const CurrentAffairs: React.FC = () => {
  const { currentAffairs } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'full' | 'immersive'>('full');
  const containerRef = useRef<HTMLDivElement>(null);
  
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

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.y < -threshold && currentIndex < sortedArticles.length - 1) {
      // Swiped up, go to next article
      setDirection(-1);
      setCurrentIndex(prev => prev + 1);
    } else if (info.offset.y > threshold && currentIndex > 0) {
      // Swiped down, go to previous article
      setDirection(1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      y: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      y: direction < 0 ? 500 : -500,
      opacity: 0
    })
  };

  // Auto-adjust the container height based on content
  useEffect(() => {
    if (containerRef.current && sortedArticles.length > 0) {
      const cardElement = document.querySelector('.current-affair-card');
      if (cardElement) {
        containerRef.current.style.height = `${cardElement.clientHeight}px`;
      }
    }
  }, [sortedArticles, currentIndex]);

  // If no articles found
  if (sortedArticles.length === 0) {
    return (
      <MainLayout>
        <div className="mb-6">
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg p-6 shadow-lg">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Current Affairs</h1>
            <p className="text-white/80 text-sm md:text-base">
              {!isMobile ? "Stay updated with the latest news and developments around the world." : "Latest news for your exams"}
            </p>
          </div>
        </div>
        
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 border-purple-100 focus-visible:ring-purple-500 bg-white shadow-sm"
            />
          </div>
          
          <Select value={category || "all"} onValueChange={(val) => setCategory(val === "all" ? null : val)}>
            <SelectTrigger className="border-purple-100 focus-visible:ring-purple-500 bg-white shadow-sm">
              <div className="flex items-center">
                <Tag className="mr-2 h-4 w-4 text-purple-600" />
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
        
        <div className="bg-slate-50 rounded-lg p-8 text-center shadow-md">
          <Newspaper className="h-12 w-12 mx-auto text-purple-300 mb-3" />
          <p className="text-slate-500 font-medium">No current affairs found based on your filters.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearch('');
              setCategory(null);
            }}
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Reset Filters
          </Button>
        </div>
      </MainLayout>
    );
  }

  // End of current affairs - show quiz suggestion card
  const isAllArticlesViewed = currentIndex >= sortedArticles.length;

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg p-6 shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center">
            <Newspaper className="mr-3 h-6 w-6 md:h-7 md:w-7" />
            Current Affairs
          </h1>
          <p className="text-white/80 text-sm md:text-base">
            {!isMobile ? "Stay updated with the latest news and developments around the world." : "Latest news for your exams"}
          </p>
        </div>
      </div>
      
      {/* Filter toolbar */}
      <div className="mb-6 bg-white rounded-lg shadow-md p-4 border border-purple-100">
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 border-purple-100 focus-visible:ring-purple-500"
            />
          </div>
          
          <div className="flex gap-3 items-center">
            <Select value={category || "all"} onValueChange={(val) => setCategory(val === "all" ? null : val)}>
              <SelectTrigger className="w-[180px] border-purple-100 focus-visible:ring-purple-500">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4 text-purple-600" />
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
            
            {(search || category) && (
              <Button 
                size="icon"
                variant="ghost" 
                onClick={() => {
                  setSearch('');
                  setCategory(null);
                }}
                title="Clear filters"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* View mode tabs */}
      <div className="mb-6">
        <Tabs defaultValue="full" value={viewMode} onValueChange={(value) => setViewMode(value as 'card' | 'full' | 'immersive')} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-purple-50 rounded-lg border border-purple-100">
            <TabsTrigger value="full" className="data-[state=active]:bg-white data-[state=active]:text-purple-700">
              <div className="flex items-center">
                <Newspaper className="h-4 w-4 mr-2" />
                <span>Full View</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="card" className="data-[state=active]:bg-white data-[state=active]:text-purple-700">
              <div className="flex items-center">
                <Card className="h-4 w-4 mr-2" />
                <span>Grid View</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="immersive" className="data-[state=active]:bg-white data-[state=active]:text-purple-700">
              <div className="flex items-center">
                <Lightbulb className="h-4 w-4 mr-2" />
                <span>Immersive</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Fixed Quiz Button in right corner */}
      <div className="fixed right-4 bottom-20 z-50">
        <Button 
          asChild
          size="lg"
          className="rounded-full shadow-lg p-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
        >
          <Link to="/quizzes">
            <Brain className="h-6 w-6" />
            <span className="ml-2">Take a Quiz</span>
          </Link>
        </Button>
      </div>
      
      {viewMode === 'immersive' ? (
        /* TikTok-style swipeable interface */
        <div className="relative h-[600px] bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg shadow-md overflow-hidden" ref={containerRef}>
          <div className="absolute left-4 top-4 z-10 text-xs bg-black/60 text-white px-2 py-1 rounded-full">
            {isAllArticlesViewed ? 'End' : `${currentIndex + 1}/${sortedArticles.length}`}
          </div>
          
          <AnimatePresence custom={direction}>
            {isAllArticlesViewed ? (
              <motion.div
                key="end-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute w-full h-full flex justify-center items-center px-4 py-6"
              >
                <div className="w-full max-w-md">
                  <Card className="border-2 border-purple-200 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                      <CardTitle className="text-center flex items-center justify-center">
                        <Lightbulb className="h-5 w-5 mr-2" />
                        You're All Caught Up!
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 text-center">
                      <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="h-10 w-10 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Ready to test your knowledge?</h3>
                      <p className="text-gray-600 mb-4">Now that you're up to date with current affairs, test your understanding with our quizzes.</p>
                    </CardContent>
                    <CardFooter className="flex justify-center pb-6 gap-3">
                      <Button asChild className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                        <Link to="/quizzes">Try a Quiz</Link>
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setCurrentIndex(0)}
                      >
                        Start Over
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </motion.div>
            ) : (
              sortedArticles[currentIndex] && (
                <motion.div
                  key={sortedArticles[currentIndex].id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    y: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={1}
                  onDragEnd={handleDragEnd}
                  className="absolute w-full h-full flex justify-center items-center px-4 py-6"
                >
                  <div className="w-full max-w-md current-affair-card">
                    <CurrentAffairCard 
                      article={sortedArticles[currentIndex]} 
                      onNext={currentIndex < sortedArticles.length - 1 ? () => {
                        setDirection(-1);
                        setCurrentIndex(prev => prev + 1);
                      } : undefined}
                      fullContent={true}
                    />
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
          
          {/* Swipe instruction */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <div className="bg-black/60 text-white text-xs rounded-full px-3 py-1 flex items-center gap-1">
              <span>Swipe</span>
              <ChevronUp className="h-3 w-3" />
              <span>to navigate</span>
            </div>
          </div>
        </div>
      ) : viewMode === 'card' ? (
        /* Card grid view */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
          {sortedArticles.map((article) => (
            <motion.div 
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <CurrentAffairCard 
                article={article} 
                isPremium={article.isPremium}
                fullContent={false}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        /* Full list view with enhanced cards */
        <div className="space-y-6 pb-24">
          {sortedArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-purple-100 hover:border-purple-300 transition-all hover:shadow-md">
                <div className="grid md:grid-cols-3 gap-4">
                  {article.imageUrl && (
                    <div className="md:col-span-1 h-48 md:h-full relative">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="h-full w-full object-cover" 
                      />
                      {article.isPremium && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black">
                            <Shield className="h-3 w-3 mr-1" /> Premium
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className={`p-5 ${article.imageUrl ? 'md:col-span-2' : 'md:col-span-3'}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold text-purple-900">{article.title}</h3>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <Calendar className="h-3.5 w-3.5 mr-1" /> 
                          {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }).format(article.publishedDate)}
                        </div>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">{article.category}</Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">{article.content}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button asChild className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                      <Link to={`/current-affairs/${article.id}`}>
                        Read Full Article
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default CurrentAffairs;
