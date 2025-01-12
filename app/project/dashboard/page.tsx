"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { projects as projectData } from "@/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import MyProjects from "@/components/MyProjects";

export default function Dashboard() {
  const [projects] = useState(projectData);
  const router = useRouter();
  const username = "김재원"

  const ongoingProjects = projects.filter(
    (project) => project.status === "Processing"
  );

  const myProjects = projects.filter(
    (project) => project.leader_id === "김재원" || project.leader_id === "김승원"
  );

  return (
    <div className="flex flex-1 items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl">
        <div className="p-4">
          <Card className="w-full rounded-lg shadow-md">
            <CardHeader>
              <CardTitle>진행 중인 프로젝트</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Leader</TableHead>
                      <TableHead>중요도</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ongoingProjects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>{project.title}</TableCell>
                        <TableCell>{project.description}</TableCell>
                        <TableCell>
                          {new Date(project.end_date).toLocaleString()}
                        </TableCell>
                        <TableCell>{project.leader_id}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            {project.status}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-row p-4 gap-8">
          <div className="flex-[2]">
          <MyProjects projects={projects} username={username} />
          </div>

          <div className="flex-[1] flex items-center justify-center">
            <Button
              size="sm"
              className="bg-blue-500 text-white h-10 w-40"
              onClick={() => router.push(`/project/generate`)}
            >
              프로젝트 생성하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
