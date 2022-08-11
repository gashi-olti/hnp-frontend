import { CircularProgress } from '@mui/material';

export default function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div tw="w-full h-full flex justify-center items-center" className={className}>
      <CircularProgress />
    </div>
  );
}
