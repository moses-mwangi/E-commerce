"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  ChevronDown,
  Loader2,
  SearchIcon,
  Mail,
  Smartphone,
  Bell,
  MessageSquare,
} from "lucide-react";
import { format } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Types

interface NotificationTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: NotificationType;
}

type DeliveryChannel = "in-app" | "email" | "push" | "sms";
type RecipientOption = "all" | "segments" | "users" | "single";
type NotificationType =
  | "promotion"
  | "alert"
  | "announcement"
  | "system"
  | "transactional";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
}

interface NotificationTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: NotificationType;
}

// Mock Data
const TEMPLATES: NotificationTemplate[] = [
  {
    id: "1",
    name: "Flash Sale",
    subject: "Limited Time Offer!",
    content: "Get 20% off all items this weekend only!",
    type: "promotion",
  },
  {
    id: "2",
    name: "Password Reset",
    subject: "Reset your password",
    content: "Click here to reset your password: {link}",
    type: "transactional",
  },
  {
    id: "2",
    name: "System Maintenance",
    subject: "Scheduled Maintenance",
    content: "Our system will be down for maintenance on {date} from {time}.",
    type: "system",
  },
];

const USER_SEGMENTS = [
  { id: "vip", name: "VIP Customers" },
  { id: "inactive", name: "Inactive Users (30d+)" },
  { id: "recent", name: "Recent Buyers" },
  { id: "abandoned", name: "Abandoned Carts" },
];

// Mock User Data
const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "+15551234567",
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria@example.com",
    phone: "+15559876543",
  },
  {
    id: "3",
    name: "James Smith",
    email: "james@example.com",
    phone: "+15555555555",
  },
  {
    id: "4",
    name: "Moses Mwangi",
    email: "moses.mwangi.me@example.com",
    phone: "+15555555555",
  },
];

const NotificationService = {
  async send({
    title,
    message,
    recipients,
    channels,
    scheduledAt,
    type,
    metadata = {},
  }: {
    title: string;
    message: string;
    recipients: string[] | "all";
    channels: DeliveryChannel[];
    scheduledAt?: Date;
    type: NotificationType;
    metadata?: Record<string, any>;
  }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Notification Dispatched:", {
          title,
          message,
          recipients,
          channels,
          scheduledAt,
          type,
          metadata,
        });
        resolve({ success: true, queued: true });
      }, 1000);
    });
  },

  async getUserSuggestions(query: string): Promise<User[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          MOCK_USERS.filter(
            (user) =>
              user.name.toLowerCase().includes(query.toLowerCase()) ||
              user.email.toLowerCase().includes(query.toLowerCase())
          )
        );
      }, 300);
    });
  },
};

