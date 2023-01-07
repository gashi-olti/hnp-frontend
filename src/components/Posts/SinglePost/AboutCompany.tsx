import * as React from 'react';
import { useTranslation } from 'next-i18next';
import { Button, Card, CardContent, Divider, Grid, Typography, useTheme } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EventIcon from '@mui/icons-material/Event';
import WebIcon from '@mui/icons-material/Web';
import useSWR from 'swr';
import Link from 'next/link';

import { Company } from '@/interfaces/company.interface';

interface AboutCompanyProps {
  companyUuid?: string;
}

export default function AboutCompany({ companyUuid }: AboutCompanyProps) {
  const { t } = useTranslation(['company', 'profile', 'common']);

  const theme = useTheme();

  const { data: company, error: companyError } = useSWR<Company>(
    companyUuid ? `company/details/${companyUuid}` : null
  );

  const Row = ({
    icon,
    iconTitle,
    title,
    href,
  }: {
    icon: React.ReactNode;
    iconTitle: string;
    title?: string | number;
    href?: string;
  }) => {
    return (
      <Grid item container xs={12} tw="flex flex-row justify-between border-b">
        <Grid item>
          <div tw="flex flex-row">
            {icon}
            <Typography
              variant="body1"
              tw="text-sm font-semibold"
              sx={{ color: theme.palette.grey[600], ml: 1 }}
            >
              {iconTitle}:
            </Typography>
          </div>
        </Grid>
        <Grid item>
          {href ? (
            <Typography variant="body1" tw="text-base font-semibold">
              <Link href={href}>{href}</Link>
            </Typography>
          ) : (
            <Typography variant="body1" tw="text-base font-semibold">
              {title}
            </Typography>
          )}
        </Grid>
      </Grid>
    );
  };

  return (
    <Card elevation={2}>
      <CardContent>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" tw="uppercase">
              {t('about company')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          {company && !companyError && (
            <>
              <Row
                icon={<ApartmentIcon fontSize="small" sx={{ color: theme.palette.grey[500] }} />}
                iconTitle={t('profile:company name')}
                title={company.name}
              />
              <Row
                icon={<CategoryIcon fontSize="small" sx={{ color: theme.palette.grey[500] }} />}
                iconTitle={t('profile:company industry')}
                title={company.industry}
              />
              <Row
                icon={<PeopleAltIcon fontSize="small" sx={{ color: theme.palette.grey[500] }} />}
                iconTitle={t('profile:company size')}
                title={company.size ?? 0}
              />
              <Row
                icon={<EventIcon fontSize="small" sx={{ color: theme.palette.grey[500] }} />}
                iconTitle={t('profile:company founded')}
                title={company.founded}
              />
              <Row
                icon={<WebIcon fontSize="small" sx={{ color: theme.palette.grey[500] }} />}
                iconTitle={t('profile:company website')}
                title={company.website}
                href={company.website}
              />
            </>
          )}
          <Grid item xs={12} tw="flex flex-row justify-end">
            <Button variant="buttonWhite" sx={{ px: 0 }} disableTouchRipple>
              Read more
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
