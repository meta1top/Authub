import { type FC, type ReactNode, useMemo, useState } from "react";
import classNames from "classnames";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Action, DropdownMenu, DropdownMenuTrigger, Separator } from "@meta-1/design";
import { Access } from "@/components/common/access";
import { AccessRole } from "@/types/access";
import { Profile } from "./profile";

export type NavItemConfig = {
  id: string;
  title?: string;
  component?: ReactNode;
  href?: string;
  type?: "link" | "dropdown" | "separator";
  access?: AccessRole[];
};

export const useNavs = (): NavItemConfig[] => {
  const { t } = useTranslation();
  return [
    {
      id: "apps",
      title: t("应用"),
      href: "/apps",
      type: "link",
      access: [AccessRole.SU],
    },
    {
      id: "users",
      title: t("用户"),
      href: "/users",
      type: "link",
      access: [AccessRole.ADMIN],
    },
    {
      id: "separator",
      type: "separator",
      access: [AccessRole.ADMIN],
    },
    {
      id: "profile",
      title: t("我的账号"),
      component: <Profile />,
      type: "dropdown",
      access: [AccessRole.USER],
    },
  ];
};

export type NavItemProps = {
  config: NavItemConfig;
  active?: string;
};

export const NavItem: FC<NavItemProps> = (props) => {
  const { config, active } = props;
  const { id, type, title, component, href } = config;
  const [open, setOpen] = useState(false);

  const action = useMemo(() => {
    return (
      <Action active={id === active} className="!py-1 !outline-none space-x-1 dark:text-white dark:hover:text-white">
        <span>{title}</span>
        {type === "dropdown" && <ChevronDownIcon className={classNames("size-4", open ? "rotate-180" : "")} />}
      </Action>
    );
  }, [id, type, title, active, open]);

  const menu = useMemo(() => {
    if (type === "dropdown") {
      return (
        <DropdownMenu onOpenChange={setOpen} open={open}>
          <DropdownMenuTrigger asChild>{action}</DropdownMenuTrigger>
          <div onClick={() => setOpen(false)}>{component}</div>
        </DropdownMenu>
      );
    } else if (type === "link" && href) {
      return <Link href={href}>{action}</Link>;
    } else if (type === "separator") {
      return (
        <div className="h-6">
          <Separator orientation="vertical" />
        </div>
      );
    }
  }, [type, action, component, open, setOpen, href, id]);

  return <li className="flex items-center">{menu}</li>;
};

export type MenusProps = {
  active?: string;
};

export const Menus = (props: MenusProps) => {
  const { active } = props;
  const navs = useNavs();
  const items = useMemo(() => {
    return navs.map((value) => {
      if (value.access && value.access.length > 0) {
        return (
          <Access key={value.id} roles={value.access}>
            <NavItem active={active} config={value} />
          </Access>
        );
      }
      return <NavItem active={active} config={value} key={value.id} />;
    });
  }, [active, navs]);
  return <ul className="flex gap-2">{items}</ul>;
};
