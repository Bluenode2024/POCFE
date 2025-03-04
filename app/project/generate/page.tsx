"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export default function Generate() {
  const [loading, setLoading] = useState(false);

  // 프로젝트 멤버 관련 상태
  const [members, setMembers] = useState<string[]>([]);
  const [selectedMember, setSelectedMember] = useState("");

  // 프로젝트 기간 관련 상태
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  // 멤버 옵션 (예시)
  const memberOptions = [
    "김재원",
    "이재원",
    "최세창",
    "정원필",
    "박지호",
    "김승원",
    "안성진",
  ];

  // 테스트용 JWT 토큰 (실제 사용 시 로그인 후 받아온 토큰 사용)
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIweGM4MzJlMkM2Y0I1RjY4OTMxMzQyMjVCMjA0QWY4NzMzZWRlQzhlOTIiLCJtZXNzYWdlIjoi7YWM7Iqk7Yq47JqpIOyVhOustCDrqZTshLjsp4Drgpgg64Sj6riwICIsInVzZXJJZCI6IjAwMWE1ZjVmLTI2OTgtNGM5Yi04ODMwLTg3MjU3OWMxM2ZmOSIsImlhdCI6MTc0MDgxOTM5N30.4N_7vZRRiFtccH9Z05_Rk3WNq3BGYjlt_EkAuZltVx4";

  // 멤버 추가 함수
  const handleAddMember = () => {
    if (selectedMember && !members.includes(selectedMember)) {
      setMembers([...members, selectedMember]);
      setSelectedMember("");
    }
  };

  // 폼 전송 시 API 호출 (프로젝트 생성)
  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const data = {
      project_name: formData.get("title") as string,
      description: formData.get("Description") as string,
      start_date: startDate ? startDate.toISOString().split("T")[0] : "",
      end_date: endDate ? endDate.toISOString().split("T")[0] : "",
      members: members.map((member) => ({
        member_name: member,
        role: "developer", // 예시 역할
      })),
      repo_link: ["https://github.com/example1", "https://github.com/example2"],
    };

    console.log("전송 데이터:", data);

    try {
      const response = await fetch("http://localhost:3001/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // JWT 토큰 포함
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("서버 에러 응답:", errorText);
        throw new Error("서버 응답 에러");
      }

      const result = await response.json();
      console.log("서버 응답:", result);
      alert("프로젝트가 성공적으로 생성되었습니다!");
    } catch (error) {
      console.error("프로젝트 생성 실패:", error);
      alert("프로젝트 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  // ====================== 추가된 부분: 내 프로젝트 조회 로직 ======================

  // "내 프로젝트" 목록 상태
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    // 실제로는 지갑 주소를 동적으로 가져와야 할 수도 있지만,
    // 여기서는 예시로 하드코딩한 walletaddress 사용
    const walletAddress = "0xc832e2C6cB5F6893134225B204Af8733edeC8e92";

    async function fetchUserAndProjects() {
      try {
        // 1) 지갑 주소로 유저 정보 조회
        const userRes = await fetch(
          `http://localhost:3001/users/${walletAddress}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!userRes.ok) {
          throw new Error("Failed to fetch user");
        }
        const userData = await userRes.json();
        const userId = userData.id; // 응답에서 user id 추출

        // 2) 해당 userId로 프로젝트 목록 조회
        //    API 문서에 맞게 엔드포인트 수정 (예: /projects?userId=...)
        const projectsRes = await fetch(
          `http://localhost:3001/projects?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!projectsRes.ok) {
          throw new Error("Failed to fetch projects");
        }
        const projectsData = await projectsRes.json();

        // projectsData가 배열 형태라고 가정
        setProjects(projectsData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserAndProjects();
  }, []);

  // ====================== 여기까지 추가된 부분 ======================

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 p-6">
      {/* 기존 프로젝트 생성 폼 */}
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-md mb-8"
      >
        <h1 className="text-xl font-semibold text-center mb-6">
          Create a Project
        </h1>
        <div className="grid gap-4">
          {/* 프로젝트 제목 */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="title">Project Title</Label>
            <Input
              name="title"
              id="title"
              placeholder="프로젝트 제목을 입력하세요"
            />
          </div>

          {/* 프로젝트 설명 */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="Description">Project Description</Label>
            <Textarea
              name="Description"
              id="Description"
              placeholder="Write project detail here..."
            />
          </div>

          {/* 프로젝트 기간 선택 */}
          <div className="flex flex-col space-y-1.5">
            <Label>Project Duration</Label>
            <div className="flex items-center space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full">
                    {startDate
                      ? startDate.toLocaleDateString()
                      : "Start Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => setStartDate(date || undefined)}
                  />
                </PopoverContent>
              </Popover>

              <span className="text-gray-500">~</span>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full">
                    {endDate ? endDate.toLocaleDateString() : "End Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => setEndDate(date || undefined)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* 프로젝트 멤버 추가 */}
          <div className="flex flex-col space-y-1.5">
            <Label>Project Members</Label>
            <div className="flex items-center justify-center space-x-4">
              <Select onValueChange={setSelectedMember}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Member" />
                </SelectTrigger>
                <SelectContent>
                  {memberOptions.map((member) => (
                    <SelectItem key={member} value={member}>
                      {member}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button size="sm" onClick={handleAddMember} type="button">
                멤버 추가
              </Button>
            </div>
            <div className="mt-2">
              {members.map((member, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                >
                  {member}
                </span>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            프로젝트 생성
          </Button>
        </div>
      </form>

      {/* ====================== 추가된 "내 프로젝트" 테이블 영역 ====================== */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">내 프로젝트</h2>
        {projects.length === 0 ? (
          <p>참여중인 프로젝트가 없습니다.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Project Title</th>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-left">Deadline</th>
                <th className="p-2 text-left">Leader</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b">
                  <td className="p-2">{project.project_name}</td>
                  <td className="p-2">{project.description}</td>
                  {/* deadline 필드명은 실제 API 필드에 맞게 수정하세요 */}
                  <td className="p-2">{project.deadline}</td>
                  {/* leader 필드명도 실제 API 필드에 맞게 수정하세요 */}
                  <td className="p-2">{project.leader}</td>
                  <td className="p-2">{project.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
