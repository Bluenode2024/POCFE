"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation"; // router 추가
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { projects } from "@/projects"; // 그대로 두지만 사용하지 않음
import { useGet } from "@/hooks/useRequest"; // useGet 훅 임포트
import { api } from "@/lib/api/axios";       // axios 인스턴스 (토큰 설정용)

interface UserData {
  name: string;
  department: string;
  student_number: string;
  walletAddress: string;
}

// API 응답에 맞춘 내 프로젝트 인터페이스
interface MyProject {
  project: {
    id: number;
    project_name: string;
    status: string;
    end_date: string;
  };
}

export default function MyPage() {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  // 사용자 정보 상태
  const [userData, setUserData] = useState<UserData>({
    name: "",
    department: "",
    student_number: "",
    walletAddress: "",
  });

  // 내 프로젝트 데이터를 불러오기 위한 useGet 훅
  const { data: myProjects, fetchData: fetchMyProject } = useGet<MyProject[]>();

  // 1) 사용자 정보를 useGet 훅으로 받아오기 위한 준비
  //    - data, fetchData 등을 구조분해 할당합니다.
  const {
    data: userInfoData,       // 실제 API에서 가져온 사용자 정보
    fetchData: fetchUserInfo, // 호출 함수
    error: userInfoError,
    isLoading: userInfoLoading,
  } = useGet<UserData>();

  // 2) 사용자 정보 + 내 프로젝트 데이터 호출
  useEffect(() => {
    // 주소/지갑이 없으면 요청하지 않음
    if (!isConnected || !address) return;

    // 사용자 정보 가져오기
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("❌ 토큰이 로컬 스토리지에 없습니다.");
          return;
        }

        // axios 인스턴스에 토큰 설정 (매 요청마다 헤더에 포함)
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // /users/myinfo 엔드포인트 호출 (API 문서 참고)
        const data = await fetchUserInfo("/users/myinfo");
        // 응답 데이터를 state에 저장
        setUserData({
          name: data.name || "",
          department: data.department || "",
          student_number: data.student_number || "",
          walletAddress: data.walletAddress || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    // 내 프로젝트 데이터 호출 (address가 유효할 때)
    fetchMyProject("http://localhost:3001/projects/myproject");
  }, [isConnected, address]); // fetchMyProject 제거 (무한루프 방지)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 사용자 정보 카드 */}
        <Card className="p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* 프로필 사진 업로드 영역 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500">Upload Photo</span>
              </div>
              <Button size="sm">Upload Photo</Button>
            </div>

            {/* 사용자 정보 입력/표시 영역 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  이름
                </label>
                <input
                  type="text"
                  value={userData.name}
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
                  value={userData.department}
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
                  value={userData.student_number}
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
                  value={
                    userData.walletAddress
                      ? userData.walletAddress
                      : isConnected
                      ? address
                      : "지갑 연결 필요"
                  }
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* 기여도 테이블 & 내 프로젝트 테이블 */}
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

          {/* 내 프로젝트 섹션 (API 데이터로 표시) */}
          <div className="p-4 flex-1">
            <Card className="w-full rounded-lg shadow-md">
              <CardHeader>
                <CardTitle>내 프로젝트</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {myProjects?.map((project) => (
                        <TableRow key={project.project.id}>
                          <TableCell>
                            {project.project.project_name}
                          </TableCell>
                          <TableCell>{project.project.status}</TableCell>
                          <TableCell>
                            {new Date(project.project.end_date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              onClick={() =>
                                router.push(
                                  `/project/projectdetail/${project.project.id}`
                                )
                              }
                            >
                              상세 보기
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
