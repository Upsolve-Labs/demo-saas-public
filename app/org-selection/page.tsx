'use client'
import { Metadata } from "next";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { OrganizationMembershipResource } from "@clerk/types";
import Select from "react-select";
// export const metadata: Metadata = {
//   title: "Org Page",
//   description: "This is Org selector page",
// };

function createOrganizationOptions(
  organizationList: any[]
) {
  return organizationList.map(({ organization }) => ({
    value: organization.id,
    label: organization.name,
  }));
}

const Org = () => {
  const { setActive, organizationList, isLoaded } = useOrganizationList();
  const { organization } = useOrganization();

  if (!isLoaded) {
    return null;
  }

  const handleOrgChange = (e: any) => {
    setActive({ organization: e.value });
  };

  return (
    <div className="flex justify-center">
      <Select
        options={createOrganizationOptions(organizationList)}
        onChange={handleOrgChange}
        value={organization ? { value: organization.id, label: organization.name } : null}
      />
    </div>
  );
};

export default Org;
