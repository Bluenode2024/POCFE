"use client";

import { useEffect, useState } from "react";
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

interface UserData {
  name: string;
  department: string;
  student_number: string;
  walletAddress: string;
}

export default function MyPage() {
  const { address, isConnected } = useAccount();

  // API로부터 받아온 사용자 정보를 담을 state
  const [userData, setUserData] = useState<UserData>({
    name: "",
    department: "",
    student_number: "",
    walletAddress: "",
  });

  // 컴포넌트가 마운트되거나 address가 바뀔 때마다 API 호출
  useEffect(() => {
    const fetchUserData = async () => {
      if (!isConnected || !address) return;

      try {
        // 로그인 후 발급받은 Bearer 토큰을 여기 넣어주세요.
        const token = "<YOUR_BEARER_TOKEN>";

        const res = await fetch(`http://localhost:3001/users/id/${address}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Bearer 토큰 추가
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await res.json();
        // API에서 반환되는 필드명에 맞춰서 세팅
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
  }, [isConnected, address]);

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

        {/* 기여도 테이블 & 내 프로젝트 테이블 (수정 X) */}
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
          <MyProjects projects={projects} username={userData.name} />
        </div>
      </div>
    </div>
  );
}
