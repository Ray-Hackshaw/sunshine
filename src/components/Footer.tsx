import Link from "next/link";

const socialList = [
  {
    icon: "github",
    href: "https://github.com/Ray-Hackshaw",
  },
  {
    icon: "linkedin",
    href: "https://www.linkedin.com/in/rayhackshaw/",
  },
  {
    icon: "contact",
    href: "mailto:ray@rayhackshaw.com",
  },
];

const SocialLinks = () => {
  return (
    <div className="flex gap-2">
      {socialList.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="cursor-pointer transition-all duration-200 ease-in-out hover:text-sun"
          target="_blank"
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

export const Footer = () => {
  return (
    <>
      <footer className="fixed bottom-0 w-full bg-black bg-opacity-20 px-2 font-wix text-cloud backdrop-blur md:px-20">
        <div className="w-full justify-between md:flex">
          <p className="text-sm font-medium md:text-base">
            built with{" "}
            <span>
              <Link
                className="transition-all duration-200 ease-in-out hover:text-sun"
                href="https://www.mapbox.com/"
                target="_blank"
              >
                Mapbox
              </Link>
            </span>{" "}
            and{" "}
            <span>
              <Link
                className="transition-all duration-200 ease-in-out hover:text-sun"
                href="https://openweathermap.org/"
                target="_blank"
              >
                OpenWeatherMap
              </Link>
            </span>
          </p>
          <SocialLinks />
        </div>
      </footer>
    </>
  );
};
