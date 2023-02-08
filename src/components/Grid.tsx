import React from 'react';
import { x } from '@xstyled/emotion';

import type { SystemProps, SystemProp, Theme } from '@xstyled/emotion';

interface GridProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {}

interface GridProps
  extends Omit<SystemProps, 'row' | 'col' | 'gap' | 'padding'> {
  spacing?: SystemProp<string | 0 | (string & {}), Theme>;
  container?: boolean;
  item?: boolean;
  xl2?: number;
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;
}

/**
 * Grid
 *
 * This grid component is inspired by bootstrap and/or material-ui grid columns where its maximum grid columns is 12
 *
 * @param {boolean|undefined} container - specifies if this component is the row element/parent wrapper
 * @param {boolean|undefined} item - specifies if this component is a column item/ child element,
 * @param spacing - Refers to the spacing between the elements, it uses padding for its spacing to avoid grid columns breaking
 *
 */

const Grid: React.FC<GridProps> = ({
  children,
  spacing = 0,
  container,
  item,
  xl2,
  xl,
  lg,
  md,
  sm,
  xs,
  ...props
}) => (
  <x.div
    aria-label={container === true ? 'grid' : 'gridcell'}
    role={container === true ? 'grid' : 'gridcell'}
    row={container === false ? undefined : container}
    col={
      item === true
        ? {
            '2xl': xl2 ? `${(xl2 / 12) * 100}%` : undefined,
            xl: xl ? `${(xl / 12) * 100}%` : undefined,
            lg: lg ? `${(lg / 12) * 100}%` : undefined,
            md: md ? `${(md / 12) * 100}%` : undefined,
            sm: sm ? `${(sm / 12) * 100}%` : undefined,
            xs: xs ? `${(xs / 12) * 100}%` : undefined,
          }
        : undefined
    }
    padding={spacing}
    {...props}
  >
    {children}
  </x.div>
);

export default Grid;
