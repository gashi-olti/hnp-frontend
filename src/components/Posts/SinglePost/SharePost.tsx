import { Card, CardContent, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import ShareOutlined from '@mui/icons-material/ShareRounded';
import Facebook from '@mui/icons-material/FacebookRounded';
import Instagram from '@mui/icons-material/Instagram';
import WhatsApp from '@mui/icons-material/WhatsApp';
import { useTranslation } from 'next-i18next';

export default function SharePost() {
  const { t } = useTranslation('common');

  return (
    <Card elevation={2}>
      <CardContent sx={{ '&.MuiCardContent-root': { paddingBottom: '18px' } }}>
        <Grid container tw="flex flex-row items-center justify-between">
          <Grid item tw="flex flex-row">
            <ShareOutlined fontSize="small" tw="mr-2" />
            <Typography variant="h6" tw="uppercase text-base">
              {t('share')}
            </Typography>
          </Grid>

          <Grid item>
            <Stack direction="row">
              <Tooltip title="Facebook">
                <IconButton size="small">
                  <Facebook />
                </IconButton>
              </Tooltip>
              <Tooltip title="Instagram">
                <IconButton size="small">
                  <Instagram />
                </IconButton>
              </Tooltip>
              <Tooltip title="WhatsApp">
                <IconButton size="small">
                  <WhatsApp />
                </IconButton>
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
