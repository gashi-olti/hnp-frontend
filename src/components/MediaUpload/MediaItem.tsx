import * as React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useFormContext } from 'react-hook-form';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VideoLibrary from '@mui/icons-material/VideoLibrary';
import PictureAsPdf from '@mui/icons-material/PictureAsPdf';
import PhotoIcon from '@mui/icons-material/Photo';

import InputController from '@/components/Forms/InputController';
import { MediaItemType } from '@/interfaces/media.interface';
import { useNotification } from '@/providers/NotificationProvider';

import UpdateFile from './UpdateFile';

export type MediaItemProps = {
  accept?: string;
  disabled?: boolean;
  showCreditInfo: boolean;
  namePrefix: string;
  removeItem: () => void;
  changeImage?: (files: FileList) => void;
} & MediaItemType;

export default function MediaItem({
  accept = 'image/jpeg, image/png, image/tiff',
  src,
  type,
  title,
  disabled = false,
  namePrefix,
  removeItem,
  changeImage,
}: MediaItemProps) {
  const { t } = useTranslation(['media', 'common', 'validation']);
  const { openConfirmation } = useNotification();

  const [hoverImage, setHoverImage] = React.useState(false);

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const handleRemove = async () => {
    openConfirmation({
      title: t('common:are you sure'),
      content: t('media:delete the media'),
    }).then(() => {
      removeItem();
    });
  };

  return (
    <div tw="relative flex py-3 pl-4 pr-10 bg-gray-100 h-32 border-2 border-gray-200 rounded-md">
      <span tw="absolute top-11 right-2">
        <IconButton
          onClick={handleRemove}
          size="small"
          aria-label={t('media:remove file')}
          disabled={disabled}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </span>
      <div
        tw="relative w-24"
        onMouseEnter={() => setHoverImage(true)}
        onMouseLeave={() => setHoverImage(false)}
      >
        {src && (
          <a
            href={src}
            tw="w-full h-full flex justify-center items-center"
            target="_blank"
            rel="noreferrer"
          >
            {type?.indexOf('application') === 0 && <PictureAsPdf tw="text-5xl" />}
            {type?.indexOf('video') === 0 && <VideoLibrary tw="text-5xl" />}
            {type?.indexOf('image') === 0 && type?.indexOf('image/tif') !== 0 && (
              <Image src={src} alt={title} layout="fill" objectFit="contain" unoptimized />
            )}
            {type?.indexOf('image/tif') === 0 && <PhotoIcon tw="text-5xl" />}
          </a>
        )}

        {changeImage && hoverImage && (
          <span tw="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <UpdateFile accept={accept} onChange={changeImage} />
          </span>
        )}
      </div>
      <div tw="ml-4 flex-auto mt-4 mr-2">
        <InputController
          name={`${namePrefix}.title`}
          control={control}
          errors={errors}
          defaultValue={title}
          label={t('media:file title')}
          aria-label={t('media:file title')}
          size="small"
          disabled={disabled}
          hiddenLabel
        />
      </div>
    </div>
  );
}
