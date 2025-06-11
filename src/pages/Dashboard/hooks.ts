import { useCallback, useEffect, useState } from 'react';
import { DashboardStats } from './types';

export function useGetStats() {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardStats = useCallback(() => {
    const backendUrl = process.env.DATABASE_API_URL || "http://localhost:8080";

    fetch(`${backendUrl}/api/submissions/dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard stats');
        }
        return response.json();
      })
      .then((data) => {
        setDashboardStats(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching dashboard stats:', error);
      });
  }, []);

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  return {
    dashboardStats,
    isLoading,
  };
}
