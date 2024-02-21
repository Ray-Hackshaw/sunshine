import type { NextApiRequest, NextApiResponse } from "next";
import { calculateSunlight } from "~/server/utils/calculations";
import { locationNames } from "~/utils/cities";
import type { City, CityWithUrl, SunEntryDynamic } from "~/utils/interfaces";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cityResponses: CityWithUrl[] = [];

    locationNames.forEach((city) => {
      cityResponses.push({
        city,
        url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=20c8317a75161fafee1718a9ffd5f7b2&units=metric`,
      });
    });

    const allResponsesWithData: City[] = (await Promise.all(
      cityResponses.map(async (x) => {
        return (await fetch(x.url)).json();
      })
    )) as City[];

    const sunlights: SunEntryDynamic[] = [];

    allResponsesWithData.forEach((city) => {
      const sunlight = calculateSunlight({
        sunrise: city.sys.sunrise,
        sunset: city.sys.sunset,
      });
      const name = city.name.toLowerCase();
      sunlights.push({
        [name]: sunlight,
      });
    });

    return res.status(200).json({
      sunlights: sunlights,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;