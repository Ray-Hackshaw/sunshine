import type { GetAllDataOutput } from "~/server/api/routers/isohel";
import type { Pairing } from "./interfaces";

export const calculateIsohels = ({
  isohels,
}: {
  isohels: GetAllDataOutput;
}) => {
  const pairings: Pairing[] = [];
  const filteredItems = Object.entries(isohels).filter(
    ([key, _]) => key !== "id"
  );
  filteredItems.map(([firstKey, firstValue]) => {
    filteredItems.map(([secondKey, secondValue]) => {
      if (firstKey !== secondKey && firstValue === secondValue) {
        pairings.push({ firstCity: firstKey, secondCity: secondKey });
      }
    });
  });
  if (pairings.length === 0) return pairings;

  const uniquePairs = new Set<string>();

  const filteredArray = pairings.filter((obj) => {
    const pairString = [obj.firstCity, obj.secondCity].sort().join("|");
    if (!uniquePairs.has(pairString)) {
      uniquePairs.add(pairString);
      return true;
    }
    return false;
  });

  return filteredArray;
};

export const calculateMidpoint = ({
  first,
  second,
}: {
  first: [number, number];
  second: [number, number];
}) => {
  if (!first && !first[0]) return 0;
  const mpLat = (first[0] + second[0]) / 2;
  const mpLong = (first[1] + second[0]) / 2;
  return { long: mpLong, lat: mpLat };
};
