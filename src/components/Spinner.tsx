import { x } from '@xstyled/emotion';

import type { SystemProps } from '@xstyled/emotion';

interface SpinnerProps extends SystemProps {
  active?: boolean;
  variant?: 'large' | 'medium' | 'small';
}

const SpinnerVariants = {
  large: {
    w: 12,
    h: 12,
  },
  medium: {
    w: 8,
    h: 8,
  },
  small: {
    w: 6,
    h: 6,
  },
};

const Spinner: React.FC<SpinnerProps> = ({
  active = true,
  variant = 'medium',
  ...systemProps
}) => {
  if (!active) {
    return null;
  }

  return (
    <x.div display='flex' justifyContent='center' alignItems='center'>
      <x.div
        display='inline-block'
        w={SpinnerVariants[variant].w}
        h={SpinnerVariants[variant].h}
        border={4}
        borderColor='white'
        borderLeftColor='gray-600'
        borderBottomColor='gray-600'
        borderRadius='full'
        animation='spin'
        aria-label='spinbutton'
        aria-labelledby='spinbutton'
        role='spinbutton'
        {...systemProps}
      />
    </x.div>
  );
};

export default Spinner;
