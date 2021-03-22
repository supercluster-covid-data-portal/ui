import { css } from '@emotion/core';
import { IconProps } from './types';

const Error = ({ height, width, style }: IconProps) => {
  return (
    <svg
      css={css`
        ${style};
        height: ${height}px;
        width: ${width}px;
      `}
      width={width}
      height={height}
      viewBox={'0 0 26 27'}
    >
      <g fill="none" fillRule="evenodd">
        <g>
          <g>
            <g>
              <g>
                <g>
                  <g>
                    <path
                      fill="#AD404E"
                      d="M13 1.733c-.735 0-1.414.367-1.79 1.002L.283 21.197c-.377.636-.378 1.422 0 2.057.315.53.91 1.014 1.647 1.013h22.14c.736 0 1.332-.482 1.647-1.013.378-.635.377-1.42 0-2.057L14.79 2.735C14.413 2.1 13.736 1.733 13 1.733"
                      transform="translate(-399 -301) translate(367 271.17) translate(32 25) translate(0 5)"
                    />
                    <g fill="#F9EFF0">
                      <path
                        d="M6.862 11.111c-1.083 0-1.962.87-1.962 1.945C4.9 14.13 5.779 15 6.862 15c1.084 0 1.963-.87 1.963-1.944 0-1.075-.879-1.945-1.963-1.945M6.862 1C5.78 1 4.9 1.87 4.9 2.944l.392 5.834c0 .859.703 1.555 1.57 1.555.867 0 1.57-.696 1.57-1.555l.393-5.834C8.825 1.871 7.946 1 6.862 1"
                        transform="translate(-399 -301) translate(367 271.17) translate(32 25) translate(0 5) translate(6 7)"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Error;
