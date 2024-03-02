export const capitalize = (text: string) => {
  if (text === "losangeles") {
    return "Los Angeles";
  }

  if (text === "capetown") {
    return "Cape Town";
  }

  return text.replace(/\b\w/g, (match) => match.toUpperCase());
};
