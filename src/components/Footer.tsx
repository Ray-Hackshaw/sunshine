import Link from "next/link";
import { useRouter } from "next/router";

const socialList = [
  {
    icon: "github",
    href: "github",
  },
  {
    icon: "linkedin",
    href: "linkedin",
  },
  {
    icon: "instagram",
    href: "instagram",
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
      <footer className="absolute bottom-0 w-full bg-black bg-opacity-20 px-20 py-4 font-wix text-cloud backdrop-blur">
        <div className="flex w-full justify-between">
          <div className="text-xl">by Ray Hackshaw</div>
          <SocialLinks />
        </div>
      </footer>
    </>
  );
};
