// app/help/account-issues/page.tsx
import { ArrowLeft, Lock, User, Mail, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // ShadCN or custom button
import { Input } from "@/components/ui/input"; // ShadCN or custom input

export default function AccountIssuesHelp() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link
        href="/help"
        className="flex items-center gap-2 text-sm text-primary mb-6 hover:underline"
      >
        <ArrowLeft size={16} /> Back to Help Center
      </Link>

      <div className="flex items-start gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 p-2 rounded-full">
              <User className="text-primary" size={24} />
            </div>
            <h1 className="text-3xl font-bold">Account Support</h1>
          </div>

          {/* Interactive Troubleshooter */}
          <div className="bg-white border rounded-xl p-6 mb-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="text-yellow-500" /> Account Troubleshooter
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">
                  What issue are you experiencing?
                </h3>
                <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option>Select an issue...</option>
                  <option>Can&apos;t log in</option>
                  <option>Password reset not working</option>
                  <option>Account locked</option>
                  <option>Email verification problems</option>
                </select>
              </div>
              <Button className="w-full">Find Solution</Button>
            </div>
          </div>

          {/* Common Solutions */}
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Lock className="text-primary" /> Login Problems
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
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
                      className="flex-1"
                    />
                    <Button variant="outline">Send Reset Link</Button>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
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
                <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                  <h3 className="font-medium">
                    Didn&apos;t receive verification email?
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 mb-3">
                    Check spam folder or request a new one:
                  </p>
                  <Button size="sm">Resend Verification</Button>
                </div>
                <div className="border rounded-lg p-4 hover:border-primary transition-colors">
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

        {/* Quick Help Sidebar */}
        <div className="hidden md:block w-72 space-y-6 sticky top-6">
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-5">
            <h3 className="font-semibold mb-3">Need Immediate Help?</h3>
            <Button className="w-full mb-2">Live Chat</Button>
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
