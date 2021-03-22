import { css } from '@emotion/core';
import { IconProps } from './theme/icons/types';

const IconButton = ({
  Icon,
  fill,
  height,
  width,
  onClick = () => {},
}: {
  Icon: React.ComponentType<IconProps>;
  fill: string;
  height: number;
  width: number;
  onClick: React.MouseEventHandler;
}) => {
  return (
    <span
      onClick={onClick}
      css={css`
        cursor: pointer;
      `}
    >
      <Icon height={height} width={width} fill={fill} />
    </span>
  );
};

export default IconButton;
