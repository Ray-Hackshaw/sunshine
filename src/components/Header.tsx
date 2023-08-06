import Link from "next/link";

export const Header = () => {
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
          <Link
            href="/about"
            className="cursor-pointer font-wix text-sm transition-all duration-200 ease-in-out hover:text-sun"
          >
            about
          </Link>
        </div>
      </header>
    </>
  );
};
