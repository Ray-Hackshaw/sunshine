import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
import { env } from "~/env.mjs";
import { api } from "~/utils/api";
import type { Pairing } from "~/utils/interfaces";
import { Latitude, Longitude } from "~/utils/cities";

export const Map = ({ points }: { points: Pairing[] }) => {
  const [map, setMap] = useState<mapboxgl.Map>();

  const { data: sunlights } = api.isohel.getAllData.useQuery();

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

    const featureData = points.map((isohel) => {
      const firstLat = Latitude[isohel.firstCity as keyof typeof Latitude];
      const firstLong = Longitude[isohel.firstCity as keyof typeof Longitude];

      const secondLat = Latitude[isohel.secondCity as keyof typeof Latitude];
      const secondLong = Longitude[isohel.secondCity as keyof typeof Longitude];

      const first = [firstLat, firstLong] as [number, number];
      const second = [secondLat, secondLong] as [number, number];

      return {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [first, second],
        },
      };
    });

    const allPoints = Object.entries(sunlights!)
      .filter((x) => x[0] !== "id")
      .map(([key, value]) => {
        const lat = Latitude[key as keyof typeof Latitude] as number;
        const long = Longitude[key as keyof typeof Longitude] as number;
        return {
          type: "Feature",
          properties: {
            description: `${value}`,
          },
          geometry: {
            type: "Point",
            coordinates: [lat, long],
          },
        };
      });

    const pointSet = {
      type: "FeatureCollection",
      features: allPoints,
    };

    const dataSet = {
      type: "FeatureCollection",
      features: featureData,
    };

    newMap.on("load", () => {
      newMap.addSource(`places`, {
        type: "geojson",
        data: dataSet as GeoJSON.FeatureCollection,
      });
      newMap.addSource("points", {
        type: "geojson",
        data: pointSet as GeoJSON.FeatureCollection,
      });
      newMap.addLayer({
        id: `places`,
        type: "line",
        source: `places`,
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#FCA311",
          "line-width": 3,
        },
      });

      newMap.addLayer({
        id: "points",
        type: "symbol",
        source: "points",
        layout: {
          "text-field": ["get", "description"],
          "text-variable-anchor": ["top", "bottom", "left", "right"],
          "text-radial-offset": 0.5,
          "text-justify": "auto",
          "icon-image": ["get", "icon"],
          "text-size": 15,
          "text-font": ["Arial Unicode MS Regular"],
        },
        paint: {
          "text-color": "#FCA311",
          "text-halo-color": "#838383",
          "text-halo-width": 1,
        },
      });
    });

    setMap(newMap);
  }, [map, points, sunlights]);

  return (
    <div
      id="map"
      className="h-[80vh] w-full overflow-hidden rounded-md border-2"
    />
  );
};
