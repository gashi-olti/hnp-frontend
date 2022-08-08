import * as React from 'react';
import { AlertColor } from '@mui/material';

import SnackbarNotification from '@/components/SnackbarNotification';
import ActionDialog from '@/components/ActionDialog';

type SnackbarTypes = AlertColor;

interface SnackType {
  key?: string;
  message: string;
  type?: AlertColor;
  open: boolean;
}

type ConfirmationType = {
  title: string;
  content: string;
  textConfirm?: string;
  disableBackdropClick?: boolean;
  hideCancel?: boolean;
  catchOnCancel?: boolean;
  handleRequest?: () => Promise<void>;
};

export const NotificationContext = React.createContext<{
  openSnackbar: (message: string, type?: SnackbarTypes) => void;
  closeSnackbar: (key: string) => void;
  openConfirmation: (options: ConfirmationType) => Promise<void>;
  closeConfirmation: (
    event?: {},
    reason?: 'backdropClick' | 'escapeKeyDown' | undefined
  ) => void | Promise<void>;
}>({
  openSnackbar: () => null,
  closeSnackbar: () => null,
  openConfirmation: async () => {},
  closeConfirmation: async () => {},
});

export const useNotification = () => React.useContext(NotificationContext);

export function NotificationProvider({ children }: React.PropsWithChildren<any>) {
  const [isLoading, setIsLoading] = React.useState(false);

  const [snacks, setSnacks] = React.useState<SnackType[]>([]);

  const [confirmationState, setConfirmationState] = React.useState<ConfirmationType | null>(null);
  const awaitingPromiseRef = React.useRef<any>();

  const componentUnmounted = React.useRef<boolean>();

  React.useEffect(() => {
    componentUnmounted.current = true;
    return () => {
      componentUnmounted.current = false;
    };
  }, []);

  const closeSnackbar = React.useCallback(
    (key: string) =>
      setSnacks((existingSnacks) => existingSnacks.filter((item) => item.key !== key)),
    []
  );

  const openSnackbar = React.useCallback((message: string, type?: SnackbarTypes) => {
    const key = (new Date().getTime() + Math.random()).toString();
    const snack: SnackType = {
      key,
      message,
      open: true,
      type,
    };
    setSnacks((existingSnacks) => [...existingSnacks, snack]);
  }, []);

  const openConfirmation = React.useCallback((options: ConfirmationType): Promise<void> => {
    setConfirmationState(options);

    return new Promise((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject };
    });
  }, []);

  const closeConfirmation = React.useCallback(
    (event: any, reason?: 'backdropClick' | 'escapeKeyDown' | undefined): void | Promise<void> => {
      if (confirmationState?.disableBackdropClick && reason === 'backdropClick') return;

      if (confirmationState?.catchOnCancel && awaitingPromiseRef.current) {
        awaitingPromiseRef.current.reject();
      }
      if (componentUnmounted.current) {
        setConfirmationState(null);
      }
    },
    [confirmationState?.catchOnCancel, confirmationState?.disableBackdropClick]
  );

  const submitConfirmation = async () => {
    setIsLoading(true);
    try {
      if (confirmationState?.handleRequest) {
        await confirmationState.handleRequest();
      }
      if (awaitingPromiseRef.current) {
        awaitingPromiseRef.current.resolve();
      }
    } catch (error) {
      awaitingPromiseRef.current.reject(error);
    }

    if (componentUnmounted.current) {
      setIsLoading(false);
      setConfirmationState(null);
    }
  };

  const value = React.useMemo(
    () => ({
      openSnackbar,
      closeSnackbar,
      openConfirmation,
      closeConfirmation,
    }),
    [openSnackbar, closeSnackbar, openConfirmation, closeConfirmation]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {snacks.length > 0 &&
        snacks.map((snack) => (
          <SnackbarNotification
            key={snack.key}
            id={snack.key}
            message={snack.message}
            open={snack.open}
            type={snack.type}
            onClose={() => {
              closeSnackbar(snack.key!);
            }}
          />
        ))}
      {confirmationState && (
        <ActionDialog
          title={confirmationState.title}
          content={confirmationState.content}
          confirmationButtonText={confirmationState.textConfirm}
          hideCancel={confirmationState.hideCancel || false}
          isLoading={isLoading}
          open={confirmationState !== null}
          onConfirm={submitConfirmation}
          onClose={closeConfirmation}
        />
      )}
    </NotificationContext.Provider>
  );
}
