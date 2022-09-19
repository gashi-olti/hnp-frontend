import * as React from 'react';
import { Box, Button, ClickAwayListener, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CheckIcon from '@mui/icons-material/Check';
import { useRouter } from 'next/router';
import { styled } from 'twin.macro';

import theme from '@/config/theme';

const languages = ['sq', 'en'];

const SelectedButton = styled(Button)(() => ({
  padding: 0,
  paddingInline: 4,
  borderRadius: 3,
  minWidth: 50,
  backgroundColor: theme.palette.primary.contrastText,
  color: theme.palette.grey[800],
  transition: 'all ease-in 100ms',
}));

export default function LanguageSelector() {
  const router = useRouter();
  const [language, setLanguage] = React.useState<string>(router.locale ?? 'sq');
  const [open, setOpen] = React.useState(false);

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        sx={{
          position: 'relative',
          bgcolor: theme.palette.grey[200],
          width: 'auto',
          height: 'auto',
          borderRadius: 0.1,
        }}
      >
        <SelectedButton
          onClick={() => {
            setOpen(!open);
          }}
          disableRipple
          variant="text"
          size="small"
          endIcon={!open ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        >
          <Typography variant="subtitle2">{language}</Typography>
        </SelectedButton>

        {open ? (
          <Box
            sx={{
              position: 'absolute',
              zIndex: 999,
              bgcolor: theme.palette.primary.contrastText,
              mt: 0.5,
              borderRadius: 0.1,
              border: `1px solid ${theme.palette.grey[400]}`,
            }}
          >
            {languages.map((lang) => (
              <SelectedButton
                key={lang}
                size="small"
                onClick={() => {
                  setLanguage(lang);
                  router.push(router.asPath, router.asPath, { locale: lang });
                }}
                sx={{ display: 'flex', justifyContent: 'space-between' }}
                endIcon={lang === language ? <CheckIcon /> : null}
                variant="text"
              >
                <Typography variant="subtitle2">{lang}</Typography>
              </SelectedButton>
            ))}
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
}
