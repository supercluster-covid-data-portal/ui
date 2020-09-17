// /** @jsx jsx */ import { css } from '@emotion/core';
import { css } from '@emotion/core';

const baseFont = css`
  font-family: Lato, sans-serif;
`;

const regular = css`
  ${baseFont}
  font-size: inherit;
  font-weight: inherit;
  font-style: inherit;
  font-stretch: inherit;
  line-height: inherit;
  letter-spacing: inherit;
`;

const button = css`
  ${baseFont}
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 20px;
  letter-spacing: normal;
`;

const heading = css`
  ${baseFont}
  font-size: 18px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: normal;
`;

const subheading = css`
  ${baseFont}
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: normal;
`;

const subheading2 = css`
  ${baseFont}
  font-size: 14px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 16px;
  letter-spacing: normal;
`;

const label = css`
  ${baseFont}
  font-size: 12px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 16px;
  letter-spacing: normal;
`;

const label2 = css`
  ${baseFont}
  font-size: 10px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 14px;
  letter-spacing: normal;
`;

const data = css`
  ${baseFont}
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 16px;
  letter-spacing: normal;
`;

export default {
  regular,
  heading,
  subheading,
  subheading2,
  label,
  label2,
  data,
  button,
};
