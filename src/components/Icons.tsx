import Link from "next/link";
import GithubIcon from "./svg/Github";
import LinkedInIcon from "./svg/LinkedIn";
import MailIcon from "./svg/Mail";

export const Icons = () => {
  return (
    <div className="flex items-center gap-4">
      <Link href="https://github.com/Ray-Hackshaw" target="_blank">
        <GithubIcon width={24} height={24} />
      </Link>
      <Link href="https://www.linkedin.com/in/rayhackshaw/" target="_blank">
        <LinkedInIcon width={24} height={24} fill="white" />
      </Link>
      <Link
        href="mailto:ray@rayhackshaw.com"
        target="_blank"
        title="ray@rayhackshaw.com"
      >
        <MailIcon width={24} height={24} fill="white" />
      </Link>
    </div>
  );
};
