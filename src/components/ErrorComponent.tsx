import { useTranslation } from 'next-i18next';
import { Typography } from '@mui/material';

import CustomLink from './CustomLink';

type ErrorComponentProps = {
  title: string;
  message?: string;
  redirectTo?: string;
  className?: string;
};

export default function ErrorComponent({
  title,
  message,
  redirectTo,
  className,
}: ErrorComponentProps) {
  const { t } = useTranslation('common');

  return (
    <div tw="container flex-col items-center justify-center py-56" className={className}>
      <div>
        <div tw="pl-4 border-l-2 border-red-600 flex flex-col">
          <Typography variant="h2">{title}</Typography>
          {message && <Typography>{message}</Typography>}
        </div>
        {redirectTo && (
          <Typography variant="body2" tw="mt-5! ml-4!">
            <CustomLink href={redirectTo}>{t('common:go back')}</CustomLink>
          </Typography>
        )}
      </div>
    </div>
  );
}
