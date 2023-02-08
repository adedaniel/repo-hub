import { Api } from '@/lib/api';

export const getPublicRepositories = async () => {
  try {
    const repositories = await Api({
      method: 'GET',
      url: `/repositories`,
    });

    return repositories;
  } catch (err: any) {
    throw Error('githubService::getPublicRepositories: ', err.message);
  }
};
