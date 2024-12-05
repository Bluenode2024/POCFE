'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAccount } from "wagmi"

export default function Signup() {
  return (
      <div className="flex flex-1 justify-center items-center bg-gray-50">
        <Card className="w-[400px] bg-white shadow-md">
          <CardHeader className="text-center">
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>Create an account to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">이름</Label>
                  <Input id="name" placeholder="이름을 입력하세요" />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="studentId">학번</Label>
                  <Input id="studentId" placeholder="학번을 입력하세요" />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="department">학과</Label>
                  <Input id="department" placeholder="학과를 입력하세요" />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="wallet">지갑 연결</Label>
                  <w3m-button />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm">
                    I accept terms and conditions
                  </Label>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full">Sign Up</Button>
            <p className="text-center text-sm text-gray-500">
              Already have an account? <a href="#" className="text-blue-600 hover:underline">Login</a>
            </p>
          </CardFooter>
        </Card>
      </div>
  )
}
