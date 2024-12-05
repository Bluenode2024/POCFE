"use client";

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
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Project 1</h1>
            <span className="text-gray-500">importance 2</span>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost">&lt;</Button>
            <Button variant="ghost">&gt;</Button>
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
              <CardTitle>Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Deadline</p>
                  <p className="text-lg font-bold">2024.12.07 23:59</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Day Left</p>
                  <p className="text-lg font-bold">D-2</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Explanation</p>
                  <p className="text-gray-700">
                    이 프로젝트는 블루노드 내부 운영에 대한 기여도를 측정하기 위한 프로젝트 개발을 목적으로 함.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={65} className="h-4" />
              그래프 추가 예정
              <div className="flex justify-center mt-4">
                <div className="w-32 h-32">
                  <svg viewBox="0 0 32 32" className="w-full h-full">
                    <circle
                      className="text-gray-300"
                      cx="16"
                      cy="16"
                      r="14"
                      strokeWidth="4"
                      fill="none"
                    />
                    <circle
                      className="text-blue-500"
                      cx="16"
                      cy="16"
                      r="14"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray="88"
                      strokeDashoffset="30"
                      transform="rotate(-90 16 16)"
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">To Do</h2>
          <div className="flex items-center space-x-4">
            <Button variant="outline">Filter By</Button>
            <Button variant="outline">Date</Button>
            <Button variant="outline">Order Type</Button>
            <Button variant="outline">Order Status</Button>
            <Button variant="outline" className="text-red-500">
              Reset Filter
            </Button>
          </div>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Project ID</TableHead>
                <TableHead>NAME</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Contribution Point</TableHead>
                <TableHead>STATUS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>001</TableCell>
                <TableCell>github api</TableCell>
                <TableCell>github api로 커밋 불러오기</TableCell>
                <TableCell>04 Sep 2019</TableCell>
                <TableCell>10</TableCell>
                <TableCell>
                  <Button size="sm">
                    Completed
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>002</TableCell>
                <TableCell>서비스 로직</TableCell>
                <TableCell>서비스 로직 수정</TableCell>
                <TableCell>28 May 2019</TableCell>
                <TableCell>5</TableCell>
                <TableCell>
                  <Button size="sm">
                    Processing
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>003</TableCell>
                <TableCell>서비스 로직</TableCell>
                <TableCell>로직 개발</TableCell>
                <TableCell>23 Nov 2019</TableCell>
                <TableCell>5</TableCell>
                <TableCell>
                  <Button variant="destructive" size="sm">
                    Rejected
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>004</TableCell>
                <TableCell>UI 개발</TableCell>
                <TableCell>개발</TableCell>
                <TableCell>05 Feb 2019</TableCell>
                <TableCell>15</TableCell>
                <TableCell>
                  <Button size="sm">
                    Completed
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
