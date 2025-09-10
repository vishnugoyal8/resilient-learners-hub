import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  NewspaperIcon, 
  MapPinIcon, 
  CalendarDaysIcon,
  ArrowTopRightOnSquareIcon 
} from '@heroicons/react/24/outline';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  source: string;
  url: string;
  region: string;
  category: 'flood' | 'earthquake' | 'fire' | 'cyclone' | 'heatwave' | 'general';
}

const mockNews: NewsArticle[] = [
  {
    id: '1',
    title: 'Floods Disrupt Life in Northern Region',
    description: 'Heavy rains have caused severe flooding in the northern region, affecting thousands of residents. Relief efforts are underway.',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=240&fit=crop',
    publishedAt: new Date().toISOString(),
    source: 'Emergency News Network',
    url: '#',
    region: 'north',
    category: 'flood'
  },
  {
    id: '2',
    title: 'Earthquake Shakes Eastern Region',
    description: 'A 6.2 magnitude earthquake struck the eastern region early this morning. Emergency services are responding to affected areas.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=240&fit=crop',
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    source: 'Disaster Watch',
    url: '#',
    region: 'east',
    category: 'earthquake'
  },
  {
    id: '3',
    title: 'Heatwave Continues in Southern Region',
    description: 'Temperatures remain dangerously high in the southern region. Authorities advise residents to take precautions against heat-related illnesses.',
    image: 'https://images.unsplash.com/photo-1504370805625-d32c54b16100?w=400&h=240&fit=crop',
    publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    source: 'Climate Alert',
    url: '#',
    region: 'south',
    category: 'heatwave'
  },
  {
    id: '4',
    title: 'Wildfires Rage in Western Region',
    description: 'Wildfires have spread rapidly in the western region due to dry conditions. Evacuations are in progress in affected communities.',
    image: 'https://images.unsplash.com/photo-1574869381285-af0c2d34ba6c?w=400&h=240&fit=crop',
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    source: 'Fire Safety News',
    url: '#',
    region: 'west',
    category: 'fire'
  }
];

const regions = [
  { value: 'all', label: 'All Regions' },
  { value: 'north', label: 'North Region' },
  { value: 'south', label: 'South Region' },
  { value: 'east', label: 'East Region' },
  { value: 'west', label: 'West Region' },
  { value: 'central', label: 'Central Region' }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'flood':
      return 'bg-blue-100 text-blue-800';
    case 'earthquake':
      return 'bg-amber-100 text-amber-800';
    case 'fire':
      return 'bg-red-100 text-red-800';
    case 'cyclone':
      return 'bg-purple-100 text-purple-800';
    case 'heatwave':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const DisasterNews = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [news, setNews] = useState<NewsArticle[]>(mockNews);
  const [loading, setLoading] = useState(false);

  // Filter news by region
  const filteredNews = selectedRegion === 'all' 
    ? news 
    : news.filter(article => article.region === selectedRegion);

  // Fetch disaster news from News API
  useEffect(() => {
    const fetchDisasterNews = async () => {
      try {
        setLoading(true);
        
        // Note: In a real app, you'd use environment variables for the API key
        // For demo purposes, we'll use mock data but show the API structure
        
        // const response = await axios.get(
        //   `https://newsapi.org/v2/everything?q=disaster+emergency+flood+earthquake&apiKey=YOUR_API_KEY&sortBy=publishedAt&pageSize=20`
        // );
        
        // Transform API response to match our interface
        // const articles = response.data.articles.map((article: any, index: number) => ({
        //   id: `api-${index}`,
        //   title: article.title,
        //   description: article.description || article.content?.substring(0, 150) + '...',
        //   image: article.urlToImage || 'https://images.unsplash.com/photo-1504817343863-5092a923803e?w=400&h=240&fit=crop',
        //   publishedAt: article.publishedAt,
        //   source: article.source.name,
        //   url: article.url,
        //   region: 'general', // You'd implement region detection based on content
        //   category: 'general' // You'd implement category detection based on content
        // }));
        
        // setNews(prevNews => [...articles, ...prevNews]);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching disaster news:', error);
        setLoading(false);
      }
    };

    fetchDisasterNews();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section id="news" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gradient-hero sm:text-4xl mb-4">
            Disaster News & Updates
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Stay informed with the latest disaster-related news and emergency updates from across all regions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="disaster-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <NewspaperIcon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Filter by Region</CardTitle>
                </div>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region.value} value={region.value}>
                        {region.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredNews.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="disaster-card h-full group">
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className={getCategoryColor(article.category)}>
                        {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-sm">
                        {regions.find(r => r.value === article.region)?.label || 'General'}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <CalendarDaysIcon className="h-4 w-4" />
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                      <span>•</span>
                      <span>{article.source}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 flex-1 flex flex-col">
                    <CardDescription className="text-muted-foreground flex-1 mb-4">
                      {article.description}
                    </CardDescription>
                    
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      onClick={() => window.open(article.url, '_blank')}
                    >
                      Read Full Article
                      <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Card className="disaster-card max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <NewspaperIcon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-muted-foreground">
                Our news feed is updated in real-time with the latest disaster-related information 
                from trusted sources and emergency management agencies.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default DisasterNews;