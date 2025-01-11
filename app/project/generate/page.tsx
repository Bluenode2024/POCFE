'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

export default function Generate() {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([
    { title: "", description: "", contributeScore: "" },
  ]);
  const [members, setMembers] = useState<string[]>([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      title: formData.get("title") as string,
      description: formData.get("Description") as string,
      startDate,
      endDate,
      members,
      tasks: tasks.map((task, index) => ({
        title: formData.get(`task_title_${index}`) as string,
        description: formData.get(`task_description_${index}`) as string,
        contributeScore: formData.get(`task_contributeScore_${index}`) as string,
      })),
    };

    try {
      const response = await fetch("http://localhost:3001/projects/createProject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("서버 응답 에러");
      }

      const result = await response.json();
      alert("프로젝트가 성공적으로 생성되었습니다!");
    } catch (error) {
      alert("프로젝트 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = () => {
    if (selectedMember && !members.includes(selectedMember)) {
      setMembers([...members, selectedMember]);
      setSelectedMember("");
    }
  };

  const memberOptions = ["김재원", "이재원", "최세창", "정원필", "박지호", "김승원", "안성진"];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
      >
        <h1 className="text-xl font-semibold text-center mb-6">Create a Project</h1>
        <div className="grid gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="title">Project Title</Label>
            <Input name="title" id="title" placeholder="프로젝트 제목을 입력하세요" />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="Description">Project Description</Label>
            <textarea
              name="Description"
              id="Description"
              rows={5}
              className="border rounded-lg p-3 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write project detail here..."
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label>Project Duration</Label>
            <div className="flex items-center space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full">
                    {startDate ? startDate.toLocaleDateString() : "Start Date"}
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

          <div className="flex flex-col space-y-1.5">
            <Label>Project Members</Label>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {selectedMember || "Select a Member"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {memberOptions.map((member) => (
                    <DropdownMenuItem
                      key={member}
                      onClick={() => setSelectedMember(member)}
                    >
                      {member}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                size="sm"
                className="mt-2"
                onClick={handleAddMember}
                type="button"
              >
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
            {loading ? "프로젝트 생성 중..." : "프로젝트 생성"}
          </Button>
        </div>
      </form>
    </div>
  );
}
