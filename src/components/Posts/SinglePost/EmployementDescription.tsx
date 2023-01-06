import { Card, CardContent, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';

import { RichText } from '@/components/Common/RichText';

interface Props {
  data: string;
}

export default function EmployementDescription({ data }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container spacing={isMobile ? 2 : 4}>
      <Grid item xs={12} md={8}>
        <Card elevation={2}>
          <CardContent
            sx={{
              h1: { fontSize: '2rem' },
              h2: { fontSize: '1.5rem' },
              h3: { fontSize: '1.17rem' },
              padding: isMobile ? 2 : 4,
            }}
          >
            <Typography fontSize="inherit">
              <RichText text={data} />
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card elevation={2}>
          <CardContent></CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
