import Link from "next/link";
import { useState } from "react";
import { capitalize } from "~/server/utils/textFormat";
import { type Pairing } from "~/utils/interfaces";
import { PlusIcon } from "./icons/Plus";
import { MinusIcon } from "./icons/Minus";
import { MinusCircleIcon } from "./icons/MinusCircle";
import { PlusCircleIcon } from "./icons/PlusCircle";
import { Icons } from "./Icons";
// import { CalculationsModal } from "./CalculationsModal";

const UniqueCityList = ({ points }: { points: Pairing[] }) => {
  return (
    <div className="flex max-h-[40px] flex-col overflow-y-auto md:flex-row md:gap-2">
      {points.map((x) => (
        <div key={x.firstCity + x.secondCity} className="flex w-full gap-2">
          <p>{capitalize(x.firstCity)}</p>
          <p className="text-sun">─</p>
          <p>{capitalize(x.secondCity)}</p>
        </div>
      ))}
    </div>
  );
};

const TodayMessage = ({ pointCount }: { pointCount: number }) => {
  if (pointCount === 1) {
    return (
      <p className="text-xl text-cloud md:text-base">
        There is{" "}
        <span className={pointCount > 0 ? "text-sun" : "text-cloud"}>
          {pointCount}
        </span>{" "}
        isohel.
      </p>
    );
  }
  return (
    <p className="text-xl text-cloud md:text-base">
      Today there are{" "}
      <span className={pointCount > 0 ? "text-sun" : "text-cloud"}>
        {pointCount}
      </span>{" "}
      isohels.
    </p>
  );
};

const MenuItemToggle = ({ text, open }: { text: string; open: boolean }) => {
  return (
    <div className="w-full py-2">
      <div className="flex items-center gap-2">
        {open ? <MinusIcon stroke="#E5E5E5" /> : <PlusIcon stroke="#FCA311" />}
        <div className={open ? "underline" : "text-cloud"}>{text}</div>
      </div>
    </div>
  );
};

const IsohelTitleToggle = ({ open }: { open: boolean }) => {
  return (
    <div className="mx-auto flex w-full items-center justify-center py-2 text-2xl md:justify-start md:px-2 lg:justify-between lg:text-3xl">
      <div className="flex items-center">
        <p className="text-cloud">IS</p>
        {open ? (
          <MinusCircleIcon className="h-6 w-6" />
        ) : (
          <PlusCircleIcon className="h-6 w-6" stroke="#FCA311" />
        )}
        <p className="text-cloud">HEL</p>
      </div>
      <div className="hidden items-center gap-2 text-xs md:flex">
        <div>
          Made by{" "}
          <span>
            <Link
              href="https://rayhackshaw.com"
              target="_blank"
              className="text-cloud underline"
            >
              Ray Hackshaw
            </Link>
          </span>
        </div>
        <Icons />
      </div>
    </div>
  );
};

export const Menu = ({ points }: { points: Pairing[] }) => {
  const pointCount = points.length;

  const [menuConfig, setMenuConfig] = useState({
    drawerOpen: false,
    todayOpen: false,
    aboutOpen: false,
  });

  const handleMenuClick = () => {
    setMenuConfig({
      ...menuConfig,
      drawerOpen: !menuConfig.drawerOpen,
    });
  };

  return (
    <>
      <div className="collapse absolute top-0 w-full border-b border-b-[#88888896] bg-dark font-wix">
        <input type="checkbox" onClick={handleMenuClick} />
        <div className="collapse-title px-2 text-center text-lg">
          <IsohelTitleToggle open={menuConfig.drawerOpen} />
        </div>
        <div className="collapse-content px-2">
          <div className="collapse border-b border-b-[#88888896] font-wix">
            <input
              type="checkbox"
              onClick={(e) => {
                e.stopPropagation();
                setMenuConfig({
                  ...menuConfig,
                  todayOpen: !menuConfig.todayOpen,
                });
              }}
            />
            <div className="collapse-title px-2 text-xl">
              <MenuItemToggle text="Today" open={menuConfig.todayOpen} />
            </div>
            <div className="collapse-content px-2">
              <div className="flex w-full flex-col-reverse items-start justify-between pb-2 md:flex-row">
                <div className="flex flex-col gap-2 md:flex-row md:gap-4">
                  <TodayMessage pointCount={pointCount} />
                  <div className="max-h-20 overflow-y-auto text-sm text-slate-500 md:max-h-max md:text-base">
                    {pointCount > 0 && <UniqueCityList points={points} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="collapse border-b border-b-[#88888896] font-wix">
            <input
              type="checkbox"
              onClick={(e) => {
                e.stopPropagation();
                setMenuConfig({
                  ...menuConfig,
                  aboutOpen: !menuConfig.aboutOpen,
                });
              }}
            />
            <div className="collapse-title px-2 text-xl">
              <div className="w-full py-2">
                <MenuItemToggle
                  text="About this project"
                  open={menuConfig.aboutOpen}
                />
              </div>
            </div>
            <div className="collapse-content px-2">
              <div className="space-y-2 py-2 md:flex md:justify-between md:space-y-0 md:px-2 lg:max-w-full">
                <p className="w-full max-w-sm text-cloud lg:max-w-xl xl:max-w-2xl">
                  If two cities have the same amount of sunlight, they can be
                  connected by an <span className="text-sun">isohel</span>,
                  indicated by a golden line on this map.
                </p>
                <div>
                  <p>This map updates every 24 hours.</p>
                  {/* <button
                    onClick={launchModal}
                    className="pt-2 text-cloud underline md:pt-0"
                  >
                    Read more about the calculations →
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
