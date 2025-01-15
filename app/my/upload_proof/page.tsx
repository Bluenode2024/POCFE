"use client";

import React, { useState } from "react";
import { tasks, ProjectTask } from "@/task";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ValidateProofPage = () => {
  const [selectedTask, setSelectedTask] = useState<ProjectTask | null>(null);
  const [proof, setProof] = useState("");
  const [file, setFile] = useState<File[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState("");

  const notUploadedTasks = tasks.filter(
    (task) => task.validateStatus === "Not Uploaded"
  );
  const otherTasks = tasks.filter(
    (task) => task.validateStatus !== "Not Uploaded"
  );

  return (
    <div className="flex flex-col gap-10 p-4">
      <Card className="w-full rounded-lg shadow-md">
        <CardHeader>
          <CardTitle>Not Uploaded Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Task Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notUploadedTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>
                    {new Date(task.deadline).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => setSelectedTask(task)}
                        >
                          Upload Proof
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="overflow-y-auto max-h-screen p-6">
                        <h2 className="text-xl font-bold mb-4">
                          Upload Proof for {task.title}
                        </h2>
                        <div className="mb-4">
                          <Label htmlFor="proof" className="text-md font-bold">
                            Image
                          </Label>
                          <Input
                            id="proof"
                            value={proof}
                            onChange={(e) => setProof(e.target.value)}
                            placeholder="Enter proof data or link"
                          />
                          {proof && (
                            <div className="mt-2">
                              <img
                                src={proof}
                                alt="Proof Preview"
                                className="max-w-full h-auto border rounded-md"
                              />
                            </div>
                          )}
                        </div>
                        <div className="mb-4">
                          <Label htmlFor="file" className="text-md font-bold">
                            File
                          </Label>
                          <Input
                            id="file"
                            multiple // 여러 파일 첨부 가능
                            onChange={(e) => {
                              const selectedFiles = Array.from(
                                e.target.files || []
                              );
                              if (selectedFiles.length > 3) {
                                alert("You can only upload up to 3 files.");

                                return;
                              }
                              const uniqueFiles = selectedFiles.filter(
                                (newFile) =>
                                  !file.some(
                                    (existingFile) =>
                                      existingFile.name === newFile.name
                                  )
                              );

                              setFile((prevFiles) => [
                                ...prevFiles,
                                ...selectedFiles,
                              ]);
                              e.target.value = "";
                            }}
                            placeholder="Choose Proof File"
                            type="file"
                          />
                          {file.length > 0 && (
                            <div className="flex gap-2 mt-2 flex-wrap">
                              {file.map((f, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-gray-200 text-sm rounded-full"
                                >
                                  {f.name}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="mb-4">
                          <Label htmlFor="notes" className="text-md font-bold">
                            Additional Notes
                          </Label>
                          <textarea
                            id="notes"
                            value={additionalNotes}
                            onChange={(e) => setAdditionalNotes(e.target.value)}
                            placeholder="Enter any additional notes..."
                            className="w-full p-2 border rounded-md"
                          />
                        </div>
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => {
                            console.log(`Proof submitted for task ${task.id}`);
                            console.log("Files:", file);
                            setProof("");
                            setFile([]);
                            setSelectedTask(null);
                            setAdditionalNotes(""); // 추가 메모 초기화
                            alert("Proof submitted successfully!"); // 성공 알림
                          }}
                        >
                          Submit Proof
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="w-full rounded-lg shadow-md">
        <CardHeader>
          <CardTitle>Other Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Task Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Validate Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {otherTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>
                    {new Date(task.deadline).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      {task.validateStatus}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValidateProofPage;
