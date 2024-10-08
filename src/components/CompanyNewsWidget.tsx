import { useState, useEffect } from 'react';

interface CompanyNewsWidgetProps {
  symbol: string;
}

interface NewsArticle {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

const CompanyNewsWidget = ({ symbol }: CompanyNewsWidgetProps) => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/company-news?symbol=${symbol}`);
        const data = await res.json();
        if (res.ok) {
          setNews(data);
        } else {
          setError(data.error || 'Failed to fetch data');
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      fetchNews();
    }
  }, [symbol]);

  const SkeletonLoader = () => (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="rounded-lg bg-gray-300 dark:bg-gray-700 p-4 gap-3 animate-pulse">
          <div className="h-6 bg-gray-400 dark:bg-gray-600 rounded mb-2"></div>
          <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded mb-2"></div>
          <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 bg-surface0 dark:bg-surface0 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-bold text-text dark:text-text mb-4">Company News for {symbol}</h2>
      <div className="space-y-4">
        {news.slice(0, 20).map((article) => (
          <div key={article.id} className="rounded-lg bg-overlay0 dark:bg-mantle p-4">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-text dark:text-text hover:underline">
              <h3 className="text-lg font-semibold mb-2">{article.headline}</h3>
              <p className="text-sm text-subtext0 dark:text-subtext1 mb-2">{article.source} | {new Date(article.datetime * 1000).toLocaleDateString()}</p>
              <p className="text-sm text-text dark:text-text">{article.summary}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyNewsWidget;