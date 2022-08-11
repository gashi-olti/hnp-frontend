import { Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import tw, { styled, css } from 'twin.macro';

interface NewProps {
  width?: '384px' | '128px';
  fontSize?: '18px' | '14px' | string;
  top?: '44px' | '32px' | '16px';
  left?: '-160px' | '-144px' | '-128px' | '-32px';
  paddingTop?: '8px' | '4px' | '2px' | '0';
  paddingRight?: '16px' | '8px';
  paddingBottom?: '8px' | '4px' | '2px' | '0';
  paddingLeft?: '16px' | '8px';
}

const Span = styled.span(() => [
  tw`absolute bg-white text-center z-50 block -rotate-45 bg-gradient-to-b from-sky to-cyan`,
  `&:before {
      content: '';
      top: 0;
      right: 0;
      bottom: 0;
      margin: 0;
      position: absolute;
    }`,
]);

const NewBadge: FC<NewProps> = (props) => {
  const { t } = useTranslation(['common']);

  const { width, fontSize, top, left, paddingTop, paddingRight, paddingBottom, paddingLeft } =
    props;
  return (
    <Span
      css={[
        css({
          width: width ?? '384px',
          top: top ?? '36px',
          left: left ?? '-128px',
          paddingTop: paddingTop ?? '8px',
          paddingRight: paddingRight ?? '16px',
          paddingBottom: paddingBottom ?? '8px',
          paddingLeft: paddingLeft ?? '16px',
          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        }),
      ]}
    >
      <Typography fontSize={fontSize} tw="text-white font-bold uppercase">
        {t('common:new badge')}
      </Typography>
    </Span>
  );
};

export default NewBadge;
