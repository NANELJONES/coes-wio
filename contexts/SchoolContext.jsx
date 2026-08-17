"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { usePathname } from "next/navigation";

const SchoolContext = createContext();

export const useSchoolContext = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error("useSchoolContext must be used within a SchoolProvider");
  }
  return context;
};

export const SchoolProvider = ({ children }) => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const pathname = usePathname();
  const hasFetchedRef = useRef(false);
  const fetchingRef = useRef(false);

  useEffect(() => {
    if (pathname === "/schools") {
      return;
    }

    const cachedData = localStorage.getItem("schools_cache");
    if (cachedData) {
      try {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < 3600000) {
          setSchools(data);
          setHasMore(data.length === 10);
          hasFetchedRef.current = true;
          return;
        }
      } catch {
        localStorage.removeItem("schools_cache");
      }
    }

    if (hasFetchedRef.current || fetchingRef.current) return;

    const fetchSchools = async () => {
      fetchingRef.current = true;
      try {
        setLoading(true);
        const response = await fetch("/api/schools?minimal=true&limit=10");
        const data = await response.json();

        if (data.success) {
          setSchools(data.data);
          setHasMore(data.hasMore || data.data.length === 10);
          hasFetchedRef.current = true;
          localStorage.setItem(
            "schools_cache",
            JSON.stringify({
              data: data.data,
              timestamp: Date.now(),
            })
          );
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Failed to fetch schools");
        console.error("Error fetching schools:", err);
      } finally {
        setLoading(false);
        fetchingRef.current = false;
      }
    };

    const timer = setTimeout(() => {
      fetchSchools();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  const loadMoreSchools = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const response = await fetch("/api/schools?minimal=true&limit=50");
      const data = await response.json();

      if (data.success) {
        setSchools(data.data);
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error loading more schools:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  const memoizedSchools = useMemo(() => schools, [schools]);

  const value = {
    schools: memoizedSchools,
    loading,
    error,
    hasMore,
    loadingMore,
    loadMoreSchools,
  };

  return (
    <SchoolContext.Provider value={value}>{children}</SchoolContext.Provider>
  );
};
