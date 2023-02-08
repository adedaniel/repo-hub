import useSwr from 'swr';

import { GithubSwrKeys } from '@/helpers';
import { getPublicRepositories } from '@/services/githubService';

export const usePublicRepositories = () => {
  const { data, error, mutate } = useSwr(
    GithubSwrKeys.GET_REPOSITORIES,
    getPublicRepositories,
  );

  return {
    data: data || [],
    loading: !error && !data,
    error,
    refetch: mutate,
  };
};
