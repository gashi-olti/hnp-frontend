import React from 'react';
import RichTextEditor, { ToolbarConfig } from 'react-rte';
import { FormHelperText, FormControl, TextFieldProps } from '@mui/material';
import { FieldErrors } from 'react-hook-form';

import theme, { rteRootStyle, rteEditorStyle } from '@/config/theme';

export interface EditorProps {
  placeholder?: string | undefined;
  rootStyle?: object | undefined;
  className?: string | undefined;
  initialValue?: string;
  onChange: (value: string) => void;
  editorStyle?: object | undefined;
  onBlur?: (event: Object) => void;
  name?: string;
  errors?: FieldErrors;
  disabled?: boolean | undefined;
}

export function Editor({
  initialValue,
  onChange,
  placeholder,
  className,
  errors,
  margin = 'normal',
  fullWidth = true,
  onBlur,
  disabled,
}: EditorProps & TextFieldProps) {
  const [editorState, setEditorState] = React.useState(
    initialValue
      ? RichTextEditor.createValueFromString(initialValue, 'html')
      : RichTextEditor.createEmptyValue()
  );

  const rteToolbarConfig: ToolbarConfig = {
    display: [
      'INLINE_STYLE_BUTTONS',
      'BLOCK_TYPE_BUTTONS',
      'LINK_BUTTONS',
      'BLOCK_TYPE_DROPDOWN',
      'HISTORY_BUTTONS',
    ],
    INLINE_STYLE_BUTTONS: [
      { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
      { label: 'Italic', style: 'ITALIC' },
      { label: 'Underline', style: 'UNDERLINE' },
    ],
    BLOCK_TYPE_DROPDOWN: [
      { label: 'Normal', style: 'unstyled' },
      { label: 'Heading Large', style: 'header-one' },
      { label: 'Heading Medium', style: 'header-two' },
      { label: 'Heading Small', style: 'header-three' },
    ],
    BLOCK_TYPE_BUTTONS: [
      { label: 'UL', style: 'unordered-list-item' },
      { label: 'OL', style: 'ordered-list-item' },
    ],
  };

  return (
    <FormControl
      fullWidth={fullWidth}
      margin={margin}
      sx={{ h1: { fontSize: '2rem' }, h2: { fontSize: '1.5rem' }, h3: { fontSize: '1.17rem' } }}
    >
      <RichTextEditor
        //@ts-ignore
        onBlur={onBlur}
        disabled={disabled}
        toolbarConfig={rteToolbarConfig}
        placeholder={placeholder}
        className={className}
        rootStyle={{
          ...rteRootStyle,
          ...(!!errors && { borderColor: theme.palette.error.main }),
        }}
        editorStyle={rteEditorStyle}
        onChange={(value) => {
          setEditorState(value);
          onChange(value.toString('html'));
        }}
        value={editorState}
      />
      <FormHelperText error={!!errors}>{errors?.message ?? ''}</FormHelperText>
    </FormControl>
  );
}

export default Editor;
