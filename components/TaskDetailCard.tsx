import React, { useState } from "react";
import { tasks } from "@/task/index";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TaskDetailCardProps {
  projectId: string;
  username: string;
}

const TaskDetailCard = ({ projectId, username }: TaskDetailCardProps) => {
  const filteredTasks = tasks.filter(
    (task) =>
      task.project_id === projectId &&
      Array.isArray(task.assigned_users) &&
      task.assigned_users.includes(username)
  );

  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter((task) => task.status === "Completed").length;

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const currentTask = filteredTasks[currentTaskIndex];

  if (totalTasks === 0) {
    return (
      <Card>
        <CardContent>
          <div>No tasks available for this project and user.</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="p-4 shadow-lg">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Assigned to me</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-600">{`${completedTasks}/${totalTasks} tasks Completed`}</div>
            <div className="text-sm font-semibold text-gray-700">{`${Math.round(
              (completedTasks / totalTasks) * 100
            )}%`}</div>
          </div>
          <Progress value={(completedTasks / totalTasks) * 100} className="h-2" />
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="mb-4">
            <div className="font-bold text-lg">{currentTask.title}</div>
            <div className="text-sm text-gray-500">{currentTask.status}</div>
          </div>
          <div className="mb-2">
            <div className="font-bold text-gray-800">Description:</div>
            <div>{currentTask.description}</div>
          </div>
          <div className="mb-2">
            <div className="font-bold text-gray-800">Deadline:</div>
            <div>{new Date(currentTask.deadline).toLocaleString()}</div>
          </div>
          <div className="mb-2">
            <div className="font-bold text-gray-800">Contribute Score:</div>
            <div>{currentTask.contribute_score}</div>
          </div>
          <div>
            <div className="font-bold text-gray-800">Assigned Members:</div>
            <div className="flex space-x-2">
              {currentTask.assigned_users?.length
                ? currentTask.assigned_users.map((user, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold"
                      title={user}
                    >
                      {user[0]}
                    </div>
                  ))
                : "No members"}
            </div>
          </div>
        </div>
      </CardContent>

      <div className="flex justify-between p-4">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
          disabled={currentTaskIndex === 0}
          onClick={() =>
            setCurrentTaskIndex((prevIndex) => Math.max(prevIndex - 1, 0))
          }
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
          disabled={currentTaskIndex === filteredTasks.length - 1}
          onClick={() =>
            setCurrentTaskIndex((prevIndex) =>
              Math.min(prevIndex + 1, filteredTasks.length - 1)
            )
          }
        >
          Next
        </button>
      </div>
    </Card>
  );
};

export default TaskDetailCard;
