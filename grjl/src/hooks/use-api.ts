'use client';

import * as React from 'react';
import { api, cachedApiCall } from '@/lib/api';

// 通用API状态类型
interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// 通用API Hook
function useApiCall<T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = [],
  options: {
    immediate?: boolean;
    cacheKey?: string;
    cacheTtl?: number;
  } = {}
) {
  const { immediate = true, cacheKey, cacheTtl = 300000 } = options;
  
  const [state, setState] = React.useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = React.useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      let data: T;
      
      if (cacheKey) {
        data = await cachedApiCall(cacheKey, apiCall, cacheTtl);
      } else {
        data = await apiCall();
      }
      
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setState({ data: null, loading: false, error: errorMessage });
      throw error;
    }
  }, dependencies);

  React.useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    ...state,
    execute,
    refetch: execute,
  };
}

// Unsplash 相关 Hooks
export function useRandomPhoto(query?: string, orientation?: 'landscape' | 'portrait' | 'squarish') {
  return useApiCall(
    () => api.unsplash.getRandomPhoto(query, orientation),
    [query, orientation],
    {
      cacheKey: `unsplash-random-${query}-${orientation}`,
      cacheTtl: 600000, // 10分钟缓存
    }
  );
}

export function usePhotoSearch(query: string, page = 1, perPage = 12) {
  return useApiCall(
    () => api.unsplash.searchPhotos(query, page, perPage),
    [query, page, perPage],
    {
      immediate: !!query,
      cacheKey: `unsplash-search-${query}-${page}-${perPage}`,
      cacheTtl: 300000, // 5分钟缓存
    }
  );
}

// 天气相关 Hooks
export function useWeather(city = 'Beijing') {
  return useApiCall(
    () => api.weather.getCurrentWeather(city),
    [city],
    {
      cacheKey: `weather-${city}`,
      cacheTtl: 600000, // 10分钟缓存
    }
  );
}

// 名言相关 Hooks
export function useRandomQuote(tags?: string[]) {
  return useApiCall(
    () => api.quotes.getRandomQuote(tags),
    [tags?.join(',')],
    {
      cacheKey: `quote-${tags?.join(',') || 'random'}`,
      cacheTtl: 3600000, // 1小时缓存
    }
  );
}

export function useDesignQuote() {
  return useApiCall(
    () => api.quotes.getDesignQuote(),
    [],
    {
      cacheKey: 'design-quote',
      cacheTtl: 3600000, // 1小时缓存
    }
  );
}

// GitHub 相关 Hooks
export function useGithubUser(username: string) {
  return useApiCall(
    () => api.github.getUserInfo(username),
    [username],
    {
      immediate: !!username,
      cacheKey: `github-user-${username}`,
      cacheTtl: 1800000, // 30分钟缓存
    }
  );
}

export function useGithubRepos(username: string, sort = 'updated', perPage = 10) {
  return useApiCall(
    () => api.github.getUserRepos(username, sort, perPage),
    [username, sort, perPage],
    {
      immediate: !!username,
      cacheKey: `github-repos-${username}-${sort}-${perPage}`,
      cacheTtl: 1800000, // 30分钟缓存
    }
  );
}

// 组合 Hook - 获取首页所需的所有数据
export function useHomePageData() {
  const designQuote = useDesignQuote();
  const weather = useWeather();
  const heroImage = useRandomPhoto('design workspace', 'landscape');
  
  return {
    quote: designQuote,
    weather: weather,
    heroImage: heroImage,
    loading: designQuote.loading || weather.loading || heroImage.loading,
    error: designQuote.error || weather.error || heroImage.error,
    refetchAll: () => {
      designQuote.refetch();
      weather.refetch();
      heroImage.refetch();
    },
  };
}

// 组合 Hook - 获取作品集页面数据
export function usePortfolioPageData() {
  const designImages = usePhotoSearch('graphic design portfolio', 1, 12);
  const uiImages = usePhotoSearch('ui ux design', 1, 8);
  
  return {
    designImages: designImages,
    uiImages: uiImages,
    loading: designImages.loading || uiImages.loading,
    error: designImages.error || uiImages.error,
    refetchAll: () => {
      designImages.refetch();
      uiImages.refetch();
    },
  };
}

// 数据预加载 Hook
export function useDataPreloader() {
  const [preloadedData, setPreloadedData] = React.useState<{
    quotes: any[];
    images: any[];
    weather: any;
  }>({
    quotes: [],
    images: [],
    weather: null,
  });

  const preloadData = React.useCallback(async () => {
    try {
      // 预加载多个名言
      const quotesPromises = [
        api.quotes.getDesignQuote(),
        api.quotes.getRandomQuote(['creativity']),
        api.quotes.getRandomQuote(['inspiration']),
      ];
      
      // 预加载多张图片
      const imagesPromises = [
        api.unsplash.getRandomPhoto('design', 'landscape'),
        api.unsplash.getRandomPhoto('workspace', 'landscape'),
        api.unsplash.getRandomPhoto('creative', 'landscape'),
      ];
      
      // 预加载天气
      const weatherPromise = api.weather.getCurrentWeather();
      
      const [quotes, images, weather] = await Promise.all([
        Promise.all(quotesPromises),
        Promise.all(imagesPromises),
        weatherPromise,
      ]);
      
      setPreloadedData({ quotes, images, weather });
    } catch (error) {
      console.error('Data preloading failed:', error);
    }
  }, []);

  React.useEffect(() => {
    preloadData();
  }, [preloadData]);

  return {
    preloadedData,
    preloadData,
  };
}

// 离线数据管理 Hook
export function useOfflineData() {
  const [isOnline, setIsOnline] = React.useState(true);
  const [offlineData, setOfflineData] = React.useState<any>(null);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // 检查初始状态
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 保存数据到本地存储
  const saveOfflineData = React.useCallback((key: string, data: any) => {
    try {
      localStorage.setItem(`offline-${key}`, JSON.stringify({
        data,
        timestamp: Date.now(),
      }));
    } catch (error) {
      console.error('Failed to save offline data:', error);
    }
  }, []);

  // 从本地存储获取数据
  const getOfflineData = React.useCallback((key: string, maxAge = 3600000) => {
    try {
      const stored = localStorage.getItem(`offline-${key}`);
      if (!stored) return null;

      const { data, timestamp } = JSON.parse(stored);
      
      // 检查数据是否过期
      if (Date.now() - timestamp > maxAge) {
        localStorage.removeItem(`offline-${key}`);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Failed to get offline data:', error);
      return null;
    }
  }, []);

  return {
    isOnline,
    saveOfflineData,
    getOfflineData,
  };
}

// 错误重试 Hook
export function useRetryableApi<T>(
  apiCall: () => Promise<T>,
  maxRetries = 3,
  retryDelay = 1000
) {
  const [retryCount, setRetryCount] = React.useState(0);
  
  const executeWithRetry = React.useCallback(async (): Promise<T> => {
    try {
      const result = await apiCall();
      setRetryCount(0); // 重置重试计数
      return result;
    } catch (error) {
      if (retryCount < maxRetries) {
        setRetryCount(prev => prev + 1);
        
        // 等待后重试
        await new Promise(resolve => setTimeout(resolve, retryDelay * (retryCount + 1)));
        return executeWithRetry();
      } else {
        throw error;
      }
    }
  }, [apiCall, retryCount, maxRetries, retryDelay]);

  return {
    execute: executeWithRetry,
    retryCount,
    canRetry: retryCount < maxRetries,
  };
}
