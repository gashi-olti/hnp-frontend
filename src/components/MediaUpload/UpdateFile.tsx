import * as React from 'react';
import { useTranslation } from 'next-i18next';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

type Props = {
  accept?: string;
  onChange: (files: FileList) => void;
};

export default function UpdateFile({
  accept = 'image/jpeg, image/png, image/tiff',
  onChange,
}: Props) {
  const { t } = useTranslation(['media']);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { files } = event.target;

    if (files) {
      onChange(files);
    }
  };

  const handleInputClick = (event: React.ChangeEvent<any>) => {
    // eslint-disable-next-line no-param-reassign
    event.target.value = null;
  };

  const openFileSelection = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <IconButton
        onClick={openFileSelection}
        color="primary"
        tw="bg-white!"
        aria-label={t('media:change image')}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <input
        accept={accept}
        type="file"
        ref={fileInputRef}
        onChange={handleInputChange}
        onClick={handleInputClick}
        tw="hidden"
      />
    </>
  );
}
