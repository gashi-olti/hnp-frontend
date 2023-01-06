import * as React from 'react';
import tw, { styled } from 'twin.macro';
import { useTranslation } from 'next-i18next';
import { Typography, Button, CircularProgress } from '@mui/material';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';

import { useNotification } from '@/providers/NotificationProvider';

type StyledElement = {
  hover?: boolean;
  disabled?: boolean;
};

const DropArea = styled.div<StyledElement>(({ hover, disabled }) => [
  tw`relative w-full flex flex-col items-center justify-center text-black px-4 py-6`,
  tw`bg-gray-100 border-2 border-dotted border-gray-300 rounded-md`,
  tw`transition-colors`,
  hover && tw`border-gray-400 text-sky-700`,

  disabled && tw`opacity-50`,
]);

const DropAreaInner = styled.div<StyledElement>(({ hover }) => [
  tw`flex flex-col items-center justify-center text-center transform transition-transform`,
  hover ? tw`scale-110` : tw`scale-100`,
]);

type Props = {
  accept?: string;
  loading?: boolean;
  disabled?: boolean;
  onChange: (files: FileList) => void;
};

export default function DropZone({
  accept = 'image/jpeg, image/png, image/tiff',
  loading = false,
  disabled = false,
  onChange,
}: Props) {
  const { t } = useTranslation(['common', 'media']);
  const { openSnackbar } = useNotification();
  const [dropzoneHover, setDropzoneHover] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const disableDropZone = disabled || loading;

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (disableDropZone) return;

    const { files } = event.dataTransfer;

    if (files.length) {
      if (!accept.includes(files[0].type)) {
        openSnackbar(t('media:file type not allowed'), 'error');
        setDropzoneHover(false);
        return;
      }

      onChange(files);
    }

    setDropzoneHover(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (disableDropZone) return;

    const { files } = event.target;
    if (files) {
      onChange(files);
    }
  };

  const handleInputClick = (event: React.ChangeEvent<any>) => {
    // eslint-disable-next-line no-param-reassign
    event.target.value = null;
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (disableDropZone) return;

    setDropzoneHover(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (disableDropZone) return;

    setDropzoneHover(false);
  };

  const openFileSelection = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <DropArea
      hover={dropzoneHover}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      disabled={disableDropZone}
    >
      {loading && <CircularProgress size={40} tw="absolute!" />}
      <DropAreaInner hover={dropzoneHover} disabled={disabled}>
        <UploadFileRoundedIcon fontSize="large" tw="text-gray-600" />
        <Typography variant="h4" tw="mb-3!">
          {t('drag and drop')}
        </Typography>
        <Button color="primary" size="small" onClick={openFileSelection} disabled={disableDropZone}>
          {t('or click here')}
        </Button>
      </DropAreaInner>
      <input
        accept={accept}
        type="file"
        ref={fileInputRef}
        onChange={handleInputChange}
        onClick={handleInputClick}
        tw="hidden"
      />
    </DropArea>
  );
}
