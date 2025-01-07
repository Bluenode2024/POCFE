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

export default function Dashboard() {
  const [projects] = useState(projectData);
  const router = useRouter();

  const ongoingProjects = projects.filter(
    (project) => project.status === "Processing"
  );

  const myProjects = projects.filter(
    (project) => project.leader === "김재원" || project.leader === "김승원"
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
                      <TableHead>Project Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Leader</TableHead>
                      <TableHead>중요도</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ongoingProjects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>{project.name}</TableCell>
                        <TableCell>{project.type}</TableCell>
                        <TableCell>{project.deadline}</TableCell>
                        <TableCell>{project.leader}</TableCell>
                        <TableCell>{project.priority}</TableCell>
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
            <Card className="h-full rounded-lg shadow-md">
              <CardHeader>
                <CardTitle>내 프로젝트</CardTitle>
              </CardHeader>
              <CardContent className="overflow-y-auto h-full">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Name</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>중요도</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myProjects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>{project.name}</TableCell>
                        <TableCell>{project.deadline}</TableCell>
                        <TableCell>{project.priority}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            onClick={() =>
                              router.push(`/project/projectdetail/${project.id}`)
                            }
                          >
                            Project Detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="flex-[1] flex items-center justify-center">
            <Button size="sm" className="bg-blue-500 text-white h-10 w-40">
              프로젝트 생성하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
