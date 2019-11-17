interface TimeRemaining {
  timeRemainingString: string;
  isHot: boolean;
}

const dayInMs = 1000 * 60 * 60 * 24;
const hourInMs = 1000 * 60 * 60;
const minuteInMs = 1000 * 60;

export const calculateEndDate = (launchDate: Date, days: number): Date => {
  return new Date(launchDate.getTime() + days * dayInMs);
};

export const calculateTimeRemaining = (endDate: Date): TimeRemaining => {
  const today = new Date();

  const differenceInMs = endDate.getTime() - today.getTime();

  console.log(endDate);

  const daysLeft = differenceInMs / dayInMs;

  if (daysLeft > 2)
    return {
      timeRemainingString: `${Math.round(daysLeft)} days`,
      isHot: false
    };

  if (daysLeft > 1)
    return {
      timeRemainingString: `${Math.floor(daysLeft)} days ${Math.floor(
        (daysLeft - Math.floor(daysLeft)) * 24
      )} hours`,
      isHot: false
    };

  if (differenceInMs > hourInMs) {
    const hoursLeft = differenceInMs / hourInMs;

    return {
      timeRemainingString: `${Math.floor(hoursLeft)} hours`,
      isHot: true
    };
  }

  const minutesLeft = differenceInMs / minuteInMs;

  return {
    timeRemainingString: `${Math.floor(minutesLeft)} minutes`,
    isHot: true
  };
};
