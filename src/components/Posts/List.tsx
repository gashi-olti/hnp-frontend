import React from 'react';
import { Card, Box, Stack, Typography, styled, Chip } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTranslation } from 'next-i18next';

import { Images } from '@/components/Icons/Images';
import { PostModel } from '@/interfaces/post.interface';
import getJobCategory from '@/config/jobCategory';

import CustomLink from '../CustomLink';
import NewBadge from '../Common/NewBadge';

const PostImageStyle = styled('img')(() => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  objectFit: 'cover',
}));

const ChipStyled = styled(Chip)(() => ({
  minWidth: 65,
  maxWidth: 140,
  marginLeft: 2,
  marginRight: 2,
  paddingLeft: 5,
  paddingRight: 5,
  '& .MuiSvgIcon-root': { color: 'white' },
}));

interface PostsListProps {
  data?: PostModel;
}

export default function List({ data }: PostsListProps) {
  const { t } = useTranslation([]);

  return (
    <CustomLink href={'#'}>
      <Card elevation={8} sx={{ borderRadius: 0.5 }}>
        <Box
          // tw="bg-gradient-to-r from-sky to-cyan"
          sx={{ position: 'relative', overflow: 'hidden' }}
          display="block"
          minHeight={250}
        >
          <NewBadge top="16px" left="-160px" fontSize="18px" paddingTop="2px" paddingBottom="2px" />
          {data?.company?.cover?.src ? (
            <PostImageStyle src={data?.company?.cover?.src} title={data?.company?.cover?.title} />
          ) : (
            <PostImageStyle alt="" src={Images.Google} />
          )}
        </Box>
        <div tw="bg-gradient-to-r from-sky to-cyan h-full">
          <Box
            sx={{
              paddingY: 1,
              minHeight: '140px',
            }}
          >
            <Stack flexDirection="column" minHeight="120px">
              <Typography
                tw="text-white font-semibold text-xl mb-2 line-clamp-2"
                sx={{ height: 64, paddingX: 2 }}
              >
                {data?.title ?? ''}
              </Typography>

              <Stack
                flexDirection="row"
                justifyContent="space-between"
                alignItems="flex-start"
                width="100%"
                mb={1}
                px={1}
              >
                <ChipStyled
                  icon={<CategoryIcon tw="text-base" />}
                  label={getJobCategory(t).map((category) => {
                    return category.key === data?.category ? category.value : '';
                  })}
                  tw="text-white line-clamp-1 flex flex-row justify-center"
                />
                <ChipStyled
                  icon={<ApartmentIcon tw="text-base" />}
                  label={data?.company?.name ?? ''}
                  tw="text-white line-clamp-1 flex flex-row justify-center"
                />
              </Stack>

              <Stack
                flexDirection="row"
                justifyContent="space-between"
                alignItems="flex-start"
                width="100%"
                px={1}
                mb={0.5}
              >
                <ChipStyled
                  icon={<LocationOnIcon tw="text-base" />}
                  label={data?.location ?? ''}
                  tw="text-white line-clamp-1 flex flex-row justify-center"
                />

                <ChipStyled
                  icon={<AccessTimeIcon tw="text-lg" />}
                  label="12 dite"
                  tw="text-white line-clamp-1 flex flex-row justify-center"
                />
              </Stack>
            </Stack>
          </Box>
        </div>
      </Card>
    </CustomLink>
  );
}
