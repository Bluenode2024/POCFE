import { useRouter } from "next/navigation";
import { Project } from "@/projects";
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MyProjectsProps {
  projects: Project[];
  username: string;
}

const MyProjects: React.FC<MyProjectsProps> = ({ projects, username }) => {
  const router = useRouter();

  // 현재 사용자가 참여 중인 프로젝트만 필터링
  const userProjects = projects.filter((project) => {
    const membersArray = project.members.split(", ").map((member) => member.trim());
    return membersArray.includes(username);
  });

  if (userProjects.length === 0) {
    return (
      <Card className="h-full rounded-lg shadow-md">
        <CardHeader>
          <CardTitle>내 프로젝트</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500">참여 중인 프로젝트가 없습니다.</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full rounded-lg shadow-md">
      <CardHeader>
        <CardTitle>내 프로젝트</CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-auto h-full">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Project Title</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.title}</TableCell>
                <TableCell>{new Date(project.end_date).toLocaleString()}</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    onClick={() => router.push(`/project/projectdetail/${project.id}`)}
                  >
                    상세 페이지
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MyProjects;
