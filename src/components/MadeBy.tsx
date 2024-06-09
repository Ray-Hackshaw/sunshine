import Link from "next/link";
import { Icons } from "./Icons";

export const MadeBy = () => {
  return (
    <div className="absolute bottom-0 flex w-full justify-between gap-4 border-t border-t-[#88888896] bg-dark p-4 pb-4 text-cloud md:justify-end md:pb-0 lg:hidden">
      <p>
        Made by{" "}
        <span>
          <Link
            href="https://rayhackshaw.com"
            target="_blank"
            className="underline"
          >
            Ray Hackshaw
          </Link>
        </span>
      </p>
      <Icons />
    </div>
  );
};
