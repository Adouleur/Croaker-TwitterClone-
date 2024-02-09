import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useNotifications = (userId?: string) => {
  const url = userId
    ? `https://croaker-twitter-clone.vercel.app/api/notifications/${userId}`
    : null;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useNotifications;
