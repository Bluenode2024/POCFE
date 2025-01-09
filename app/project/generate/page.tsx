'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Generate() {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([
    { title: "", description: "", contributeScore: "" },
  ]);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      title: formData.get("title") as string,
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

  const handleAddTask = () => {
    setTasks([...tasks, { title: "", description: "", contributeScore: "" }]);
  };

  const handleRemoveTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

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

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Tasks</h2>
            {tasks.map((_, index) => (
              <div key={index} className="border p-4 rounded mb-4 bg-gray-50">
                <div className="flex flex-col space-y-1.5 mb-3">
                  <Label htmlFor={`task_title_${index}`}>Task Title</Label>
                  <Input
                    name={`task_title_${index}`}
                    id={`task_title_${index}`}
                    placeholder="Task 제목을 입력하세요"
                  />
                </div>
                <div className="flex flex-col space-y-1.5 mb-3">
                  <Label htmlFor={`task_description_${index}`}>Task Description</Label>
                  <Input
                    name={`task_description_${index}`}
                    id={`task_description_${index}`}
                    placeholder="Task 설명을 입력하세요"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`task_contributeScore_${index}`}>Contribute Score</Label>
                  <Input
                    name={`task_contributeScore_${index}`}
                    id={`task_contributeScore_${index}`}
                    placeholder="기여 점수를 입력하세요"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  className="mt-4"
                  onClick={() => handleRemoveTask(index)}
                >
                  Remove Task
                </Button>
              </div>
            ))}
            <Button type="button" className="w-full" onClick={handleAddTask}>
              Add Task
            </Button>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "프로젝트 생성 중..." : "프로젝트 생성"}
          </Button>
        </div>
      </form>
    </div>
  );
}
