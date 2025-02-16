"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
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
import { projects } from "@/projects";

export default function MyPage() {
  const { address, isConnected } = useAccount();
  const username = "김재원";

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Card className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500">Upload Photo</span>
              </div>
              <Button size="sm">Upload Photo</Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  이름
                </label>
                <input
                  type="text"
                  value="박지호"
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  학과
                </label>
                <input
                  type="text"
                  value="컴퓨터공학과"
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  학번
                </label>
                <input
                  type="text"
                  value="12211620"
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  지갑 주소
                </label>
                <input
                  type="text"
                  value={isConnected ? address : "지갑 연결 필요"}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </Card>

        <div className="flex gap-6">
          <Card className="p-4 flex-1 min-w-[30%]">
            <CardHeader>
              <CardTitle>기여도</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-40 bg-gray-200 rounded-md flex items-center justify-center">
                그래프 표시 예정
              </div>
            </CardContent>
          </Card>
          <MyProjects projects={projects} username={username} />
        </div>
      </div>
    </div>
  );
}
