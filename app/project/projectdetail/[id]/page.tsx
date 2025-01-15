"use client";

import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import TaskDetailCard from "@/components/TaskDetailCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import { tasks } from "@/task/index";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const projectId = Array.isArray(id) ? id[0] : id;

  const username = "박지호";

  if (!projectId) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Project ID를 확인할 수 없습니다.</p>
      </div>
    );
  }

  const todoTasks = tasks.filter((task) => task.project_id === projectId);

  return (
    <div className="p-8 bg-gray-50 min-h-screen w-full">
      <div className="max-w-7xl grid grid-cols-2 gap-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Ranking in the Project</CardTitle>
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

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={70} className="h-4 w-full mb-2" />
          </CardContent>
        </Card>

        <TaskDetailCard projectId={projectId} username={username} />

        <Card className="space-y-4">
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Task ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todoTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.id}</TableCell>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>
                      {new Date(task.deadline).toLocaleString()}
                    </TableCell>
                    <TableCell>{task.priority}</TableCell>
                    <TableCell>{task.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
