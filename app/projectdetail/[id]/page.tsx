"use client";

import { useParams } from "next/navigation";
import { tasks } from "@/task/index";
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
import { Progress } from "@/components/ui/progress";

export default function ProjectDetailPage() {
  const { id: projectId } = useParams();

  const filteredTasks = tasks.filter((task) => task.id === projectId);

  if (!projectId) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Project ID를 확인할 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Project {projectId}</h1>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ranking in the project</CardTitle>
            </CardHeader>
            <CardContent>
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>순위</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>누적 기여도</TableHead>
                    <TableHead>합수율</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>김재원</TableCell>
                    <TableCell>80</TableCell>
                    <TableCell>13/20</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>정원필</TableCell>
                    <TableCell>45</TableCell>
                    <TableCell>5/11</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell>최세창</TableCell>
                    <TableCell>40</TableCell>
                    <TableCell>3/13</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={65} className="h-4" />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">To Do</h2>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Task ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.name}>
                  <TableCell>{task.id}</TableCell>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{task.deadline}</TableCell>
                  <TableCell>{task.priority}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant={
                        task.status === "Completed" ? "default" : "outline"
                      }
                    >
                      {task.status}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
