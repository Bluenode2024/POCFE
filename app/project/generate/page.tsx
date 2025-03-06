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
import { useEffect, useState, FormEvent } from "react";

interface Project {
  id: string;
  project_name: string;
  description: string;
  deadline: string;
  leader: string;
  status: string;
}

interface ProjectData {
  title: string;
  description: string;
  deadline: Date;
  budget: number;
  members: string[];
}

interface ProjectFormData {
  title: string;
  description: string;
  deadline: string;
  members: string[];
  budget: number;
  // 필요한 다른 필드들 추가
}

interface SubmitResponse {
  success: boolean;
  message: string;
  data?: {
    projectId: string;
    status: string;
  };
}

interface ProjectSubmitData {
  title: string;
  description: string;
  deadline: string;
  members: string[];
  budget: number;
  taskCount: number;
  rewardPerTask: number;
}

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

  // projects 상태의 타입을 명확하게 지정
  const [projects, setProjects] = useState<Project[]>([]);

  // 폼 제출 핸들러 수정
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<SubmitResponse> => {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    
    const projectData: ProjectData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      deadline: endDate || new Date(),
      budget: Number(formData.get('budget')) || 0,
      members: members,
    };

    try {
      const response = await fetch("http://localhost:3001/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();
      
      return {
        success: true,
        message: "프로젝트가 성공적으로 생성되었습니다!",
        data: {
          projectId: result.projectId,
          status: result.status,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        console.error('Submit error:', error.message);
      }
      return {
        success: false,
        message: "프로젝트 생성에 실패했습니다. 다시 시도해주세요.",
      };
    } finally {
      setLoading(false);
    }
  };

  // 프로젝트 조회 함수 수정
  useEffect(() => {
    const fetchUserAndProjects = async () => {
      const walletAddress = "0xc832e2C6cB5F6893134225B204Af8733edeC8e92";

      try {
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
        const projectsRes = await fetch(
          `http://localhost:3001/projects?userId=${userData.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        if (!projectsRes.ok) {
          throw new Error("Failed to fetch projects");
        }
        
        const projectsData: Project[] = await projectsRes.json();
        setProjects(projectsData);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Fetch error:', error.message);
        }
      }
    };

    fetchUserAndProjects();
  }, []);

  // any를 구체적인 타입으로 변경
  const handleProjectSubmit = (data: ProjectFormData) => {
    // ... 나머지 코드
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 p-6">
      {/* 기존 프로젝트 생성 폼 */}
      <form
        onSubmit={handleSubmit}
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
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              name="description"
              id="description"
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
