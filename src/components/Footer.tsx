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
      <footer className="absolute bottom-0 w-full bg-black bg-opacity-20 px-6 py-4 font-wix text-cloud backdrop-blur md:px-20">
        <div className="flex w-full justify-end">
          <SocialLinks />
        </div>
      </footer>
    </>
  );
};
