import { ArrowLeft, Lock, User, Mail, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AccountIssuesHelp() {
  return (
    <div className="px-3 sm:px-8 py-6 bg-[#f4f4f4] w-full mx-auto">
      <Link
        href="/supports"
        className="flex items-center gap-2 text-sm text-primary mb-6 hover:underline"
      >
        <ArrowLeft size={16} /> Back to Help Center
      </Link>

      <div className="flex items-start gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 p-2 rounded-full">
              <User className="text-primary" size={24} />
            </div>
            <h1 className="text-3xl font-bold">Account Support</h1>
          </div>

          <div className="bg-white border rounded-xl p-6 mb-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="text-yellow-500" /> Account Troubleshooter
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">
                  What issue are you experiencing?
                </h3>
                <Select>
                  <SelectTrigger className=" focus:ring-orange-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="issue">Select an issue...</SelectItem>
                      <SelectItem value="issueb">Can&apos;t log in</SelectItem>
                      <SelectItem value="issued">
                        Password reset not working
                      </SelectItem>
                      <SelectItem value="issuew">Account locked</SelectItem>
                      <SelectItem value="issuez">
                        Email verification problems
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                Find Solution
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Lock className="text-primary" /> Login Problems
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-card rounded-lg border border-blue-100">
                  <h3 className="font-medium text-blue-800">
                    Reset Your Password
                  </h3>
                  <p className="text-sm text-blue-600 mt-1">
                    If you&apos;ve forgotten your password, you can reset it
                    here:
                  </p>
                  <div className="mt-3 flex gap-3">
                    <Input
                      placeholder="Your email address"
                      className="flex-1 focus-visible:ring-orange-500"
                    />
                    <Button variant="outline" className="">
                      Send Reset Link
                    </Button>
                  </div>
                </div>
                <div className="p-4 bg-card rounded-lg">
                  <h3 className="font-medium">
                    Two-Factor Authentication Issues
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Having trouble with 2FA? Try these steps:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-600">
                    <li>Check your authenticator app is synced correctly</li>
                    <li>Use a backup code if available</li>
                    <li>Contact support if you&apos;re still locked out</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Mail className="text-primary" /> Email Verification
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 bg-card hover:border-orange-400 transition-colors">
                  <h3 className="font-medium">
                    Didn&apos;t receive verification email?
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 mb-3">
                    Check spam folder or request a new one:
                  </p>
                  <Button
                    size="sm"
                    className="bg-orange-500/95 hover:bg-orange-600/95"
                  >
                    Resend Verification
                  </Button>
                </div>
                <div className="border rounded-lg p-4 bg-card hover:border-orange-400 transition-colors">
                  <h3 className="font-medium">Changing Your Email</h3>
                  <p className="text-sm text-gray-600 mt-1 mb-3">
                    Need to update your email address?
                  </p>
                  <Button size="sm" variant="outline">
                    Update Email
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="hidden md:block w-72 space-y-6 sticky top-6">
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-5">
            <h3 className="font-semibold mb-3">Need Immediate Help?</h3>
            <Button className="w-full mb-2 bg-orange-500/95 hover:bg-orange-600/95">
              Live Chat
            </Button>
            <Button variant="outline" className="w-full">
              Call Support
            </Button>
          </div>
          <div className="border rounded-xl p-5">
            <h3 className="font-semibold mb-3">Helpful Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-primary hover:underline">
                  Security Tips
                </Link>
              </li>
              <li>
                <Link href="#" className="text-primary hover:underline">
                  Account Privacy Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="text-primary hover:underline">
                  Managing Notifications
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
