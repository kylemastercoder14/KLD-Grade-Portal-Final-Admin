"use client";

import React, { RefObject, useState } from "react";
import { IconCirclePlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import AnnouncementForm from "@/components/forms/announcement-form";
import MoreButton from "@/components/globals/more-button";

const TableHeader = ({
  label,
  href,
  tableRef,
}: {
  label: string;
  href?: string;
  tableRef: RefObject<HTMLTableElement>;
}) => {
  const [openAnnouncementModal, setOpenAnnouncementModal] = useState(false);
  const router = useRouter();

  return (
    <div className="flex md:items-center md:flex-row flex-col mb-5 mt-5 gap-2 md:justify-between">
      <div>
        <p className="text-xl font-bold">Announcement Record</p>
        <p className="text-sm text-muted-foreground">
          Here you can manage all announcements, including adding new ones and
          viewing existing records. Please ensure that the information provided
          is accurate and up-to-date.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <MoreButton tableRef={tableRef} />
        <Button
          onClick={() =>
            href ? router.push(href) : setOpenAnnouncementModal(true)
          }
          size="sm"
          className="h-7 gap-1"
        >
          <IconCirclePlus className="h-3.5 w-3.5" />
          <span>{label}</span>
        </Button>
      </div>
      {openAnnouncementModal && (
        <AnnouncementForm
          initialData={null}
          onClose={() => setOpenAnnouncementModal(false)}
        />
      )}
    </div>
  );
};

export default TableHeader;
