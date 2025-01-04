"use client";

import { tasks } from "@/task/index";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";

export default function ProjectDetailPage() {
  const projectId = "1";
  const filteredTasks = tasks.filter((task) => task.id === projectId);

  // 예제 데이터
  const taskStatuses = {
    1: "Pending",
    2: "Progressing",
    3: "Completed",
  };
  const taskResults = {
    1: "Rewarded",
    2: "Slashed",
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* 새로 추가된 Task Table */}
        <div className="border border-black p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Task Overview</h2>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Task ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Report</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.id}</TableCell>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{task.address}</TableCell>
                  <TableCell>
                    <Button onClick={() => console.log(`Submitting report for Task ID: ${task.id}`)}>
                      Submit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* 기존 테이블 유지 */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Task Details</h2>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Task ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Detail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.id}</TableCell>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{task.address}</TableCell>
                  <TableCell>{taskStatuses[task.id] || "Pending"}</TableCell>
                  <TableCell>{taskResults[task.id] || "Rewarded"}</TableCell>
                  <TableCell>
                    {task.detail}
                    <Button
                      className="ml-4"
                      onClick={() => console.log(`Viewing log for Task ID: ${task.id}`)}
                    >
                      View Log
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
