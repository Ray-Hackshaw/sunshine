import Link from "next/link";
import GithubIcon from "./svg/Github";

export const Icons = () => {
  return (
    <div className="flex items-center gap-4">
      <Link href="https://github.com/Ray-Hackshaw/sunshine" target="_blank">
        <GithubIcon width={24} height={24} />
      </Link>
    </div>
  );
};
