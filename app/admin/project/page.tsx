"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useState } from "react";
import { pendingColumns } from "../../column";
import { DataTable } from "../../data-table";
import { projects as testProjects } from "../../../projects/index";

export default function AdminProjectDetail() {
  const [projects, setProjects] = useState(testProjects);
  const handleAccept = (id: string) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id
          ? {
              ...project,
              start_date: new Date().toISOString(), // 현재 시각으로 start_date 수정
              status: "Processing", // 상태를 Processing으로 변경
            }
          : project
      )
    );
  };

  const handleReject = (id: string) => {
    const rejectionReason = prompt("Enter rejection reason:");
    if (!rejectionReason) return;

    setProjects((prev) =>
      prev.map((project) =>
        project.id === id
          ? {
              ...project,
              rejection_reason: rejectionReason,
              status: "Rejected",
            }
          : project
      )
    );
  };
  const pendingProjects = projects.filter(
    (project) => project.status === "Pending"
  );

  return (
    <div className="flex flex-1 items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl">
        <div className="p-4">
          <Card className="w-full rounded-lg shadow-md">
            <CardHeader>
              <CardTitle>Pending Project</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  ...pendingColumns,
                  {
                    accessorKey: "actions",
                    header: "Actions",
                    cell: ({ row }) => (
                      <div className="flex gap-2">
                        <button
                          className="px-2 py-1 bg-green-500 text-white rounded"
                          onClick={() => handleAccept(row.original.id)}
                        >
                          Accept
                        </button>
                        <button
                          className="px-2 py-1 bg-red-500 text-white rounded"
                          onClick={() => handleReject(row.original.id)}
                        >
                          Reject
                        </button>
                      </div>
                    ),
                  },
                ]}
                data={pendingProjects}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
