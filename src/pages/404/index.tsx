import React from 'react';
import { Link } from 'react-router-dom';
import { x } from '@xstyled/emotion';

interface Props {}

const PageNotFound: React.FC<Props> = () => {
  return (
    <x.div
      display='flex'
      alignItems='center'
      justifyContent='center'
      minHeight='100vh'
    >
      <x.div textAlign='center'>
        <x.h1 fontSize='2rem' mb='1rem'>
          The page you are looking for does no seem to exist
        </x.h1>

        <Link to='/' style={{ textDecoration: 'none' }}>
          <x.button
            px='1rem'
            py='0.5rem'
            borderRadius
            color='white'
            bg={{ _: 'gray-700', hover: 'gray-900' }}
          >
            Go Back Home
          </x.button>
        </Link>
      </x.div>
    </x.div>
  );
};

export default PageNotFound;
