import { NextApiRequest, NextApiResponse } from "next";

interface City {
  coord: {
    lon: number;
    lat: number;
  };
  weather: any;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: 2;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export type SunEntryDynamic = { [key: string]: number };

const calculateSunlight = ({
  sunrise,
  sunset,
}: {
  sunrise: number;
  sunset: number;
}) => {
  const value = sunset - sunrise;
  const rounded = Math.ceil(value / 1000) * 1000;
  return rounded;
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const getAllData = async () => {
    const [
      mel,
      lon,
      bris,
      cope,
      tok,
      tor,
      akl,
      van,
      mad,
      kyo,
      osa,
      cai,
      ista,
      seo,
      mos,
      jak,
      shan,
      los,
    ] = await Promise.all([
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Melbourne&appid=20c8317a75161fafee1718a9ffd5f7b2&units=metric"
      ),
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=London&appid=20c8317a75161fafee1718a9ffd5f7b2&units=metric"
      ),
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Brisbane&appid=20c8317a75161fafee1718a9ffd5f7b2&units=metric"
      ),
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Copenhagen&appid=20c8317a75161fafee1718a9ffd5f7b2&units=metric"
      ),
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=20c8317a75161fafee1718a9ffd5f7b2&units=metric"
      ),
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=20c8317a75161fafee1718a9ffd5f7b2&units=metric"
      ),
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Auckland&appid=20c8317a75161fafee1718a9ffd5f7b2&units=metric"
      ),
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Vancouver&appid=20c8317a75161fafee1718a9ffd5f7b2&units=metric"
      ),
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=20c8317a75161fafee1718a9ffd5f7b2&units=metric"
      ),
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Kyoto&appid=20c8317a75161fafee1718a9ffd5f7b2&units=metric"
      ),
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Osaka&appid=20c8317a75161fafee1718a9ffd5f7b2&units=metric"
      ),
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Cairo&appid=20c8317a75161fafee1718a9ffd5f7b2&units=metric"
      ),
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Istanbul&appid=20c8317a75161fafee1718a9ffd5f7b2&units=metric"
      ),
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=20c8317a75161fafee1718a9ffd5f7b2&units=metric"
      ),
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=20c8317a75161fafee1718a9ffd5f7b2&units=metric"
      ),
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Jakarta&appid=20c8317a75161fafee1718a9ffd5f7b2&units=metric"
      ),
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Shanghai&appid=20c8317a75161fafee1718a9ffd5f7b2&units=metric"
      ),
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Los%20Angeles&appid=20c8317a75161fafee1718a9ffd5f7b2&units=metric"
      ),
    ]);

    const cities: City[] = await Promise.all([
      mel.json(),
      lon.json(),
      bris.json(),
      cope.json(),
      tok.json(),
      tor.json(),
      akl.json(),
      van.json(),
      mad.json(),
      kyo.json(),
      osa.json(),
      cai.json(),
      ista.json(),
      seo.json(),
      mos.json(),
      jak.json(),
      shan.json(),
      los.json(),
    ]);

    const sunlights: SunEntryDynamic[] = [];

    cities.forEach((city) => {
      const sunlight = calculateSunlight({
        sunrise: city.sys.sunrise,
        sunset: city.sys.sunset,
      });

      sunlights.push({
        [city.name]: sunlight,
      });
    });

    return res.status(200).json({
      sunlights: sunlights,
    });
  };

  switch (req.method) {
    case "GET":
      return getAllData();
    default:
      return res.status(405).end(`Method ${req.method} not allowed`);
  }
};

export default handler;
