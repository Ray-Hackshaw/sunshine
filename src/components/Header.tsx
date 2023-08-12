import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

const links = [
  {
    name: "about",
    href: "/about",
  },
  {
    name: "calculations",
    href: "/calculations",
  },
  {
    name: "data",
    href: "/data",
  },
];

export const Header = () => {
  const router = useRouter();
  return (
    <>
      <header className="absolute top-0 z-20 w-full bg-black bg-opacity-20 px-6 py-4 font-wix text-cloud backdrop-blur md:px-20">
        <div className="flex w-full items-center justify-between">
          <Link
            href="/"
            className="cursor-pointer font-wix text-xl font-semibold transition-all duration-200 ease-in-out hover:text-sun"
          >
            ISOHEL
          </Link>
          <div className="flex gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  router.asPath === link.href && "text-sun",
                  "cursor-pointer font-wix text-sm capitalize transition-all duration-200 ease-in-out hover:text-sun"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </header>
    </>
  );
};
