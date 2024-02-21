export const calculateSunlight = ({
  sunrise,
  sunset,
}: {
  sunrise: number;
  sunset: number;
}) => {
  const value = sunset - sunrise;
  const rounded = Math.ceil(value / 100) * 100;
  return rounded;
};
