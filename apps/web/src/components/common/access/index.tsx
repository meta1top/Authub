import { FC, ReactNode } from "react";

import { useAccess } from "@/hooks";
import { AccessRole } from "@/types/access";

export type AccessProps = {
  roles: AccessRole[];
  all?: boolean;
  children: ReactNode;
};

export const Access: FC<AccessProps> = (props) => {
  const { roles, all = false, children } = props;
  const hasAccess = useAccess();
  const has = hasAccess(roles, all);
  return has ? children : null;
};
