import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
import { env } from "~/env.mjs";
import { Pairing, calculateMidpoint } from "~/utils/calculateIsohels";

export enum Latitude {
  auckland = 174.76318,
  brisbane = 153.0228,
  melbourne = 144.963161,
  tokyo = 139.766991,
  copenhagen = 12.5697339,
  toronto = -73.891045,
  shanghai = 121.469098,
  jakarta = 106.827183,
  moscow = 37.6174943,
  seoul = 126.97810936771378,
  istanbul = 28.966542168875037,
  cairo = 31.235726,
  osaka = 135.501454,
  kyoto = 135.755607,
  madrid = -3.703583,
  vancouver = -123.11395559921081,
}

export enum Longitude {
  auckland = -36.852095,
  brisbane = -27.4697,
  melbourne = -37.814218,
  tokyo = 35.680818,
  copenhagen = 55.6753132,
  toronto = 40.646722,
  shanghai = 31.232234,
  jakarta = -6.1753942,
  moscow = 55.7504461,
  seoul = 37.566316529399074,
  istanbul = 41.00879853442103,
  cairo = 30.044388,
  osaka = 34.693757,
  kyoto = 35.021041,
  madrid = 40.416705,
  vancouver = 49.260849996098955,
}

export const Map = ({ points }: { points: Pairing[] }) => {
  const [map, setMap] = useState<mapboxgl.Map>();

  useEffect(() => {
    if (map) return; // initialize map only once

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

    const newMap = new mapboxgl.Map({
      container: "map",
      accessToken: env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      style: "mapbox://styles/rhackshaw/clkgryts0002e01ohd79g0svm",
      center: [20, 15],
      zoom: 1.75,
      minZoom: 1.75,
      dragRotate: false,
    });

    const featureData = points.map((isohel, i) => {
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

    const dataSet = {
      type: "FeatureCollection",
      features: featureData,
    };

    newMap.on("load", (e) => {
      newMap.addSource(`places`, {
        type: "geojson",
        data: dataSet as GeoJSON.FeatureCollection,
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
          "line-width": 2,
        },
      });

      //   newMap.on("mouseenter", `places`, (e) => {
      //     newMap.getCanvas().style.cursor = "pointer";
      //     console.log("ENTERED");
      //     if (!e.features || !e.features[0]) return;

      //     const coordinates = (e.features[0].geometry as GeoJSON.LineString)
      //       .coordinates;
      //     const first = coordinates[0] as [number, number];
      //     const second = coordinates[1] as [number, number];

      //     const midpoint = calculateMidpoint({ first: first, second: second });
      //     if (midpoint !== 0) {
      //       popup
      //         .setLngLat([midpoint.long / 1.75, midpoint.lat / 1.75])
      //         .setHTML("Hello")
      //         .addTo(newMap);
      //     }
      //   });
      //   newMap.on("mouseleave", `places`, () => {
      //     newMap.getCanvas().style.cursor = "";
      //     popup.remove();
      //   });
    });

    setMap(newMap);
  });

  return (
    <div className="relative flex h-screen w-full">
      <div id="map" className="w-full" />
    </div>
  );
};
