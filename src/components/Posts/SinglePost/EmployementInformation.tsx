import * as React from 'react';
import { Grid, Typography } from '@mui/material';
import FactoryIcon from '@mui/icons-material/Factory';
import PunchClockIcon from '@mui/icons-material/PunchClock';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PaidIcon from '@mui/icons-material/Paid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import { useTranslation } from 'next-i18next';
import { DateTime } from 'luxon';

import theme from '@/config/theme';
import getJobCategory from '@/config/jobCategory';
import getJobType from '@/config/jobType';

interface EmployementInformationProps {
  category?: number | null;
  type?: number | null;
  experience?: string;
  location?: string;
  positions?: number;
  salary?: string;
  ends?: string | Date;
}

type DetailsProps = {
  icon?: React.ReactNode;
  iconTitle?: string;
  title?: string | number;
};

const DetailsBox = ({ icon, iconTitle, title }: DetailsProps) => {
  return (
    <Grid container item tw="flex flex-row justify-between border-b">
      <Grid item>
        <div tw="flex flex-row">
          {icon}
          <Typography
            variant="body1"
            tw="text-base font-semibold"
            sx={{ color: theme.palette.grey[600], ml: 2 }}
          >
            {iconTitle}
          </Typography>
        </div>
      </Grid>
      <Grid item>
        <Typography variant="body1" tw="text-base font-semibold">
          {title}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default function EmployementInformation({
  category,
  type,
  experience,
  location,
  positions,
  salary,
  ends,
}: EmployementInformationProps) {
  const { t } = useTranslation('job');

  return (
    <>
      {category && (
        <Grid item xs={12}>
          <DetailsBox
            icon={<FactoryIcon fontSize="small" sx={{ color: theme.palette.grey[500] }} />}
            iconTitle={t('job:job category')}
            title={getJobCategory(t)[category].value}
          />
        </Grid>
      )}
      {type && (
        <Grid item xs={12}>
          <DetailsBox
            icon={<PunchClockIcon fontSize="small" sx={{ color: theme.palette.grey[500] }} />}
            iconTitle={t('job:job type')}
            title={getJobType(t)[type].value}
          />
        </Grid>
      )}
      {experience && (
        <Grid item xs={12}>
          <DetailsBox
            icon={<WorkspacePremiumIcon fontSize="small" sx={{ color: theme.palette.grey[500] }} />}
            iconTitle={t('job:job experience')}
            title={experience}
          />
        </Grid>
      )}
      {salary && (
        <Grid item xs={12}>
          <DetailsBox
            icon={<PaidIcon fontSize="small" sx={{ color: theme.palette.grey[500] }} />}
            iconTitle={t('post:salary')}
            title={salary}
          />
        </Grid>
      )}
      {positions && (
        <Grid item xs={12}>
          <DetailsBox
            icon={<PeopleAltIcon fontSize="small" sx={{ color: theme.palette.grey[500] }} />}
            iconTitle={t('post:positions')}
            title={positions}
          />
        </Grid>
      )}
      {location && (
        <Grid item xs={12}>
          <DetailsBox
            icon={<LocationOnIcon fontSize="small" sx={{ color: theme.palette.grey[500] }} />}
            iconTitle={t('post:job location')}
            title={location}
          />
        </Grid>
      )}
      {ends && (
        <Grid item xs={12}>
          <DetailsBox
            icon={<TimelapseIcon fontSize="small" sx={{ color: theme.palette.grey[500] }} />}
            iconTitle={t('common:deadline')}
            title={DateTime.fromISO(ends.toString()).toFormat('dd-LL-yyyy')}
          />
        </Grid>
      )}
    </>
  );
}
