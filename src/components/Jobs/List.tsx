import React from 'react';
import { Card, Box, Stack, Typography, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Image from 'next/image';

import { JobModel } from '@/interfaces/job.interface';
// import Image from '@/components/Common/Image';
import { Images } from '@/components/Icons/Images';

import CustomLink from '../CustomLink';
import NewBadge from '../Common/NewBadge';

interface JobsListProps {
  data: JobModel;
}

export default function List({ data }: JobsListProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
  const { title, description, new_post } = data;

  return (
    <CustomLink href={'#'}>
      <Card tw="shadow-2xl" sx={{ borderRadius: 0.5 }}>
        <Box
          // tw="bg-gradient-to-r from-sky to-cyan"
          sx={{ position: 'relative', overflow: 'hidden' }}
          display="block"
        >
          <NewBadge top="16px" left="-160px" fontSize="18px" paddingTop="2px" paddingBottom="2px" />
          <Image alt="Google Logo" src={Images.Google} title="Google" />
        </Box>
        <div tw="bg-gradient-to-r from-sky to-cyan h-full">
          <Box
            sx={{
              paddingY: 1,
              minHeight: '180px',
            }}
          >
            <Stack flexDirection="column" minHeight="120px">
              <Typography
                tw="text-white font-bold text-xl mb-2 line-clamp-2"
                sx={{ maxHeight: 64, paddingX: 2 }}
              >
                Full Stack Engineer
              </Typography>

              <Stack
                flexDirection="row"
                justifyContent="space-between"
                alignItems="flex-start"
                width="100%"
              >
                <ListItem sx={{ paddingX: 2 }}>
                  <ListItemIcon>
                    <CategoryIcon fontSize="small" sx={{ color: 'background.default' }} />
                  </ListItemIcon>
                  <ListItemText
                    tw="text-white line-clamp-1"
                    sx={{ maxHeight: 50 }}
                    primary="IT"
                    primaryTypographyProps={{ variant: 'body1', color: 'background.default' }}
                  />
                </ListItem>
                <ListItem sx={{ paddingX: 2 }}>
                  <ListItemIcon>
                    <ApartmentIcon fontSize="small" sx={{ color: 'background.default' }} />
                  </ListItemIcon>
                  <ListItemText
                    tw="text-white line-clamp-1"
                    sx={{ maxHeight: 50 }}
                    primary="Google"
                    primaryTypographyProps={{ variant: 'body1', color: 'background.default' }}
                  />
                </ListItem>
              </Stack>

              <Stack
                flexDirection="row"
                justifyContent="space-between"
                alignItems="flex-start"
                width="100%"
              >
                <ListItem sx={{ paddingX: 2 }}>
                  <ListItemIcon>
                    <LocationOnIcon fontSize="small" sx={{ color: 'background.default' }} />
                  </ListItemIcon>
                  <ListItemText
                    tw="text-white line-clamp-2"
                    sx={{ maxHeight: 50 }}
                    primary="Prishtine, Kosove"
                    primaryTypographyProps={{ variant: 'body1', color: 'background.default' }}
                  />
                </ListItem>
                <ListItem sx={{ paddingX: 2 }}>
                  <ListItemIcon>
                    <AccessTimeIcon fontSize="small" sx={{ color: 'background.default' }} />
                  </ListItemIcon>
                  <ListItemText
                    tw="text-white line-clamp-1"
                    sx={{ maxHeight: 50 }}
                    primary="12 dite"
                    primaryTypographyProps={{ variant: 'body1', color: 'background.default' }}
                  />
                </ListItem>
              </Stack>
            </Stack>
          </Box>
        </div>
      </Card>
    </CustomLink>
  );
}
