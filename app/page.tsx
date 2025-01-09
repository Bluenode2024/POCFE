"use client";

import { useEffect, useState } from "react";
import { Project, columns, Validate, validatecolumns } from "./column";
import { DataTable } from "./data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function getData(): Promise<Project[]> {
  // Fetch data from your API here.
  return [
    {
      Project_Name: "위메이드 프로젝트",
      Type: "개발 프로젝트",
      Leader: "김승원",
      Status: "Pending",
      Deadline: "2026.01.02 00:00",
    },
    {
      Project_Name: "위메이드 프로젝트2",
      Type: "기획 프로젝트",
      Leader: "박지호",
      Status: "Pending",
      Deadline: "2026.01.01 00:00",
    },
    {
      Project_Name: "위메이드 프로젝트3",
      Type: "홍보 프로젝트",
      Leader: "정원필",
      Status: "Pending",
      Deadline: "2026.01.10 00:00",
    },
  ];
}
async function getValidateData(): Promise<Validate[]> {
  // Fetch data from your API here.
  return [
    {
      Validator: "김재원",
      Task: "프론트 엔드 디자인",
      Address: "0xBc82945c549405AC733c80A6b616b8bC337713bD",
      Status: "Pending",
    },
    {
      Validator: "김승원",
      Task: "스마트 컨트랙트 작성",
      Address: "0xBc82945c549405AC733c80A6b616b8bC337713bD",
      Status: "Pending",
    },
    {
      Validator: "박지호",
      Task: "백엔드 통합",
      Address: "0xBc82945c549405AC733c80A6b616b8bC337713bD",
      Status: "Pending",
    },
  ];
}

export default function Home() {
  const [data, setData] = useState<Project[]>([]); // 데이터 상태 정의
  const [validatedata, setvalidateData] = useState<Validate[]>([]);

  useEffect(() => {
    // 비동기 데이터 가져오기
    async function fetchData() {
      const result = await getData();
      const validateresult = await getValidateData();
      setData(result); // 데이터를 상태에 설정
      setvalidateData(validateresult);
    }

    fetchData();
  }, []); // 빈 의존성 배열로 컴포넌트 마운트 시 한 번 실행

  return (
    <div className="flex flex-1 items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl">
        <div className="p-4">
          <Card className="w-full rounded-lg shadow-md">
            <CardHeader>
              <CardTitle>새로운 프로젝트!</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={data} />
            </CardContent>
          </Card>
        </div>

        <div className="p-4">
          <Card className="w-full rounded-lg shadow-md">
            <CardHeader>
              <CardTitle>진행중인 검증</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={validatecolumns} data={validatedata} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
