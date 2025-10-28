import { PropsWithChildren } from 'react';
import { useCurrentUser } from './useCurrentUser';

interface RequireRoleProps {
  allowedRoles: string[];
}

export function RequireRole({ allowedRoles, children }: PropsWithChildren<RequireRoleProps>) {
  const { roles, isLoading } = useCurrentUser();

  if (isLoading) {
    return <p>Loading permissions...</p>;
  }

  if (!roles.some((role) => allowedRoles.includes(role))) {
    return <p>You do not have access to this section.</p>;
  }

  return <>{children}</>;
}
