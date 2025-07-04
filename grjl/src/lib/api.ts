/**
 * API服务层
 * 统一管理所有外部API调用
 */

// API配置
const API_CONFIG = {
  unsplash: {
    baseUrl: 'https://api.unsplash.com',
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || 'demo-key',
  },
  weather: {
    baseUrl: 'https://api.openweathermap.org/data/2.5',
    apiKey: process.env.NEXT_PUBLIC_WEATHER_API_KEY || 'demo-key',
  },
  quotes: {
    baseUrl: 'https://api.quotable.io',
  },
  github: {
    baseUrl: 'https://api.github.com',
    token: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
  }
};

// 通用请求函数
async function apiRequest<T>(
  url: string, 
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Unsplash API 服务
export const unsplashApi = {
  // 获取随机图片
  async getRandomPhoto(query?: string, orientation?: 'landscape' | 'portrait' | 'squarish') {
    try {
      const params = new URLSearchParams({
        client_id: API_CONFIG.unsplash.accessKey,
        ...(query && { query }),
        ...(orientation && { orientation }),
      });

      const data = await apiRequest<any>(
        `${API_CONFIG.unsplash.baseUrl}/photos/random?${params}`
      );

      return {
        id: data.id,
        url: data.urls.regular,
        thumb: data.urls.thumb,
        alt: data.alt_description || data.description || 'Unsplash image',
        author: {
          name: data.user.name,
          username: data.user.username,
          profile: data.user.links.html,
        },
        downloadUrl: data.links.download_location,
      };
    } catch (error) {
      console.error('Unsplash API error:', error);
      // 返回默认图片
      return {
        id: 'default',
        url: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop',
        thumb: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop',
        alt: 'Default design image',
        author: {
          name: 'Unsplash',
          username: 'unsplash',
          profile: 'https://unsplash.com',
        },
        downloadUrl: '#',
      };
    }
  },

  // 搜索图片
  async searchPhotos(query: string, page = 1, perPage = 12) {
    try {
      const params = new URLSearchParams({
        client_id: API_CONFIG.unsplash.accessKey,
        query,
        page: page.toString(),
        per_page: perPage.toString(),
      });

      const data = await apiRequest<any>(
        `${API_CONFIG.unsplash.baseUrl}/search/photos?${params}`
      );

      return {
        results: data.results.map((photo: any) => ({
          id: photo.id,
          url: photo.urls.regular,
          thumb: photo.urls.thumb,
          alt: photo.alt_description || photo.description || 'Unsplash image',
          author: {
            name: photo.user.name,
            username: photo.user.username,
            profile: photo.user.links.html,
          },
        })),
        total: data.total,
        totalPages: data.total_pages,
      };
    } catch (error) {
      console.error('Unsplash search error:', error);
      return {
        results: [],
        total: 0,
        totalPages: 0,
      };
    }
  },
};

// 天气API服务
export const weatherApi = {
  // 获取当前天气
  async getCurrentWeather(city = 'Beijing') {
    try {
      const params = new URLSearchParams({
        q: city,
        appid: API_CONFIG.weather.apiKey,
        units: 'metric',
        lang: 'zh_cn',
      });

      const data = await apiRequest<any>(
        `${API_CONFIG.weather.baseUrl}/weather?${params}`
      );

      return {
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        pressure: data.main.pressure,
        feelsLike: Math.round(data.main.feels_like),
      };
    } catch (error) {
      console.error('Weather API error:', error);
      // 返回默认天气数据
      return {
        city: '北京',
        country: 'CN',
        temperature: 22,
        description: '晴朗',
        icon: '01d',
        humidity: 60,
        windSpeed: 3.5,
        pressure: 1013,
        feelsLike: 24,
      };
    }
  },
};

// 名言API服务
export const quotesApi = {
  // 获取随机名言
  async getRandomQuote(tags?: string[]) {
    try {
      const params = new URLSearchParams();
      if (tags && tags.length > 0) {
        params.append('tags', tags.join(','));
      }

      const data = await apiRequest<any>(
        `${API_CONFIG.quotes.baseUrl}/random?${params}`
      );

      return {
        id: data._id,
        content: data.content,
        author: data.author,
        tags: data.tags,
        length: data.length,
      };
    } catch (error) {
      console.error('Quotes API error:', error);
      // 返回默认名言
      return {
        id: 'default',
        content: '设计不仅仅是看起来如何和感觉如何。设计是如何工作的。',
        author: '史蒂夫·乔布斯',
        tags: ['design', 'inspiration'],
        length: 25,
      };
    }
  },

  // 获取设计相关名言
  async getDesignQuote() {
    return this.getRandomQuote(['design', 'creativity', 'art']);
  },
};

// GitHub API服务
export const githubApi = {
  // 获取用户信息
  async getUserInfo(username: string) {
    try {
      const headers: Record<string, string> = {};
      if (API_CONFIG.github.token) {
        headers.Authorization = `token ${API_CONFIG.github.token}`;
      }

      const data = await apiRequest<any>(
        `${API_CONFIG.github.baseUrl}/users/${username}`,
        { headers }
      );

      return {
        username: data.login,
        name: data.name,
        avatar: data.avatar_url,
        bio: data.bio,
        location: data.location,
        company: data.company,
        blog: data.blog,
        publicRepos: data.public_repos,
        followers: data.followers,
        following: data.following,
        createdAt: data.created_at,
      };
    } catch (error) {
      console.error('GitHub API error:', error);
      return null;
    }
  },

  // 获取仓库列表
  async getUserRepos(username: string, sort = 'updated', per_page = 10) {
    try {
      const headers: Record<string, string> = {};
      if (API_CONFIG.github.token) {
        headers.Authorization = `token ${API_CONFIG.github.token}`;
      }

      const params = new URLSearchParams({
        sort,
        per_page: per_page.toString(),
      });

      const data = await apiRequest<any[]>(
        `${API_CONFIG.github.baseUrl}/users/${username}/repos?${params}`,
        { headers }
      );

      return data.map(repo => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
        createdAt: repo.created_at,
        topics: repo.topics || [],
      }));
    } catch (error) {
      console.error('GitHub repos API error:', error);
      return [];
    }
  },
};

// 数据缓存管理
class ApiCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  set(key: string, data: any, ttl = 300000) { // 默认5分钟缓存
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get(key: string) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear() {
    this.cache.clear();
  }

  delete(key: string) {
    this.cache.delete(key);
  }
}

export const apiCache = new ApiCache();

// 带缓存的API调用包装器
export async function cachedApiCall<T>(
  key: string,
  apiCall: () => Promise<T>,
  ttl = 300000
): Promise<T> {
  // 尝试从缓存获取
  const cached = apiCache.get(key);
  if (cached) {
    return cached;
  }

  // 调用API并缓存结果
  try {
    const data = await apiCall();
    apiCache.set(key, data, ttl);
    return data;
  } catch (error) {
    console.error(`Cached API call failed for key: ${key}`, error);
    throw error;
  }
}

// 导出所有API服务
export const api = {
  unsplash: unsplashApi,
  weather: weatherApi,
  quotes: quotesApi,
  github: githubApi,
  cache: apiCache,
  cachedCall: cachedApiCall,
};
