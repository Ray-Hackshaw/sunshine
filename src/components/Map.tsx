import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
import { env } from "~/env.mjs";
import {
  auckland,
  brisbane,
  copenhagen,
  melbourne,
  newYork,
  paris,
  portugal,
  tokyo,
  toronto,
} from "~/utils/cities";

const isohels = [
  {
    firstPlace: auckland,
    secondPlace: brisbane,
  },
  {
    firstPlace: paris,
    secondPlace: newYork,
  },
  {
    firstPlace: portugal,
    secondPlace: melbourne,
  },
  {
    firstPlace: copenhagen,
    secondPlace: tokyo,
  },
];

export const Map = () => {
  const [map, setMap] = useState<mapboxgl.Map>();

  useEffect(() => {
    if (map) return; // initialize map only once
    const newMap = new mapboxgl.Map({
      container: "map",
      accessToken: env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      style: "mapbox://styles/rhackshaw/clkgryts0002e01ohd79g0svm",
      center: [20, 15],
      zoom: 1.75,
      minZoom: 1.75,
      dragRotate: false,
    });
    newMap.on("load", () => {
      isohels.forEach((isohel, i) => {
        newMap.addSource(`${i}`, {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [isohel.firstPlace, isohel.secondPlace],
            },
          },
        });
        newMap.addLayer({
          id: `${i}`,
          type: "line",
          source: `${i}`,
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#FCA311",
            "line-width": 2,
          },
        });
      });
    });

    setMap(newMap);
  });

  return (
    <div className="relative flex h-screen w-full">
      <div id="map" className="w-full" />
    </div>
  );
};
