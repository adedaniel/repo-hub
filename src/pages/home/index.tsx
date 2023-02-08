import React, { useCallback, useEffect, useState } from 'react';
import { x } from '@xstyled/emotion';
import { Link } from 'react-router-dom';

import { Grid, Pagination, Spinner } from '@/components';
import { usePublicRepositories } from '@/hooks/useGithubRepositories';
import { PAGE_LIMIT } from '@/constants';

interface Props {}

const HomePage: React.FC<Props> = () => {
  const { data, loading } = usePublicRepositories();
  const [repositories, setRepositories] = useState<Record<string, any>[]>(
    data.slice(0, 10),
  );
  const [isRefetching, setIsRefetching] = useState<boolean>(false);
  const [pageCount, setPageCount] = useState<number>(
    Math.round(data.length / PAGE_LIMIT) || 1,
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');

  const handleFilter = useCallback(() => {
    const filtered = data.filter((repository: any) =>
      repository?.name?.toLowerCase().includes(search.toLowerCase()),
    );

    if (filtered) {
      setRepositories(filtered.slice(0, 10));
      setCurrentPage(1);
      setPageCount(Math.round(filtered.length / PAGE_LIMIT) || 1);
    }
  }, [data, search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilter();
  };

  const handlePageChange = (page: number) => {
    setIsRefetching(true);
    setCurrentPage(page);

    const startSliceAt = (page - 1) * PAGE_LIMIT;
    const endSliceAt = page * PAGE_LIMIT;

    setRepositories(data.slice(startSliceAt, endSliceAt));
    setIsRefetching(false);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    timeout = setTimeout(() => {
      handleFilter();
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [handleFilter]);

  if (loading || isRefetching) {
    return (
      <x.div
        minH='40rem'
        display='flex'
        alignItems='center'
        justifyContent='center'
        w='100%'
      >
        <Spinner variant='large' />
      </x.div>
    );
  }

  return (
    <x.div px='1rem' py='1rem'>
      <Grid container>
        <Grid item spacing='0.5rem'>
          <x.form onSubmit={handleSubmit}>
            <x.input
              w='100%'
              py='1rem'
              px='1rem'
              border='1px solid'
              borderColor='gray-300'
              borderRadius
              placeholder='Search for a respository'
              id='search'
              name='search'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid='search'
            />
          </x.form>
        </Grid>
      </Grid>
      <Grid container>
        {repositories?.length ? (
          repositories.map((repository) => (
            <Repository key={repository.id} repository={repository} />
          ))
        ) : (
          <Grid item>
            <x.div
              minH='20rem'
              display='flex'
              alignItems='center'
              justifyContent='center'
              fontSize='1.2rem'
              fontWeight='500'
            >
              No repositories found!
            </x.div>
          </Grid>
        )}
      </Grid>
      {repositories?.length && pageCount && currentPage ? (
        <x.div
          display='flex'
          alignItems='center'
          justifyContent='center'
          py='1rem'
        >
          <Pagination
            currentPage={currentPage}
            pagesCount={pageCount}
            onPageChange={handlePageChange}
            maxW='35rem'
          />
        </x.div>
      ) : null}
    </x.div>
  );
};

const Repository: React.FC<{ repository: Record<string, any> }> = ({
  repository,
}) => {
  return (
    <Grid
      item
      xs={12}
      sm={4}
      md={3}
      spacing='0.5rem'
      data-testid={`repository-${repository.id}`}
    >
      <x.div>
        <x.img
          src={repository?.owner?.avatar_url}
          alt='owner'
          w='100%'
          objectFit='cover'
          borderRadius
        />
        <x.div>
          <x.p>{repository.name}</x.p>
          <x.p>
            <Link to={repository?.owner?.html_url} target='_blank'>
              <x.button
                px='1rem'
                py='0.5rem'
                borderRadius
                color='white'
                bg={{ _: 'gray-700', hover: 'gray-900' }}
              >
                View Profile
              </x.button>
            </Link>
          </x.p>
        </x.div>
      </x.div>
    </Grid>
  );
};

export default HomePage;
