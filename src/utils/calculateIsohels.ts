import { type GetAllDataOutput } from "~/server/api/routers/isohel";

export interface Pairing {
  firstCity: string;
  secondCity: string;
}

export const calculateIsohels = ({
  isohels,
}: {
  isohels: GetAllDataOutput[0];
}) => {
  const pairings: Pairing[] = [];

  const filteredItems = Object.entries(isohels).filter(
    ([key, _]) => key !== "Id" && key !== "lastUpdated"
  );
  filteredItems.map(([firstKey, firstValue]) => {
    filteredItems.map(([secondKey, secondValue]) => {
      if (firstKey !== secondKey && firstValue === secondValue) {
        pairings.push({ firstCity: firstKey, secondCity: secondKey });
      }
    });
  });

  return pairings;
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
