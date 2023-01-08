import { Box, Grid, Stack, Typography } from '@mui/material';

import { PostModel } from '@/interfaces/post.interface';
import CommonHero from '@/components/Common/CommonHero';
import { isNewPost } from '@/utils/functions';

import EmployementInformation from './EmployementInformation';

interface HeroProps {
  data: PostModel;
}

export default function Hero({ data }: HeroProps) {
  return (
    <Box>
      <CommonHero
        image={data.company?.cover?.src}
        title={data.title}
        altImage={data.company?.cover?.credit}
        newBadge={isNewPost(data.created_at)}
      >
        <Stack direction="column" spacing={2}>
          <div tw="mb-2">
            <Typography variant="h2">{data.title}</Typography>
          </div>

          <Stack direction="column" spacing={1}>
            <Grid container rowSpacing={2}>
              <EmployementInformation
                category={data?.category}
                type={data?.type}
                experience={data?.experience}
                location={data?.location}
                positions={data?.positions}
                salary={data?.salary}
                ends={data?.ends}
              />
            </Grid>
          </Stack>
        </Stack>
      </CommonHero>
    </Box>
  );
}
