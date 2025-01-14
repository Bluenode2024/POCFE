"use client";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { projects } from "../projects/index";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const pendingProjects = projects.filter(
  (project) => project.status === "Pending"
);
export const pendingColumns: ColumnDef<(typeof pendingProjects)[0]>[] = [
  {
    accessorKey: "id", // Project ID
    header: "Project ID",
  },
  {
    accessorKey: "title", // Title
    header: "Title",
  },
  {
    accessorKey: "leader_id", // Leader ID
    header: "Leader ID",
  },
  {
    accessorKey: "end_date", // Deadline
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Deadline
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "status", // Status
    header: "Status",
    cell: ({ row }) => (
      <Button variant="outline" size="sm">
        {row.original.status} {/* Status 데이터 출력 */}
      </Button>
    ),
  },
  {
    accessorKey: "Detail",
    header: "",
    cell: ({ row }) => {
      const [projectDetails, setProjectDetails] =
        useState<ProjectDetails | null>(null);

      const fetchProjectDetails = (id: string) => {
        // 테스트 데이터에서 상세 정보 가져오기
        const details = pendingProjects.find((project) => project.id === id);
        if (details) {
          setProjectDetails({
            title: details.title,
            description: details.description,
            leaderId: details.leader_id,
            memberData: details.members.split(", "), // members를 배열로 변환
            Deadline: details.end_date,
          });
        } else {
          console.error("No details found for project:", id);
        }
      };

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-gray-400 text-white hover:bg-gray-500"
              variant="outline"
              size="sm"
              onClick={() => fetchProjectDetails(row.original.id)}
            >
              Detail
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Project Details</DialogTitle>
              <DialogDescription>
                {projectDetails ? (
                  <div className="space-y-4">
                    <p>
                      <strong>Title:</strong> {projectDetails.title}
                    </p>
                    <p>
                      <strong>Description:</strong> {projectDetails.description}
                    </p>
                    <p>
                      <strong>Leader ID:</strong> {projectDetails.leaderId}
                    </p>
                    <p>
                      <strong>Members:</strong>{" "}
                      {Array.isArray(projectDetails.memberData)
                        ? projectDetails.memberData.join(", ")
                        : projectDetails.memberData}
                    </p>
                    <p>
                      <strong>Deadline:</strong> {projectDetails.Deadline}
                    </p>
                  </div>
                ) : (
                  "No data available."
                )}
              </DialogDescription>
            </DialogHeader>
            {/* Accept / Reject 버튼 추가 */}
            <div className="flex justify-end gap-4 mt-4"></div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
export type Project = {
  Project_Name: string;
  Type: string;
  Status: "Pending" | "Active" | "Done" | "Reject";
  Leader: string;
  Deadline: string;
};

export type Validate = {
  Validator: string;
  Task: string;
  Status: "Pending" | "Active" | "Done" | "Reject";
  Address: string;
};
export type Rank = {
  Rank: string;
  Name: string;
  Contribution: string;
};
export type Admin_Project = {
  ProjectID: string;
  Name: string;
  Deadline: string;
  Detail: string;
};
type ProjectDetails = {
  title: string;
  description: string;
  leaderId: string;
  memberData: any;
  Deadline: string;
};
const testDetails: Record<string, ProjectDetails> = {
  "1": {
    title: "프로젝트 1",
    description: "이 프로젝트는 프론트엔드 개발 프로젝트입니다.",
    leaderId: "김승원",
    memberData: ["박지호", "정원필", "김재원"],
    Deadline: "2026-01-01",
  },
  "2": {
    title: "프로젝트 2",
    description: "이 프로젝트는 스마트 컨트랙트 프로젝트입니다.",
    leaderId: "박지호",
    memberData: ["김승원", "정원필"],
    Deadline: "2026-01-15",
  },
  "3": {
    title: "프로젝트 3",
    description: "이 프로젝트는 백엔드 통합 프로젝트입니다.",
    leaderId: "정원필",
    memberData: ["김승원", "박지호"],
    Deadline: "2026-01-20",
  },
};

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "Project_Name",
    header: "Project Name",
  },
  {
    accessorKey: "Type",
    header: "Type",
  },
  {
    accessorKey: "Leader",
    header: "Leader",
  },
  {
    accessorKey: "Deadline",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Deadline
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    id: "action", // 새로운 열 추가
    header: "Status",
    cell: ({ row }) => (
      <Button variant="outline" size="sm">
        {row.original.Status} {/* 데이터에서 상태 출력 */}
      </Button>
    ),
  },
];

export const validatecolumns: ColumnDef<Validate>[] = [
  {
    accessorKey: "Validator",
    header: "Validator",
  },
  {
    accessorKey: "Task",
    header: "Task",
  },
  {
    accessorKey: "Address",
    header: "Address",
  },
  {
    id: "action", // 새로운 열 추가
    header: "Status",
    cell: ({ row }) => (
      <Button variant="outline" size="sm">
        {row.original.Status} {/* 데이터에서 상태 출력 */}
      </Button>
    ),
  },
]; /*

/*export const adminpjcolumns: ColumnDef<Admin_Project>[] = [
  {
    accessorKey: "ProjectID",
    header: "Project ID",
  },
  {
    accessorKey: "Name",
    header: "Name",
  },
  {
    accessorKey: "Deadline",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Deadline
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "Detail",
    header: "",
    cell: ({ row }) => {
      const [projectDetails, setProjectDetails] =
        useState<ProjectDetails | null>(null);

      const fetchProjectDetails = (projectId: string) => {
        // 테스트 데이터에서 상세 정보 가져오기
        const details = testDetails[projectId];
        if (details) {
          setProjectDetails(details);
        } else {
          console.error("No details found for project:", projectId);
        }
      };

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-gray-400 text-white hover:bg-gray-500"
              variant="outline"
              size="sm"
              onClick={() => fetchProjectDetails(row.original.ProjectID)}
            >
              Detail
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Project Details</DialogTitle>
              <DialogDescription>
                {projectDetails ? (
                  <div className="space-y-4">
                    <p>
                      <strong>Title:</strong> {projectDetails.title}
                    </p>
                    <p>
                      <strong>Description:</strong> {projectDetails.description}
                    </p>
                    <p>
                      <strong>Leader ID:</strong> {projectDetails.leaderId}
                    </p>
                    <p>
                      <strong>Members:</strong>{" "}
                      {Array.isArray(projectDetails.memberData)
                        ? projectDetails.memberData.join(", ")
                        : projectDetails.memberData}
                    </p>
                    <p>
                      <strong>Deadline:</strong> {projectDetails.Deadline}
                    </p>
                  </div>
                ) : (
                  "No data available."
                )}
              </DialogDescription>
            </DialogHeader>
            {/* Accept / Reject 버튼 추가 }
            */
/*<div className="flex justify-end gap-4 mt-4">
              <Button
                className=" text-white hover:bg-gray-500"
                onClick={() => {
                  console.log("Accepted Project:", projectDetails?.title);
                  setProjectDetails(null);
                }}
              >
                Accept
              </Button>
              <Button
                className="bg-gray-400 text-white hover:bg-gray-500"
                onClick={() => {
                  console.log("Rejected Project:", projectDetails?.title);
                  setProjectDetails(null);
                }}
              >
                Reject
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];*/
