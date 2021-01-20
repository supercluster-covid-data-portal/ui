import { css } from '@emotion/core';

import { IconProps } from './types';

const Checkmark = ({ fill, height, width, style }: IconProps) => {
  return (
    <svg
      css={css`
        ${style};
        height: ${height};
        width: ${width};
      `}
      width={width}
      height={height}
      viewBox={'0 0 20 20'}
    >
      <g fill="none" fillRule="evenodd">
        <path fill="fff" d="M0 0h20v20H0z" />
        <path
          fill={fill}
          d="M.561 12.193c-1.716-1.717.894-4.327 2.61-2.61L6.49 12.9 16.83 2.56c1.716-1.716 4.326.894 2.61 2.61L7.794 16.816c-.72.72-1.89.72-2.61 0L.561 12.193z"
        />
      </g>
    </svg>
  );
};

export default Checkmark;
