export const convertTo24HourFormat = (timeString: any) => {
  const [time, period] = timeString.split(' ');
  const [hours, minutes] = time.split(':');
  let hour = parseInt(hours);

  if (period === 'PM' && hour !== 12) {
    hour += 12;
  } else if (period === 'AM' && hour === 12) {
    hour = 0;
  }

  return `${hour.toString().padStart(2, '0')}:${minutes}`;
};
