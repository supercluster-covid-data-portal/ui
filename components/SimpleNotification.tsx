import { css } from '@emotion/core';

import IconButton from './IconButton';
import DismissIcon from './theme/icons/dismiss';
import defaultTheme from './theme';

const SimpleNotification = ({
  title,
  style,
  dismissable,
  onDismiss,
  children,
}: {
  title?: string;
  style: string;
  dismissable?: boolean;
  onDismiss?: () => void;
  children: any;
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        padding: 10px;
        border-radius: 5px;
        font-size: 14px;
        width: 600px;
        ${style};
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: ${dismissable ? 'space-between' : 'center'};
          font-size: 14px;
        `}
      >
        <div>
          {title && (
            <span
              css={css`
                font-weight: bold;
              `}
            >
              {title}:
            </span>
          )}{' '}
          {children}
        </div>
        {dismissable && (
          <span
            css={css`
              margin-left: 15px;
            `}
          >
            <IconButton
              onClick={(e: React.MouseEvent) => (onDismiss ? onDismiss() : () => null)}
              Icon={DismissIcon}
              height={12}
              width={20}
              fill={defaultTheme.colors.error_dark}
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default SimpleNotification;
