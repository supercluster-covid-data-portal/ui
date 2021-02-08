import { css, Global } from '@emotion/core';
import styled from '@emotion/styled';
import { useTheme } from 'emotion-theming';
import { has, isEmpty } from 'lodash';
import React from 'react';
import { Tooltip } from 'react-tippy';

import Button from '../../Button';
import StyledLink from '../../Link';
import defaultTheme from '../../theme';
import { Checkmark } from '../../theme/icons';

interface ApiToken {
  expiryDate: string;
  isRevoked: boolean;
  issueDate: string;
  name: string;
  scope: string[];
}

const TooltipContainer = styled('div')`
  ${({ theme }: { theme: typeof defaultTheme }) => css`
    ${css(theme.typography.label as any)}
    background: ${theme.colors.grey_6};
    border-radius: 2px;
    padding: 2px 4px;
    color: white;
    font-weight: normal;
    margin-bottom: 10%;
    &:before {
      content: '';
      display: block;
      position: absolute;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      pointer-events: none;
      right: 50%;
      top: 79%;
      border-top-color: ${theme.colors.grey_6};
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
      margin-right: -5px;
    }
  `}
`;

const ApiTokenInfo = ({ apiToken }: { apiToken: ApiToken | null }) => {
  const [isCopyingToken, setIsCopyingToken] = React.useState(false);
  const [copySuccess, setCopySuccess] = React.useState(false);
  const theme: typeof defaultTheme = useTheme();

  const sleep = (time: number = 2000) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('');
      }, time);
    });

  const copyApiToken = (text: string) => {
    setIsCopyingToken(true);
    navigator.clipboard
      .writeText(text)
      .then(async () => {
        await setIsCopyingToken(false);
        await setCopySuccess(true);
        await sleep();
        setCopySuccess(false);
      })
      .catch((err) => console.warn('Failed to copy token!'));
  };

  const parseExpiry = (exp: string) => {
    const expFromTodayMs = Date.parse(exp) - Date.now();
    return expFromTodayMs || 0;
  };

  const getDayValue = (exp: number) => {
    const days = Math.floor(exp / 1000 / 60 / 60 / 24);
    return `Expires in: ${days} days`;
  };

  const parsedExpiry: number = apiToken ? parseExpiry(apiToken?.expiryDate) : 0;
  const tokenIsExpired: boolean = has(apiToken, 'expiryDate') && parsedExpiry <= 0;

  return (
    <div
      css={css`
        width: 600px;
      `}
    >
      <h2
        css={(theme) =>
          css`
            ${theme.typography.regular};
            font-size: 24px;
            line-height: 40px;
            color: ${theme.colors.accent_dark};
          `
        }
      >
        API Token
      </h2>
      <ol
        css={(theme) =>
          css`
            ${theme.typography.subheading};
            font-weight: normal;
            color: ${theme.colors.accent_dark};
            margin-bottom: 2rem;
          `
        }
      >
        <li>Your API token is used to download controlled access data.</li>
        <li>
          Your API token is associated with your user credentials and should <strong>NEVER</strong>{' '}
          be shared with anyone.
        </li>
        <li>When you generate a new token, all previous tokens become invalid.</li>
        <li>Expired and revoked tokens also become invalid.</li>
      </ol>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          margin-bottom: 10px;
        `}
      >
        <Button
          css={css`
            margin-right: 10px;
          `}
        >
          Generate New Token
        </Button>
        <Button
          disabled={isEmpty(apiToken) || tokenIsExpired}
          isAsync
          css={(theme) =>
            css`
              background-color: ${theme.colors.white};
              color: ${theme.colors.accent_dark};
              border: 1px solid ${theme.colors.grey_5};
              &:hover {
                background-color: ${theme.colors.accent_1};
              }
            `
          }
        >
          Revoke Token
        </Button>
      </div>
      <div
        css={css`
          position: relative;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-bottom: 2rem;
          margin-top: 1rem;
        `}
      >
        <div
          css={(theme) =>
            css`
              border: 1px solid ${theme.colors.grey_5};
              border-radius: 5px 0px 0px 5px;
              border-right: 0px;
              color: ${isEmpty(apiToken) ? theme.colors.grey_6 : theme.colors.black};
              width: 100%;
              display: flex;
              align-items: center;
              padding-left: 5px;
            `
          }
        >
          {!isEmpty(apiToken) && (
            <div
              css={(theme) =>
                css`
                  color: ${theme.colors.white};
                  border-radius: 6px;
                  padding: 3px 8px;
                  margin-right: 5px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  ${theme.typography.label}
                  ${tokenIsExpired
                    ? `background-color: ${theme.colors.error_dark}`
                    : `background-color: ${theme.colors.grey_6};`}
                `
              }
            >
              {tokenIsExpired ? 'Expired' : getDayValue(parsedExpiry)}
            </div>
          )}
          <span
            css={(theme) => css`
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              ${theme.typography.subheading}
              font-weight: normal;
              padding-right: 5px;
              padding-left: 5px;
              ${tokenIsExpired ? 'opacity: 0.3' : ''}
            `}
          >
            {apiToken?.name || 'You have no API token...'}
          </span>
        </div>
        <>
          <Global
            styles={css`
              .tippy-popper .leave {
                opacity: 0;
              }
            `}
          />
          <Tooltip
            unmountHTMLWhenHide
            open={copySuccess}
            arrow
            html={<TooltipContainer id="tooltip">Copied!</TooltipContainer>}
            position="top"
          >
            <Button
              disabled={isEmpty(apiToken) || isCopyingToken || tokenIsExpired}
              css={() =>
                css`
                  border-radius: 0px 5px 5px 0px;
                  width: 69px;
                  height: 36px;
                  position: relative;
                `
              }
              onClick={() =>
                apiToken?.name && !tokenIsExpired ? copyApiToken(apiToken.name) : null
              }
            >
              <span
                css={css`
                  position: absolute;
                  top: 8px;
                  left: 24px;
                  visibility: ${copySuccess ? 'visible' : 'hidden'};
                `}
              >
                <Checkmark width={20} height={20} fill={theme.colors.white} />
              </span>
              <span
                css={css`
                  visibility: ${copySuccess ? 'hidden' : 'visible'};
                `}
              >
                Copy
              </span>
            </Button>
          </Tooltip>
        </>
      </div>

      <span
        css={(theme) =>
          css`
            ${theme.typography.subheading};
            font-weight: normal;
            color: ${theme.colors.accent_dark};
          `
        }
      >
        For more information, please read the{' '}
        <StyledLink href={``}>instructions on how to download data</StyledLink>.
      </span>
    </div>
  );
};

export default ApiTokenInfo;
