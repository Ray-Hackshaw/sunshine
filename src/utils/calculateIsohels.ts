import { GetAllDataOutput } from "~/server/api/routers/isohel";

export interface Pairing {
  firstCity: string;
  secondCity: string;
}

enum Latitude {
  auckland = 1239123,
  melbourne = 123,
}
// some form of coordinate pairing to return coordinates rather than city names for isohel.firstPlace and isohel.secondPlace
// const findCoordinates

export const calculateIsohels = ({
  isohels,
}: {
  isohels: GetAllDataOutput[0];
}) => {
  const pairings: Pairing[] = [];

  const filteredItems = Object.entries(isohels).filter(
    ([key, value]) => key !== "Id" && key !== "lastUpdated"
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
