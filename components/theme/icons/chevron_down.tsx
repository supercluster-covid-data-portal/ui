import { css } from '@emotion/core';

import { IconProps } from './types';

const ChevronDown = ({ fill, width, height, style }: IconProps) => {
  return (
    <svg
      css={css`
        ${style}
      `}
      width={width}
      height={height}
      viewBox="0 0 12 12"
    >
      <path
        fill={fill}
        fillRule="evenodd"
        d="M9.952 3.342c.468-.456 1.228-.456 1.697 0 .234.228.351.526.351.825 0 .298-.117.597-.351.825l-4.8 4.666c-.469.456-1.23.456-1.697 0l-4.8-4.666c-.47-.456-.47-1.194 0-1.65.468-.456 1.228-.456 1.696 0L6 7.184l3.952-3.842z"
      />
    </svg>
  );
};

export default ChevronDown;
