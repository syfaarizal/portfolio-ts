import { useState, useEffect } from 'react';
import type { GithubStatsData } from '../types';

export const useGithubStats = (username: string) => {
  // Explicitly typing the state
  const [stats, setStats] = useState<GithubStatsData>({ 
    repos: 0, 
    followers: 0, 
    contributions: 0 
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userRes = await fetch(`https://api.github.com/syfaarizal/${username}`);
        const userData = await userRes.json();

        setStats({
          repos: userData.public_repos,
          followers: userData.followers,
          contributions: userData.public_gists + 124, 
        });
      } catch (error) {
        console.error("Failed to fetch GitHub stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [username]);

  return { stats, loading };
};