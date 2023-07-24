import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { env } from "~/env.mjs";

export const Map = () => {
  const [map, setMap] = useState<mapboxgl.Map>();
  const [lng, setLng] = useState(20);
  const [lat, setLat] = useState(20);
  const [zoom, setZoom] = useState(1.75);

  useEffect(() => {
    if (map) return; // initialize map only once
    const newMap = new mapboxgl.Map({
      container: "map",
      accessToken: env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      style: "mapbox://styles/rhackshaw/clkgryts0002e01ohd79g0svm",
      center: [lng, lat],
      zoom: zoom,
      minZoom: 1.3,
      touchPitch: false,
      dragRotate: false,
      dragPan: false,
    });
    setMap(newMap);
  });

  return (
    <div className="relative flex w-full">
      <div id="map" className="w-full" />
    </div>
  );
};
