"use client";

import React, { useState, useEffect } from "react";
import { tasks, ProjectTask } from "@/task";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const ValidateReportPage = () => {
  const [selectedTask, setSelectedTask] = useState<ProjectTask | null>(null);
  const [validatedTaskIds, setValidatedTaskIds] = useState<string[]>([]);
  const [dialogInput, setDialogInput] = useState<string>("");
  const { toast } = useToast(); // Toast 사용
  const validatedTasks = tasks.filter(
    (task) =>
      task.validateStatus === "Validated" || task.validateStatus === "Rejected"
  );
  useEffect(() => {
    if (!selectedTask) {
      setDialogInput(""); // selectedTask가 변경될 때만 초기화
    }
  }, [selectedTask]);

  return (
    <div className="relative flex flex-col gap-10 p-4 h-screen">
      <Card className="w-full rounded-lg shadow-md">
        <CardHeader>
          <CardTitle>Validated List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Task Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Report Deadline</TableHead>
                <TableHead>Validator</TableHead>
                <TableHead>Validate Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {validatedTasks.length > 0 ? (
                validatedTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell>
                      {new Date(task.deadline).toLocaleString()}
                    </TableCell>
                    <TableCell>{task.validator}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        style={{ marginLeft: "15px" }}
                      >
                        {task.validateStatus}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => {
                              setSelectedTask(task);
                              setDialogInput(""); // 기존 입력값 초기화
                            }}
                          >
                            Report
                          </Button>
                        </DialogTrigger>
                        <DialogContent
                          className="focus:outline-none"
                          onOpenAutoFocus={(e) => e.preventDefault()}
                        >
                          <h2 className="text-xl font-bold mb-4">
                            Proof Details
                          </h2>
                          <p className="mb-4">
                            <strong>Task:</strong> {selectedTask?.title}
                          </p>
                          <p className="mb-4">
                            <strong>Description:</strong>{" "}
                            {selectedTask?.description}
                          </p>
                          <p className="mb-4">
                            <strong>Image URL:</strong>{" "}
                            <a
                              href={selectedTask?.task_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline break-all"
                            >
                              {selectedTask?.task_url}
                            </a>
                          </p>
                          <p className="mb-4">
                            <strong>Files:</strong>
                            {selectedTask?.files?.length
                              ? selectedTask.files.map((file, index) => (
                                  <a
                                    key={index}
                                    href={URL.createObjectURL(file)} // 파일을 브라우저에서 열 수 있도록 URL 생성
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-blue-500 underline break-all mt-2"
                                  >
                                    {file.name}
                                  </a>
                                ))
                              : "No files uploaded"}
                          </p>
                          <p className="mb-4">
                            <strong>Additional Note:</strong>{" "}
                            {selectedTask?.additionalNotes}
                          </p>

                          {selectedTask?.validateStatus === "Rejected" && (
                            <p className="mb-4">
                              <strong>Rejected Reason:</strong>{" "}
                              {selectedTask?.rejected_reason ||
                                "No reason provided"}
                            </p>
                          )}
                          <AlertDialog>
                            <AlertDialogTrigger
                              className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                validatedTaskIds.includes(task.id)
                                  ? "bg-gray-400 text-gray-700 cursor-not-allowed" // 검증된 경우 회색 버튼
                                  : "bg-black text-white hover:bg-gray-800 focus:ring-gray-700" // 기본 상태
                              }`}
                              disabled={validatedTaskIds.includes(task.id)} // 버튼 비활성화
                            >
                              Report
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. If there are
                                  issues with your report, you may lose your
                                  deposit.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <div className="mb-4">
                                <Label
                                  htmlFor="reportInput"
                                  className="text-sm font-medium text-gray-700"
                                >
                                  <strong>Enter Report reason:</strong>
                                </Label>
                                <textarea
                                  id="reportInput"
                                  value={dialogInput}
                                  onChange={(e) =>
                                    setDialogInput(e.target.value)
                                  }
                                  placeholder="Enter your reason for reporting..."
                                  className="w-full mt-2 px-3 py-2 border rounded-md"
                                />
                              </div>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    if (selectedTask) {
                                      setValidatedTaskIds((prev) => [
                                        ...prev,
                                        selectedTask.id,
                                      ]); // 검증된 테스크 ID 추가

                                      toast({
                                        title: `"✅ Report Completed"!`,
                                      });
                                    }
                                  }}
                                >
                                  Submit
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No Validated Tasks
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValidateReportPage;
