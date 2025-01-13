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
  const taskStatuses: Record<string, "Pending" | "Progressing" | "Completed"> =
    {
      "1": "Pending",
      "2": "Progressing",
      "3": "Completed",
    };

  // Status에 따른 Result 계산 함수
  const getResultFromStatus = (
    status: "Pending" | "Progressing" | "Completed"
  ): string => {
    // 타입스크립트에서는 매개변수의 타입을 명시해야함
    if (status === "Pending") return "Slashed";
    if (status === "Progressing") return "-";
    if (status === "Completed") return "Rewarded";
    return "-";
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 새로 추가된 Task Table */}
        <div className="border border-black p-8 rounded-lg">
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
                    <Button
                      onClick={() =>
                        console.log(`Submitting report for Task ID: ${task.id}`)
                      }
                    >
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
              {filteredTasks.map((task) => {
                const status = taskStatuses[task.id] || "Pending";
                const result = getResultFromStatus(status);

                return (
                  <TableRow key={task.id}>
                    <TableCell>{task.id}</TableCell>
                    <TableCell>{task.name}</TableCell>
                    <TableCell>{task.address}</TableCell>
                    <TableCell>{status}</TableCell>
                    <TableCell>{result}</TableCell>
                    <TableCell>
                      {/*{task.detail}*/}
                      <Button
                        className="ml-4"
                        onClick={() =>
                          console.log(`Viewing log for Task ID: ${task.id}`)
                        }
                      >
                        View Log
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
