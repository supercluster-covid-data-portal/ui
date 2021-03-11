import { css, Global } from '@emotion/core';
import styled from '@emotion/styled';
import { useTheme } from 'emotion-theming';
import { has, isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tippy';

import { parseExpiry, getDayValue } from '../../../global/utils/apiToken';
import { getConfig } from '../../../global/config';
import useAuthContext from '../../../global/hooks/useAuthContext';
import { EGO_API_KEY_ENDPOINT } from '../../../global/utils/constants';

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
    ${theme.typography.label};
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

const sleep = (time: number = 2000) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, time);
  });

const ApiTokenInfo = () => {
  const { user, token, fetchWithAuth } = useAuthContext();
  const [existingApiToken, setExistingApiToken] = useState<ApiToken | null>(null);
  const [isCopyingToken, setIsCopyingToken] = React.useState(false);
  const [copySuccess, setCopySuccess] = React.useState(false);
  const theme: typeof defaultTheme = useTheme();

  const generateApiToken = async () => {
    const { NEXT_PUBLIC_EGO_API_ROOT } = getConfig();
    if (user) {
      const scopesResult = await fetchWithAuth(
        `${NEXT_PUBLIC_EGO_API_ROOT}/o/scopes?userId=${user.id}`,
        { method: 'GET' },
      )
        .then((res) => {
          if (res.status !== 200) {
            throw new Error('Error fetching scopes, cannot generate api token.');
          }
          return res.json();
        })
        .then((json) => json.scopes)
        .catch((err) => console.warn(err));

      if (scopesResult.length) {
        return fetchWithAuth(
          `${EGO_API_KEY_ENDPOINT}?scopes=${encodeURIComponent(scopesResult.join())}&user_id=${
            user.id
          }`,
          { method: 'POST' },
        )
          .then((res) => {
            if (res.status !== 200) {
              throw new Error('Failed to generate api token!');
            }
            return res.json();
          })
          .then((newApiToken: ApiToken) => {
            setExistingApiToken(newApiToken);
          })
          .catch((err) => {
            return err;
          });
      }
    }
  };

  const revokeApiToken = async () => {
    return (
      existingApiToken &&
      fetchWithAuth(`${EGO_API_KEY_ENDPOINT}?apiKey=${existingApiToken.name}`, { method: 'DELETE' })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error('Error revoking api token!');
          }
          setExistingApiToken(null);
        })
        .catch((err) => console.warn(err))
    );
  };

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

  const parsedExpiry: number = existingApiToken ? parseExpiry(existingApiToken?.expiryDate) : 0;
  const tokenIsExpired: boolean = has(existingApiToken, 'expiryDate') && parsedExpiry <= 0;

  useEffect(() => {
    user &&
      fetchWithAuth(`${EGO_API_KEY_ENDPOINT}?user_id=${user.id}`, { method: 'GET' })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error();
          }
          return res.json();
        })
        .then((json) => {
          const activeToken = json.resultSet.find((r: ApiToken) => !r.isRevoked);
          if (activeToken) {
            setExistingApiToken(activeToken);
          } else {
            setExistingApiToken(null);
          }
        })
        .catch((err) => console.warn('Could not get api tokens! ', err));
  }, [token]);

  return (
    <div>
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
          onClick={() => generateApiToken()}
          isAsync
        >
          Generate New Token
        </Button>
        <Button
          disabled={isEmpty(existingApiToken) || tokenIsExpired}
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
          onClick={() => revokeApiToken()}
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
          max-width: 600px;
        `}
      >
        <div
          css={(theme) =>
            css`
              border: 1px solid ${theme.colors.grey_5};
              border-radius: 5px 0px 0px 5px;
              border-right: 0px;
              color: ${isEmpty(existingApiToken) ? theme.colors.grey_6 : theme.colors.black};
              width: 100%;
              display: flex;
              align-items: center;
              padding-left: 5px;
            `
          }
        >
          {existingApiToken && (
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
            {existingApiToken?.name || 'You have no API token...'}
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
            html={
              <TooltipContainer theme={theme} id="tooltip">
                Copied!
              </TooltipContainer>
            }
            position="top"
          >
            <Button
              disabled={isEmpty(existingApiToken) || isCopyingToken || tokenIsExpired}
              css={() =>
                css`
                  border-radius: 0px 5px 5px 0px;
                  width: 69px;
                  height: 36px;
                  position: relative;
                `
              }
              onClick={() =>
                existingApiToken?.name && !tokenIsExpired
                  ? copyApiToken(existingApiToken.name)
                  : null
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
