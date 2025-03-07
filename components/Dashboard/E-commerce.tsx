"use client";
import React from "react";
import { UpsolveDashboard, UpsolveProvider } from "@upsolve-labs/sdk";
import { useUser } from "@clerk/nextjs";

import { useOrganization } from "@clerk/nextjs";

const ECommerce: React.FC = () => {
  const { organization } = useOrganization();
  const { user } = useUser();
  const upsolveToken = user?.publicMetadata?.["upsolveToken"];
  return (
    <>
      {organization != null &&
        organization.slug != null &&
        upsolveToken != null &&
        typeof upsolveToken === "string" && (
          <UpsolveDashboard
            dashboardId={"8c76dd47-8f70-4d51-86b2-a6926d254626"}
            tenantJWT={upsolveToken}
            hideHeader={true}
            tabPlacement="popover"
            tenantEditingPermissions={{
              addChart: true,
              addFilter: true,
              removeChart: true,
              createChart: true,
              aiCharts: true,
            }}
            theme="light"
          />
        )}
    </>
  );
};

export default ECommerce;
