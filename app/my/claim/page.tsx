"use client";
import React, { useState } from "react";
import { tasks } from "@/task/index"; // 데이터를 가져옵니다.
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DataTableDemo() {
  const projectId = "1"; // 특정 프로젝트 ID
  const filteredTasks = tasks.filter((task) => task.id.startsWith(projectId)); // 필터링된 태스크

  const [filter, setFilter] = useState("");

  // id 또는 name을 기준으로 필터링
  const filteredData = filteredTasks.filter(
    (item) =>
      (item.id?.toLowerCase() ?? "").includes(filter.toLowerCase()) || // id로 필터링
      (item.name?.toLowerCase() ?? "").includes(filter.toLowerCase()) // name으로 필터링
  );

  return (
    <div className="p-4">
      <div className="flex items-center space-x-4">
        <Input
          placeholder="Filter by Task ID or Name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <Table className="mt-4 w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Task ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length ? (
            filteredData.map((task) => {
              // Status에 따른 Amount 설정
              const amount =
                task.status === "Done"
                  ? `$${(task.id.charCodeAt(0) * 10).toFixed(2)}` // 하드코딩된 값
                  : "-"; // Active나 Pending일 경우 "-"

              const isDisabled =
                task.status === "Pending" || task.status === "Active";

              return (
                <TableRow key={task.id}>
                  <TableCell>{task.id}</TableCell>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>
                    <div>
                      <p>{task.address}</p>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{task.status}</TableCell>
                  <TableCell>{amount}</TableCell>
                  <TableCell>
                    <Button
                      disabled={isDisabled} // 비활성화 조건 추가
                      className={`${
                        isDisabled ? "opacity-20 cursor-not-allowed" : ""
                      }`} // 스타일 추가
                      onClick={() =>
                        console.log(`Claiming task ID: ${task.id}`)
                      }
                    >
                      Claim
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={6}>No results found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
