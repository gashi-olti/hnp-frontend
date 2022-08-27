import * as React from 'react';
import { useFormContext, useWatch, get } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { FormHelperText } from '@mui/material';

import { MediaItemType } from '@/interfaces/media.interface';
import useMediaApi from '@/hooks/useMediaApi';
import { useNotification } from '@/providers/NotificationProvider';

import DropZone from './DropZone';
import MediaItem from './MediaItem';

type Props = {
  accept?: string;
  name: string;
  entity: string;
  showCreditInfo?: boolean;
  disabled?: boolean;
};

type GenericMediaItem = {
  [name: string]: MediaItemType | null;
};

export default function MediaSingle({
  accept = 'image/jpeg, image/png, image/tiff',
  name,
  entity,
  showCreditInfo = true,
  disabled = false,
}: Props) {
  const { t } = useTranslation(['media']);
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<GenericMediaItem>();
  const { uploadImage, uploadFile, isLoading } = useMediaApi(entity);
  const { openSnackbar } = useNotification();

  const item = useWatch({
    name,
    control,
  });

  const addFile = React.useCallback(
    async (files: FileList) => {
      if (files.length) {
        try {
          const file = files[0];

          const data =
            file.type && file.type.indexOf('image') === 0
              ? await uploadImage(file, name)
              : await uploadFile(file, name);

          if (data) {
            setValue(
              name,
              { ...data, order: 0, type: file.type },
              { shouldValidate: true, shouldDirty: true }
            );
          }
        } catch (error) {
          //
        }
      } else {
        openSnackbar(t('media:too many files selected'), 'error');
      }
    },
    [name, openSnackbar, setValue, t, uploadImage, uploadFile]
  );

  // @TODO: Currently not working - need to fix
  // const changeFile = React.useCallback(
  //   async (files: FileList) => {
  //     if (files.length) {
  //       try {
  //         const data = await uploadImage(files[0], name);
  //         if (data) {
  //           setValue(name, { ...item, src: data.src, source: data.source });
  //         }
  //       } catch (error) {
  //         //
  //       }
  //     } else {
  //       openSnackbar(t('media:too many files selected'), 'error');
  //     }
  //   },
  //   [item, name, openSnackbar, setValue, t, uploadImage]
  // );

  const removeItem = () => {
    setValue(name, {}); // Quick fix to get nested values to clear
    setValue(name, null, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
  };

  const hasItem = item && item.source;

  return (
    <>
      {hasItem ? (
        <MediaItem
          {...item}
          showCreditInfo={showCreditInfo}
          namePrefix={name}
          removeItem={removeItem}
          disabled={disabled}
          accept={accept}
          // changeImage={changeFile} // Currently not working
        />
      ) : (
        <DropZone accept={accept} onChange={addFile} loading={isLoading} disabled={disabled} />
      )}
      {!!get(errors, name) && <FormHelperText error>{t('validation:required')}</FormHelperText>}
    </>
  );
}
