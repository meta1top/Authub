import { useCallback, useMemo } from "react";

import { AccessRole } from "@/types/access";
import { useProfile } from "./use.profile";

export const useAccess = () => {
  const account = useProfile();

  const currentRole = useMemo<AccessRole | null>(() => {
    if (!account) {
      return null;
    }
    const { joinAppId, role } = account;
    if (joinAppId === "1" && role === 1) {
      return AccessRole.SU;
    }
    if (role === 1) {
      return AccessRole.ADMIN;
    }
    if (role === 2) {
      return AccessRole.USER;
    }
    return null;
  }, [account]);

  const hasRole = useCallback((userRole: AccessRole, requiredRole: AccessRole): boolean => {
    if (userRole === AccessRole.SU) {
      return true;
    }
    if (userRole === AccessRole.ADMIN) {
      return requiredRole === AccessRole.ADMIN || requiredRole === AccessRole.USER;
    }
    if (userRole === AccessRole.USER) {
      return requiredRole === AccessRole.USER;
    }
    return false;
  }, []);

  return useCallback(
    (roles: AccessRole[], all = false) => {
      if (currentRole === null || currentRole === undefined || !roles || roles.length === 0) {
        return false;
      }
      if (all) {
        return roles.every((role) => hasRole(currentRole, role));
      }
      return roles.some((role) => hasRole(currentRole, role));
    },
    [currentRole, hasRole],
  );
};
