import { css } from '@emotion/core';
import theme from '..';
import { IconProps } from './types';

const Dismiss = ({ height, width, style, fill }: IconProps) => {
  return (
    <svg
      css={css`
        ${style};
        height: ${height}px;
        width: ${width}px;
      `}
      width={width}
      height={height}
      viewBox={'0 0 20 20'}
    >
      <path
        fill={fill || theme.colors.black}
        fillRule="evenodd"
        d="M9.993 13.502l-5.74 5.74c-2.306 2.306-5.79-1.203-3.51-3.484L6.51 9.993.743 4.253c-2.28-2.307 1.204-5.79 3.51-3.51l5.74 5.765L15.758.743c2.281-2.28 5.79 1.203 3.484 3.51l-5.74 5.74 5.74 5.765c2.306 2.28-1.203 5.79-3.484 3.484l-5.765-5.74z"
      />
    </svg>
  );
};

export default Dismiss;
