import React from 'react';
import { x } from '@xstyled/emotion';

import type { SystemProps } from '@xstyled/emotion';

interface PaginationProps extends SystemProps {
  currentPage: number;
  pagesCount: number;
  onPageChange: (targetPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pagesCount,
  onPageChange,
  ...props
}) => {
  return (
    <x.nav
      borderTop
      borderColor='gray-200'
      px={{ _: 4, sm: 0 }}
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      w='100%'
      {...props}
    >
      {currentPage > 1 ? (
        <x.div
          mt='-1px'
          w={0}
          flex={1}
          display='flex'
          visibility={currentPage <= 0 ? 'hidden' : undefined}
        >
          <x.a
            borderTop='2px solid transparent'
            borderColor={{ hover: 'gray-300' }}
            pt={4}
            pr={1}
            display='inline-flex'
            alignItems='center'
            fontSize='sm'
            fontWeight='medium'
            color={'gray-500'}
            cursor='pointer'
            onClick={() => onPageChange(currentPage - 1)}
          >
            <x.svg
              mr={3}
              h={5}
              w={5}
              color='gray-400'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z'
                clipRule='evenodd'
              />
            </x.svg>
            Previous
          </x.a>
        </x.div>
      ) : null}

      <x.div display={{ _: 'hidden', md: 'flex' }} mt='-1px'>
        {new Array(pagesCount).fill(undefined).map((_, idx) => (
          <x.a
            key={idx}
            pt={4}
            px={4}
            borderTop='2px solid transparent'
            display='inline-flex'
            alignItems='center'
            fontSize='sm'
            fontWeight='medium'
            aria-current={idx === currentPage - 1 ? 'page' : undefined}
            color={idx === currentPage - 1 ? 'primary-600' : 'gray-500'}
            borderColor={
              idx === currentPage - 1 ? 'primary-500' : { hover: 'gray-300' }
            }
            cursor='pointer'
            onClick={() => onPageChange(idx + 1)}
          >
            {idx + 1}
          </x.a>
        ))}
      </x.div>

      {currentPage < pagesCount ? (
        <x.div
          mt='-1px'
          w={0}
          flex={1}
          display='flex'
          justifyContent='flex-end'
          visibility={currentPage >= pagesCount ? 'hidden' : undefined}
        >
          <x.a
            borderTop='2px solid transparent'
            borderColor={{ hover: 'gray-300' }}
            pt={4}
            pl={1}
            display='inline-flex'
            alignItems='center'
            fontSize='sm'
            fontWeight='medium'
            color={'gray-500'}
            cursor='pointer'
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
            <x.svg
              ml={3}
              h={5}
              w={5}
              color='gray-400'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </x.svg>
          </x.a>
        </x.div>
      ) : null}
    </x.nav>
  );
};

export default Pagination;
