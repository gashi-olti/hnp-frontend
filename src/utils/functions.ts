import { DateTime } from 'luxon';

export const isNewPost = (date?: string | Date) => {
  if (date) {
    const currentDate = DateTime.now();
    const dateExpires = DateTime.fromISO(date.toString()).plus({ days: 5 });
    const difference = dateExpires.diff(currentDate, 'days');

    if (difference.days > 0) return true;

    return false;
  }
};
