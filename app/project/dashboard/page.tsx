"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { useGet } from "@/hooks/useRequest";
import { isAuthenticated } from "@/utils/auth";

interface Project {
  id: number;
  project_name: string;
  description: string;
  end_date: string;
  leader_id: string;
  status: string;
}

interface MyProject {
  project: Project;
}

export default function Dashboard() {
  const router = useRouter();
  const { fetchData: fetchActive, data: ongoingProjects = [], isLoading: activeLoading } = useGet<Project[]>();
  const { fetchData: fetchMyProject, data: myProjects = [], isLoading: myLoading } = useGet<MyProject[]>();

  useEffect(() => {
    // 로그인 상태 확인
    if (!isAuthenticated()) {
      router.push('/signin');
      return;
    }

    // 데이터 로드
    fetchActive('/projects/status/active');
    fetchMyProject('/projects/myproject');
  }, []); // 빈 의존성 배열로 마운트 시 한 번만 실행

  if (!isAuthenticated()) {
    return null; // 또는 로딩 상태 표시
  }

  if (activeLoading || myLoading) return <div>Loading...</div>;

  const ongoing = ongoingProjects ?? [];
  const my = myProjects ?? [];

  return (
    <div className="flex flex-1 items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl">
        {/* ─────────── 1) 진행 중인 프로젝트 섹션 (수정 X) ─────────── */}
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
                      <TableHead>Project Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Leader</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ongoing.length > 0 ? (
                      ongoing.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell>{project.project_name}</TableCell>
                          <TableCell>{project.description}</TableCell>
                          <TableCell>
                            {new Date(project.end_date).toLocaleString()}
                          </TableCell>
                          <TableCell>{project.leader_id}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              {project.status}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          No ongoing projects to display.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ─────────── 2) 내 프로젝트 섹션 + 프로젝트 생성하기 (수정: MyProjects → 테이블) ─────────── */}
        <div className="flex flex-row p-4 gap-8">
          <div className="flex-[2]">
            <Card className="w-full rounded-lg shadow-md">
              <CardHeader>
                <CardTitle>내 프로젝트</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead>Leader</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {my.length > 0 ? (
                        my.map((item) => {
                          // API 응답 구조상, 각 요소에 project 필드가 있음
                          const project = item.project;
                          return (
                            <TableRow key={project.id}>
                              <TableCell>{project.project_name}</TableCell>
                              <TableCell>{project.description}</TableCell>
                              <TableCell>
                                {new Date(project.end_date).toLocaleString()}
                              </TableCell>
                              <TableCell>{project.leader_id}</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  {project.status}
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center">
                            No my projects to display.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 프로젝트 생성하기 버튼 (수정 X) */}
          <div className="flex-[1] flex items-center justify-center">
            <Button
              size="sm"
              className="bg-black-500 text-white h-10 w-40"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.5)")
              }
              onClick={() => router.push("/project/generate")}
            >
              프로젝트 생성하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
