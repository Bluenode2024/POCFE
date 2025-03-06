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
// import MyProjects from "@/components/MyProjects"; // 기존 import는 남겨둬도 되고, 사용하지 않으므로 제거 가능

// 프로젝트 타입 정의
interface Project {
  id: number;
  project_name: string;
  description: string;
  end_date: string;
  leader_id: string;
  status: string;
}

// MyProject 인터페이스 추가
interface MyProject {
  project: Project;  // API 응답에서 project 필드 안에 Project 정보가 있음
}

export default function Dashboard() {
  // 진행 중인(= active) 프로젝트 목록
  const [ongoingProjects, setOngoingProjects] = useState<Project[]>([]);
  // 내 프로젝트 목록
  const [myProjects, setMyProjects] = useState<MyProject[]>([]);  // MyProject 타입으로 변경
  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // 예시 지갑 주소
  const walletAddress = "0xCD45f153325FB6A51cC23db8051c6dDD886f2a63";
  // 예시 사용자 이름
  const username = "김재원";

  useEffect(() => {
    fetchAllData();
  }, []);

  async function fetchAllData() {
    setIsLoading(true);
    try {
      // 1) 진행 중인 프로젝트(= active) 목록
      let response = await fetch("http://localhost:3001/projects/status/active");
      if (!response.ok) {
        throw new Error("Failed to fetch ongoing projects");
      }
      let activeData = await response.json();
      activeData = Array.isArray(activeData) ? activeData : [activeData];
      setOngoingProjects(activeData);

      // 2) 내 프로젝트 목록 (API 문서: GET /projects/myproject)
      response = await fetch("http://localhost:3001/projects/myproject");
      if (!response.ok) {
        throw new Error("Failed to fetch my projects");
      }
      let myData = await response.json();
      myData = Array.isArray(myData) ? myData : [myData];
      setMyProjects(myData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

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
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          Loading data...
                        </TableCell>
                      </TableRow>
                    ) : ongoingProjects.length > 0 ? (
                      ongoingProjects.map((project) => (
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
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center">
                            Loading data...
                          </TableCell>
                        </TableRow>
                      ) : myProjects.length > 0 ? (
                        myProjects.map((item) => {
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