export default function NotificationManager() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [userSearch, setUserSearch] = useState("");
  const [userResults, setUserResults] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const [form, setForm] = useState({
    title: "",
    message: "",
    type: "promotion" as NotificationType,
    recipientOption: "all" as RecipientOption,
    selectedSegments: [] as string[],
    selectedUserIds: [] as string[],
    channels: ["in-app", "email"] as DeliveryChannel[],
    isScheduled: false,
    scheduledAt: undefined as Date | undefined,
    metadata: {} as Record<string, any>,
  });

  // Search users with debounce
  useEffect(() => {
    if (userSearch.trim() && form.recipientOption === "users") {
      const timer = setTimeout(() => {
        NotificationService.getUserSuggestions(userSearch).then(setUserResults);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [userSearch, form.recipientOption]);

  const applyTemplate = (template: NotificationTemplate) => {
    setForm({
      ...form,
      title: template.subject,
      message: template.content,
      type: template.type,
    });
  };

  const handleUserSelect = (user: User) => {
    if (!selectedUsers.some((u) => u.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
      setForm({
        ...form,
        selectedUserIds: [...form.selectedUserIds, user.id],
      });
    }
    setUserSearch("");
    setUserResults([]);
  };

  const removeUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== userId));
    setForm({
      ...form,
      selectedUserIds: form.selectedUserIds.filter((id) => id !== userId),
    });
  };

  const toggleChannel = (channel: DeliveryChannel) => {
    const newChannels = form.channels.includes(channel)
      ? form.channels.filter((c) => c !== channel)
      : [...form.channels, channel];
    setForm({ ...form, channels: newChannels });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const recipients =
        form.recipientOption === "all"
          ? "all"
          : form.recipientOption === "segments"
          ? form.selectedSegments
          : form.selectedUserIds;

      const result = await NotificationService.send({
        title: form.title,
        message: form.message,
        type: form.type,
        recipients,
        channels: form.channels,
        scheduledAt: form.isScheduled ? date : undefined,
        metadata: form.metadata,
      });

      toast({
        title: "Notification queued",
        description: (result as any)?.success
          ? "Your notification has been scheduled for delivery"
          : "Failed to queue notification",
        variant: (result as any)?.success ? "default" : "destructive",
      });

      // Reset form if not scheduled
      console.log(form);

      if (!form.isScheduled) {
        setForm({
          ...form,
          title: "",
          message: "",
          selectedUserIds: [],
          metadata: {},
        });
        setSelectedUsers([]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send notification",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6 p-6">
      {/* Notification Composer */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Create Notification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Notification Type</Label>
              <Select
                value={form.type}
                onValueChange={(value) =>
                  setForm({ ...form, type: value as NotificationType })
                }
              >
                <SelectTrigger className=" focus:ring-orange-500">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="promotion">Promotion</SelectItem>
                  <SelectItem value="alert">Alert</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="transactional">Transactional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Template</Label>
              <TemplateSelector onSelect={applyTemplate} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              className=" focus-visible:ring-orange-500"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Notification title"
            />
          </div>

          <div className="space-y-2">
            <Label>Message Content</Label>
            <Textarea
              className=" focus-visible:ring-orange-500"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Enter your message..."
              rows={6}
            />
          </div>

          {/* Recipient Selection */}
          <div className="space-y-4">
            <Label>Recipient Selection</Label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  className="data-[state=checked]:bg-orange-500/85 data-[state=unchecked]:bg-gray-300"
                  id="all-users"
                  checked={form.recipientOption === "all"}
                  onCheckedChange={(checked) =>
                    setForm({
                      ...form,
                      recipientOption: checked ? "all" : "segments",
                    })
                  }
                />
                <Label htmlFor="all-users">All Users</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="segments"
                  className="data-[state=checked]:bg-orange-500/85 data-[state=unchecked]:bg-gray-300"
                  checked={form.recipientOption === "segments"}
                  onCheckedChange={(checked) =>
                    setForm({
                      ...form,
                      recipientOption: checked
                        ? "segments"
                        : form.recipientOption,
                    })
                  }
                />
                <Label htmlFor="segments">Segments</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  className="data-[state=checked]:bg-orange-500/85 data-[state=unchecked]:bg-gray-300"
                  id="specific-users"
                  checked={form.recipientOption === "users"}
                  onCheckedChange={(checked) =>
                    setForm({
                      ...form,
                      recipientOption: checked ? "users" : form.recipientOption,
                    })
                  }
                />
                <Label htmlFor="specific-users">Specific Users</Label>
              </div>
            </div>

            {form.recipientOption === "segments" && (
              <SegmentSelector
                selectedSegments={form.selectedSegments}
                onChange={(segments) =>
                  setForm({ ...form, selectedSegments: segments })
                }
              />
            )}

            {form.recipientOption === "users" && (
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    className="pl-10 bg-gray-50 focus-visible:ring-orange-500"
                    placeholder="Search users by name or email..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                  />
                  <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>

                {userResults.length > 0 && (
                  <div className="border rounded-lg p-2 max-h-60 overflow-auto">
                    {userResults.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center p-2 hover:bg-accent cursor-pointer rounded"
                        onClick={() => handleUserSelect(user)}
                      >
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>
                            {user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selectedUsers.length > 0 && (
                  <div className="space-y-2">
                    <Label>Selected Users ({selectedUsers.length})</Label>
                    <div className="border rounded-lg p-2 max-h-40 overflow-auto">
                      {selectedUsers.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between p-2"
                        >
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>
                                {user.name.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeUser(user.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Delivery Channels */}
          <div className="space-y-2">
            <Label>Delivery Methods</Label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  className="data-[state=checked]:bg-orange-500/85 data-[state=unchecked]:bg-gray-300"
                  id="in-app"
                  checked={form.channels.includes("in-app")}
                  onCheckedChange={() => toggleChannel("in-app")}
                />
                <Label htmlFor="in-app" className="flex items-center gap-1">
                  <Bell className="h-4 w-4" /> In-App
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  className="data-[state=checked]:bg-orange-500/85 data-[state=unchecked]:bg-gray-300"
                  id="email"
                  checked={form.channels.includes("email")}
                  onCheckedChange={() => toggleChannel("email")}
                />
                <Label htmlFor="email" className="flex items-center gap-1">
                  <Mail className="h-4 w-4" /> Email
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  className="data-[state=checked]:bg-orange-500/85 data-[state=unchecked]:bg-gray-300"
                  id="push"
                  checked={form.channels.includes("push")}
                  onCheckedChange={() => toggleChannel("push")}
                />
                <Label htmlFor="push" className="flex items-center gap-1">
                  <Smartphone className="h-4 w-4" /> Push
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  className="data-[state=checked]:bg-orange-500/85 data-[state=unchecked]:bg-gray-300"
                  id="sms"
                  checked={form.channels.includes("sms")}
                  onCheckedChange={() => toggleChannel("sms")}
                />
                <Label htmlFor="sms" className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" /> SMS
                </Label>
              </div>
            </div>
          </div>

          {/* Scheduling */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch
                className="data-[state=checked]:bg-orange-500/85 data-[state=unchecked]:bg-gray-300"
                id="schedule"
                checked={form.isScheduled}
                onCheckedChange={(checked) =>
                  setForm({ ...form, isScheduled: checked })
                }
              />
              <Label htmlFor="schedule">Schedule for later</Label>
            </div>

            {form.isScheduled && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      format(date, "PPPp")
                    ) : (
                      <span>Pick a date and time</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                  <div className="p-3 border-t">
                    <Input
                      type="time"
                      value={date ? format(date, "HH:mm") : ""}
                      onChange={(e) => {
                        const [hours, minutes] = e.target.value.split(":");
                        if (date) {
                          const newDate = new Date(date);
                          newDate.setHours(parseInt(hours, 10));
                          newDate.setMinutes(parseInt(minutes, 10));
                          setDate(newDate);
                        }
                      }}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>

          {/* Metadata for specific channels */}
          {(form.channels.includes("email") ||
            form.channels.includes("in-app")) && (
            <div className="space-y-2">
              <Label>Advanced Options</Label>
              <div className="grid gap-2">
                {form.channels.includes("email") && (
                  <div className="flex items-center space-x-2">
                    <Switch
                      className="data-[state=checked]:bg-orange-500/85 data-[state=unchecked]:bg-gray-300"
                      id="track-opens"
                      checked={form.metadata.trackOpens ?? true}
                      onCheckedChange={(checked) =>
                        setForm({
                          ...form,
                          metadata: { ...form.metadata, trackOpens: checked },
                        })
                      }
                    />
                    <Label htmlFor="track-opens">Track email opens</Label>
                  </div>
                )}
                {form.channels.includes("in-app") && (
                  <div className="flex items-center space-x-2">
                    <Switch
                      className="data-[state=checked]:bg-orange-500/85 data-[state=unchecked]:bg-gray-300"
                      id="persistent"
                      checked={form.metadata.persistent ?? false}
                      onCheckedChange={(checked) =>
                        setForm({
                          ...form,
                          metadata: { ...form.metadata, persistent: checked },
                        })
                      }
                    />
                    <Label htmlFor="persistent">
                      Persistent in-app notification
                    </Label>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !form.title || !form.message}
            className="w-full bg-orange-500/90 hover:bg-orange-600/95"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {form.isScheduled ? "Scheduling..." : "Sending..."}
              </>
            ) : form.isScheduled ? (
              "Schedule Notification"
            ) : (
              "Send Now"
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Notification History */}
      <Card>
        <CardHeader>
          <CardTitle>Notification History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Channels</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Flash Sale</TableCell>
                <TableCell>
                  <Badge variant="secondary">Promotion</Badge>
                </TableCell>
                <TableCell>All Users</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Badge variant="outline">
                      <Mail className="h-3 w-3" />
                    </Badge>
                    <Badge variant="outline">
                      <Bell className="h-3 w-3" />
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge>Delivered</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Password Reset</TableCell>
                <TableCell>
                  <Badge variant="secondary">Transactional</Badge>
                </TableCell>
                <TableCell>1 User</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    <Mail className="h-3 w-3" />
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge>Opened</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// Sub-components
function TemplateSelector({
  onSelect,
}: {
  onSelect: (template: NotificationTemplate) => void;
}) {
  return (
    <Select
      onValueChange={(value) =>
        onSelect(TEMPLATES.find((t) => t.id === value)!)
      }
    >
      <SelectTrigger className=" focus:ring-orange-500">
        <SelectValue placeholder="Select a template" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Marketing</SelectLabel>
          {TEMPLATES.filter((t) => t.type === "promotion").map((template) => (
            <SelectItem key={template.id} value={template.id}>
              {template.name}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Transactional</SelectLabel>
          {TEMPLATES.filter((t) => t.type === "transactional").map(
            (template) => (
              <SelectItem key={template.id} value={template.id}>
                {template.name}
              </SelectItem>
            )
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function SegmentSelector({
  selectedSegments,
  onChange,
}: {
  selectedSegments: string[];
  onChange: (segments: string[]) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {USER_SEGMENTS.map((segment) => (
          <Badge
            key={segment.id}
            variant={
              selectedSegments.includes(segment.id) ? "default" : "outline"
            }
            className="cursor-pointer px-3 py-1"
            onClick={() => {
              onChange(
                selectedSegments.includes(segment.id)
                  ? selectedSegments.filter((id) => id !== segment.id)
                  : [...selectedSegments, segment.id]
              );
            }}
          >
            {segment.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
