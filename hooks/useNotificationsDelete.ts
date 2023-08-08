import useSWR  from 'swr';
// import fetcher from '@/libs/fetcher';
import axios from 'axios';

const useNotificationsDelete = (userId?: string) => {
  const url = userId ? `/api/notifications/${userId}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, (url: string) => axios.delete(url).then((res) => res.data));

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useNotificationsDelete;