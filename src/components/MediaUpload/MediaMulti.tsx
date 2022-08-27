import * as React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Typography } from '@mui/material';

import { MediaItemType } from '@/interfaces/media.interface';
import useMediaApi from '@/hooks/useMediaApi';
import { useNotification } from '@/providers/NotificationProvider';

import DropZone from './DropZone';
import DraggableMediaItem from './DraggableMediaItem';

type Props = {
  accept?: string;
  name: string;
  entity: string;
  showCreditInfo?: boolean;
  maxItems?: number;
  disabled?: boolean;
};

type GenericMediaItem = {
  [name: string]: MediaItemType[];
};

function MediaMultiInner({
  accept = 'image/jpeg, image/png, image/tiff',
  name,
  entity,
  maxItems = 1,
  showCreditInfo = true,
  disabled = false,
}: Props) {
  const { t } = useTranslation(['media']);
  const { control } = useFormContext<GenericMediaItem>();
  const { uploadImage, uploadFile } = useMediaApi(entity);
  const { openSnackbar } = useNotification();

  const [processing, setProcessing] = React.useState(false);

  const { fields, append, remove, move } = useFieldArray({
    control,
    name,
  });

  const addFile = React.useCallback(
    async (files: FileList) => {
      if (fields.length + files.length <= maxItems) {
        setProcessing(true);
        try {
          const promises: Promise<MediaItemType | null>[] = [];
          const filesArray = Array.from(files);
          filesArray.forEach((file) => {
            if (file.type && file.type.indexOf('image') === 0) {
              promises.push(uploadImage(file, name));
            } else {
              promises.push(uploadFile(file, name));
            }
          });
          const data = await Promise.all(promises);

          data.forEach((item, index) => {
            if (data) {
              append({
                ...item,
                order: fields.length + index,
                type: filesArray[index].type,
              });
            }
          });
          setProcessing(false);
        } catch (error) {
          setProcessing(false);
        }
      } else {
        openSnackbar(
          t('media:too many files selected', { count: maxItems - fields.length }),
          'error'
        );
      }
    },
    [append, fields.length, maxItems, name, openSnackbar, t, uploadImage, uploadFile]
  );

  const moveItems = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      if (disabled) {
        return;
      }

      move(dragIndex, hoverIndex);
    },
    [disabled, move]
  );

  return (
    <div tw="space-y-4">
      <div tw="space-y-4">
        {fields.map((item, index) => (
          <DraggableMediaItem
            key={item.src}
            {...item}
            showCreditInfo={showCreditInfo}
            name={name}
            namePrefix={`${name}[${index}]`}
            removeItem={() => remove(index)}
            moveItem={moveItems}
            index={index}
            disabled={disabled}
          />
        ))}
      </div>
      {fields.length < maxItems && (
        <DropZone accept={accept} onChange={addFile} loading={processing} disabled={disabled} />
      )}
      {fields.length > 1 && (
        <Typography variant="body2">{t('media:change order of media')}</Typography>
      )}
    </div>
  );
}

export default function MediaMulti(props: Props) {
  return (
    // TODO: JS: This code seems to created multiple instances of DndProvider and could throw and error, perhaps we need to wrap this differently
    <DndProvider backend={HTML5Backend}>
      <MediaMultiInner {...props} />
    </DndProvider>
  );
}
