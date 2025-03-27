// // "use client";

// // import { useState } from "react";
// // // import { useToast } from "@/components/ui/use-toast";
// // import {
// //   Card,
// //   CardHeader,
// //   CardTitle,
// //   CardContent,
// //   CardFooter,
// // } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Textarea } from "@/components/ui/textarea";
// // import {
// //   Select,
// //   SelectTrigger,
// //   SelectValue,
// //   SelectContent,
// //   SelectItem,
// // } from "@/components/ui/select";
// // import { Calendar } from "@/components/ui/calendar";
// // import {
// //   Popover,
// //   PopoverContent,
// //   PopoverTrigger,
// // } from "@/components/ui/popover";
// // import { CalendarIcon, ChevronDown, Loader2 } from "lucide-react";
// // import { format } from "date-fns";
// // import { Switch } from "@/components/ui/switch";
// // import { Label } from "@/components/ui/label";
// // import { Badge } from "@/components/ui/badge";
// // import toast from "react-hot-toast";

// // // Types
// // type NotificationType = "promotion" | "alert" | "announcement" | "system";
// // type DeliveryChannel = "in-app" | "email" | "push" | "sms";
// // type RecipientOption = "all" | "segments" | "individual";

// // interface NotificationTemplate {
// //   id: string;
// //   name: string;
// //   subject: string;
// //   content: string;
// //   type: NotificationType;
// // }

// // // Mock Data
// // const TEMPLATES: NotificationTemplate[] = [
// //   {
// //     id: "1",
// //     name: "Flash Sale",
// //     subject: "Limited Time Offer!",
// //     content: "Get 20% off all items this weekend only!",
// //     type: "promotion",
// //   },
// //   {
// //     id: "2",
// //     name: "System Maintenance",
// //     subject: "Scheduled Maintenance",
// //     content: "Our system will be down for maintenance on {date} from {time}.",
// //     type: "system",
// //   },
// // ];

// // const USER_SEGMENTS = [
// //   { id: "vip", name: "VIP Customers" },
// //   { id: "inactive", name: "Inactive Users" },
// //   { id: "recent", name: "Recent Buyers" },
// //   { id: "abandoned", name: "Abandoned Carts" },
// // ];

// // // Mock Services
// // const NotificationService = {
// //   async send({
// //     title,
// //     message,
// //     recipients,
// //     channels,
// //     scheduledAt,
// //     type,
// //   }: {
// //     title: string;
// //     message: string;
// //     recipients: string[];
// //     channels: DeliveryChannel[];
// //     scheduledAt?: Date;
// //     type: NotificationType;
// //   }) {
// //     return new Promise((resolve) => {
// //       setTimeout(() => {
// //         console.log("Notification Sent:", {
// //           title,
// //           message,
// //           recipients,
// //           channels,
// //           scheduledAt,
// //           type,
// //         });
// //         resolve("Success");
// //       }, 1000);
// //     });
// //   },
// // };

// // const AnalyticsService = {
// //   async getStats() {
// //     return {
// //       openRate: 62.3,
// //       clickRate: 18.7,
// //       totalSent: 1245,
// //       lastCampaign: "2023-11-15",
// //     };
// //   },
// // };

// // // Components
// // const ChannelSelector = ({
// //   selectedChannels,
// //   onChange,
// // }: {
// //   selectedChannels: DeliveryChannel[];
// //   onChange: (channels: DeliveryChannel[]) => void;
// // }) => {
// //   const channels: DeliveryChannel[] = ["in-app", "email", "push", "sms"];

// //   const toggleChannel = (channel: DeliveryChannel) => {
// //     onChange(
// //       selectedChannels.includes(channel)
// //         ? selectedChannels.filter((c) => c !== channel)
// //         : [...selectedChannels, channel]
// //     );
// //   };

// //   return (
// //     <div className="space-y-2">
// //       <Label>Delivery Channels</Label>
// //       <div className="flex flex-wrap gap-2">
// //         {channels.map((channel) => (
// //           <Badge
// //             key={channel}
// //             variant={selectedChannels.includes(channel) ? "default" : "outline"}
// //             className="cursor-pointer px-3 py-1"
// //             onClick={() => toggleChannel(channel)}
// //           >
// //             {channel}
// //           </Badge>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // const SegmentSelector = ({
// //   selectedSegments,
// //   onChange,
// // }: {
// //   selectedSegments: string[];
// //   onChange: (segments: string[]) => void;
// // }) => {
// //   const toggleSegment = (segmentId: string) => {
// //     onChange(
// //       selectedSegments.includes(segmentId)
// //         ? selectedSegments.filter((id) => id !== segmentId)
// //         : [...selectedSegments, segmentId]
// //     );
// //   };

// //   return (
// //     <div className="space-y-2">
// //       <Label>Target Segments</Label>
// //       <div className="flex flex-wrap gap-2">
// //         {USER_SEGMENTS.map((segment) => (
// //           <Badge
// //             key={segment.id}
// //             variant={
// //               selectedSegments.includes(segment.id) ? "default" : "outline"
// //             }
// //             className="cursor-pointer px-3 py-1"
// //             onClick={() => toggleSegment(segment.id)}
// //           >
// //             {segment.name}
// //           </Badge>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // const TemplateSelector = ({
// //   onSelect,
// // }: {
// //   onSelect: (template: NotificationTemplate) => void;
// // }) => {
// //   return (
// //     <Select
// //       onValueChange={(value) =>
// //         onSelect(TEMPLATES.find((t) => t.id === value)!)
// //       }
// //     >
// //       <SelectTrigger>
// //         <SelectValue placeholder="Select a template" />
// //       </SelectTrigger>
// //       <SelectContent>
// //         {TEMPLATES.map((template) => (
// //           <SelectItem key={template.id} value={template.id}>
// //             {template.name}
// //           </SelectItem>
// //         ))}
// //       </SelectContent>
// //     </Select>
// //   );
// // };

// // export default function NotificationDashboard() {
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [date, setDate] = useState<Date | undefined>(new Date());
// //   const [form, setForm] = useState({
// //     title: "",
// //     message: "",
// //     type: "promotion" as NotificationType,
// //     recipientOption: "all" as RecipientOption,
// //     selectedSegments: [] as string[],
// //     channels: ["in-app", "email"] as DeliveryChannel[],
// //     isScheduled: false,
// //     scheduledAt: undefined as Date | undefined,
// //   });

// //   const [analytics, setAnalytics] = useState({
// //     openRate: 0,
// //     clickRate: 0,
// //     totalSent: 0,
// //     lastCampaign: "",
// //   });

// //   const loadAnalytics = async () => {
// //     const stats = await AnalyticsService.getStats();
// //     setAnalytics(stats);
// //   };

// //   const applyTemplate = (template: NotificationTemplate) => {
// //     setForm({
// //       ...form,
// //       title: template.subject,
// //       message: template.content,
// //       type: template.type,
// //     });
// //   };

// //   const handleSubmit = async () => {
// //     setIsLoading(true);
// //     try {
// //       await NotificationService.send({
// //         title: form.title,
// //         message: form.message,
// //         type: form.type,
// //         recipients:
// //           form.recipientOption === "all" ? ["all"] : form.selectedSegments,
// //         channels: form.channels,
// //         scheduledAt: form.isScheduled ? date : undefined,
// //       });

// //       toast.success({
// //         title: "Notification sent successfully",
// //         description: "Your notification has been queued for delivery",
// //       });

// //       // Refresh analytics
// //       await loadAnalytics();
// //     } catch (error) {
// //       toast.error({
// //         title: "Error",
// //         description: "Failed to send notification",
// //         variant: "destructive",
// //       });
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="grid gap-6 p-6 md:grid-cols-2">
// //       {/* Notification Composer */}
// //       <Card className="col-span-2">
// //         <CardHeader>
// //           <CardTitle>Create Notification</CardTitle>
// //         </CardHeader>
// //         <CardContent className="space-y-4">
// //           <div className="grid gap-4 md:grid-cols-2">
// //             <div className="space-y-2">
// //               <Label>Notification Type</Label>
// //               <Select
// //                 value={form.type}
// //                 onValueChange={(value) =>
// //                   setForm({ ...form, type: value as NotificationType })
// //                 }
// //               >
// //                 <SelectTrigger>
// //                   <SelectValue placeholder="Select type" />
// //                 </SelectTrigger>
// //                 <SelectContent>
// //                   <SelectItem value="promotion">Promotion</SelectItem>
// //                   <SelectItem value="alert">Alert</SelectItem>
// //                   <SelectItem value="announcement">Announcement</SelectItem>
// //                   <SelectItem value="system">System</SelectItem>
// //                 </SelectContent>
// //               </Select>
// //             </div>

// //             <div className="space-y-2">
// //               <Label>Template</Label>
// //               <TemplateSelector onSelect={applyTemplate} />
// //             </div>
// //           </div>

// //           <div className="space-y-2">
// //             <Label>Title</Label>
// //             <Input
// //               value={form.title}
// //               onChange={(e) => setForm({ ...form, title: e.target.value })}
// //               placeholder="Notification title"
// //             />
// //           </div>

// //           <div className="space-y-2">
// //             <Label>Message</Label>
// //             <Textarea
// //               value={form.message}
// //               onChange={(e) => setForm({ ...form, message: e.target.value })}
// //               placeholder="Notification content"
// //               rows={5}
// //             />
// //           </div>

// //           <div className="space-y-2">
// //             <Label>Recipients</Label>
// //             <div className="flex gap-4">
// //               <div className="flex items-center space-x-2">
// //                 <Switch
// //                   id="all-users"
// //                   checked={form.recipientOption === "all"}
// //                   onCheckedChange={(checked) =>
// //                     setForm({
// //                       ...form,
// //                       recipientOption: checked ? "all" : "segments",
// //                     })
// //                   }
// //                 />
// //                 <Label htmlFor="all-users">All Users</Label>
// //               </div>

// //               <div className="flex items-center space-x-2">
// //                 <Switch
// //                   id="segments"
// //                   checked={form.recipientOption === "segments"}
// //                   onCheckedChange={(checked) =>
// //                     setForm({
// //                       ...form,
// //                       recipientOption: checked ? "segments" : "all",
// //                     })
// //                   }
// //                 />
// //                 <Label htmlFor="segments">Specific Segments</Label>
// //               </div>
// //             </div>

// //             {form.recipientOption === "segments" && (
// //               <SegmentSelector
// //                 selectedSegments={form.selectedSegments}
// //                 onChange={(segments) =>
// //                   setForm({ ...form, selectedSegments: segments })
// //                 }
// //               />
// //             )}
// //           </div>

// //           <ChannelSelector
// //             selectedChannels={form.channels}
// //             onChange={(channels) => setForm({ ...form, channels })}
// //           />

// //           <div className="space-y-2">
// //             <div className="flex items-center space-x-2">
// //               <Switch
// //                 id="schedule"
// //                 checked={form.isScheduled}
// //                 onCheckedChange={(checked) =>
// //                   setForm({ ...form, isScheduled: checked })
// //                 }
// //               />
// //               <Label htmlFor="schedule">Schedule for later</Label>
// //             </div>

// //             {form.isScheduled && (
// //               <Popover>
// //                 <PopoverTrigger asChild>
// //                   <Button
// //                     variant="outline"
// //                     className="w-full justify-start text-left font-normal"
// //                   >
// //                     <CalendarIcon className="mr-2 h-4 w-4" />
// //                     {date ? format(date, "PPP") : <span>Pick a date</span>}
// //                   </Button>
// //                 </PopoverTrigger>
// //                 <PopoverContent className="w-auto p-0">
// //                   <Calendar
// //                     mode="single"
// //                     selected={date}
// //                     onSelect={setDate}
// //                     initialFocus
// //                   />
// //                 </PopoverContent>
// //               </Popover>
// //             )}
// //           </div>
// //         </CardContent>
// //         <CardFooter>
// //           <Button
// //             onClick={handleSubmit}
// //             disabled={isLoading}
// //             className="w-full"
// //           >
// //             {isLoading ? (
// //               <>
// //                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// //                 Sending...
// //               </>
// //             ) : (
// //               "Send Notification"
// //             )}
// //           </Button>
// //         </CardFooter>
// //       </Card>

// //       {/* Analytics Dashboard */}
// //       <Card>
// //         <CardHeader>
// //           <CardTitle>Campaign Analytics</CardTitle>
// //         </CardHeader>
// //         <CardContent className="space-y-4">
// //           <div className="grid grid-cols-2 gap-4">
// //             <div className="space-y-1">
// //               <p className="text-sm font-medium text-muted-foreground">
// //                 Open Rate
// //               </p>
// //               <p className="text-2xl font-bold">{analytics.openRate}%</p>
// //             </div>
// //             <div className="space-y-1">
// //               <p className="text-sm font-medium text-muted-foreground">
// //                 Click Rate
// //               </p>
// //               <p className="text-2xl font-bold">{analytics.clickRate}%</p>
// //             </div>
// //             <div className="space-y-1">
// //               <p className="text-sm font-medium text-muted-foreground">
// //                 Total Sent
// //               </p>
// //               <p className="text-2xl font-bold">{analytics.totalSent}</p>
// //             </div>
// //             <div className="space-y-1">
// //               <p className="text-sm font-medium text-muted-foreground">
// //                 Last Campaign
// //               </p>
// //               <p className="text-2xl font-bold">
// //                 {analytics.lastCampaign || "None"}
// //               </p>
// //             </div>
// //           </div>
// //         </CardContent>
// //       </Card>

// //       {/* Recent Notifications */}
// //       <Card>
// //         <CardHeader>
// //           <CardTitle>Recent Notifications</CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           <div className="space-y-4">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="font-medium">Flash Sale</p>
// //                 <p className="text-sm text-muted-foreground">Sent 2 days ago</p>
// //               </div>
// //               <Badge variant="outline">Promotion</Badge>
// //             </div>
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="font-medium">System Maintenance</p>
// //                 <p className="text-sm text-muted-foreground">Sent 1 week ago</p>
// //               </div>
// //               <Badge variant="outline">System</Badge>
// //             </div>
// //           </div>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useEffect } from "react";
// // import {
// //   Card,
// //   CardHeader,
// //   CardTitle,
// //   CardContent,
// //   CardFooter,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/components/ui";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
//   SelectGroup,
//   SelectLabel,
// } from "@/components/ui/select";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   CalendarIcon,
//   ChevronDown,
//   Loader2,
//   SearchIcon,
//   Mail,
//   Smartphone,
//   Bell,
//   MessageSquare,
// } from "lucide-react";
// import { format } from "date-fns";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useToast } from "@/hooks/use-toast";

// // Types
// type NotificationType =
//   | "promotion"
//   | "alert"
//   | "announcement"
//   | "system"
//   | "transactional";
// type DeliveryChannel = "in-app" | "email" | "push" | "sms";
// type RecipientOption = "all" | "segments" | "users" | "single";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   avatar?: string;
//   phone?: string;
// }

// interface NotificationTemplate {
//   id: string;
//   name: string;
//   subject: string;
//   content: string;
//   type: NotificationType;
// }

// // Mock Data
// const TEMPLATES: NotificationTemplate[] = [
//   {
//     id: "1",
//     name: "Flash Sale",
//     subject: "Limited Time Offer!",
//     content: "Get 20% off all items this weekend only!",
//     type: "promotion",
//   },
//   {
//     id: "2",
//     name: "Password Reset",
//     subject: "Reset your password",
//     content: "Click here to reset your password: {link}",
//     type: "transactional",
//   },
// ];

// const USER_SEGMENTS = [
//   { id: "vip", name: "VIP Customers" },
//   { id: "inactive", name: "Inactive Users (30d+)" },
//   { id: "recent", name: "Recent Buyers" },
// ];

// // Mock User Data
// const MOCK_USERS: User[] = [
//   {
//     id: "1",
//     name: "Alex Johnson",
//     email: "alex@example.com",
//     phone: "+15551234567",
//   },
//   {
//     id: "2",
//     name: "Maria Garcia",
//     email: "maria@example.com",
//     phone: "+15559876543",
//   },
//   {
//     id: "3",
//     name: "James Smith",
//     email: "james@example.com",
//     phone: "+15555555555",
//   },
// ];

// // Enhanced Notification Service
// const NotificationService = {
//   async send({
//     title,
//     message,
//     recipients,
//     channels,
//     scheduledAt,
//     type,
//     metadata = {},
//   }: {
//     title: string;
//     message: string;
//     recipients: string[] | "all";
//     channels: DeliveryChannel[];
//     scheduledAt?: Date;
//     type: NotificationType;
//     metadata?: Record<string, any>;
//   }) {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         console.log("Notification Dispatched:", {
//           title,
//           message,
//           recipients,
//           channels,
//           scheduledAt,
//           type,
//           metadata,
//         });
//         resolve({ success: true, queued: true });
//       }, 1000);
//     });
//   },

//   async getUserSuggestions(query: string): Promise<User[]> {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(
//           MOCK_USERS.filter(
//             (user) =>
//               user.name.toLowerCase().includes(query.toLowerCase()) ||
//               user.email.toLowerCase().includes(query.toLowerCase())
//           )
//         );
//       }, 300);
//     });
//   },
// };

// export default function NotificationManager() {
//   const { toast } = useToast();
//   const [isLoading, setIsLoading] = useState(false);
//   const [date, setDate] = useState<Date | undefined>(new Date());
//   const [userSearch, setUserSearch] = useState("");
//   const [userResults, setUserResults] = useState<User[]>([]);
//   const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

//   const [form, setForm] = useState({
//     title: "",
//     message: "",
//     type: "promotion" as NotificationType,
//     recipientOption: "all" as RecipientOption,
//     selectedSegments: [] as string[],
//     selectedUserIds: [] as string[],
//     channels: ["in-app", "email"] as DeliveryChannel[],
//     isScheduled: false,
//     scheduledAt: undefined as Date | undefined,
//     metadata: {} as Record<string, any>,
//   });

//   // Search users with debounce
//   useEffect(() => {
//     if (userSearch.trim() && form.recipientOption === "users") {
//       const timer = setTimeout(() => {
//         NotificationService.getUserSuggestions(userSearch).then(setUserResults);
//       }, 300);
//       return () => clearTimeout(timer);
//     }
//   }, [userSearch, form.recipientOption]);

//   const applyTemplate = (template: NotificationTemplate) => {
//     setForm({
//       ...form,
//       title: template.subject,
//       message: template.content,
//       type: template.type,
//     });
//   };

//   const handleUserSelect = (user: User) => {
//     if (!selectedUsers.some((u) => u.id === user.id)) {
//       setSelectedUsers([...selectedUsers, user]);
//       setForm({
//         ...form,
//         selectedUserIds: [...form.selectedUserIds, user.id],
//       });
//     }
//     setUserSearch("");
//     setUserResults([]);
//   };

//   const removeUser = (userId: string) => {
//     setSelectedUsers(selectedUsers.filter((u) => u.id !== userId));
//     setForm({
//       ...form,
//       selectedUserIds: form.selectedUserIds.filter((id) => id !== userId),
//     });
//   };

//   const handleSubmit = async () => {
//     setIsLoading(true);

//     try {
//       const recipients =
//         form.recipientOption === "all"
//           ? "all"
//           : form.recipientOption === "segments"
//           ? form.selectedSegments
//           : form.selectedUserIds;

//       const result = await NotificationService.send({
//         title: form.title,
//         message: form.message,
//         type: form.type,
//         recipients,
//         channels: form.channels,
//         scheduledAt: form.isScheduled ? date : undefined,
//         metadata: form.metadata,
//       });

//       toast({
//         title: "Notification queued",
//         description: (result as any)?.success
//           ? "Your notification has been scheduled for delivery"
//           : "Failed to queue notification",
//         variant: (result as any)?.success ? "default" : "destructive",
//         // variant: result?.success ? "default" : "destructive",
//       });

//       // Reset form if not scheduled
//       if (!form.isScheduled) {
//         setForm({
//           ...form,
//           title: "",
//           message: "",
//           selectedUserIds: [],
//           metadata: {},
//         });
//         setSelectedUsers([]);
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to send notification",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="grid gap-6 p-6">
//       {/* Notification Composer */}
//       <Card className="col-span-2">
//         <CardHeader>
//           <CardTitle>Create Notification</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="grid gap-4 md:grid-cols-2">
//             <div className="space-y-2">
//               <Label>Notification Type</Label>
//               <Select
//                 value={form.type}
//                 onValueChange={(value) =>
//                   setForm({ ...form, type: value as NotificationType })
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="promotion">Promotion</SelectItem>
//                   <SelectItem value="alert">Alert</SelectItem>
//                   <SelectItem value="announcement">Announcement</SelectItem>
//                   <SelectItem value="system">System</SelectItem>
//                   <SelectItem value="transactional">Transactional</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             {/* /////////////////////////////////////////////// */}
//             <div className="space-y-2">
//               <Label>Template</Label>
//               <TemplateSelector onSelect={applyTemplate} />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label>Title</Label>
//             <Input
//               value={form.title}
//               onChange={(e) => setForm({ ...form, title: e.target.value })}
//               placeholder="Notification title"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label>Message Content</Label>
//             <Textarea
//               value={form.message}
//               onChange={(e) => setForm({ ...form, message: e.target.value })}
//               placeholder="Enter your message..."
//               rows={6}
//             />
//           </div>

//           {/* Recipient Selection */}
//           <div className="space-y-4">
//             <Label>Recipient Selection</Label>
//             <div className="flex flex-wrap gap-4">
//               <div className="flex items-center space-x-2">
//                 <Switch
//                   id="all-users"
//                   checked={form.recipientOption === "all"}
//                   onCheckedChange={(checked) =>
//                     setForm({
//                       ...form,
//                       recipientOption: checked ? "all" : "segments",
//                     })
//                   }
//                 />
//                 <Label htmlFor="all-users">All Users</Label>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <Switch
//                   id="segments"
//                   checked={form.recipientOption === "segments"}
//                   onCheckedChange={(checked) =>
//                     setForm({
//                       ...form,
//                       recipientOption: checked
//                         ? "segments"
//                         : form.recipientOption,
//                     })
//                   }
//                 />
//                 <Label htmlFor="segments">Segments</Label>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <Switch
//                   id="specific-users"
//                   checked={form.recipientOption === "users"}
//                   onCheckedChange={(checked) =>
//                     setForm({
//                       ...form,
//                       recipientOption: checked ? "users" : form.recipientOption,
//                     })
//                   }
//                 />
//                 <Label htmlFor="specific-users">Specific Users</Label>
//               </div>
//             </div>

//             {form.recipientOption === "segments" && (
//               <SegmentSelector
//                 selectedSegments={form.selectedSegments}
//                 onChange={(segments) =>
//                   setForm({ ...form, selectedSegments: segments })
//                 }
//               />
//             )}

//             {form.recipientOption === "users" && (
//               <div className="space-y-2">
//                 <div className="relative">
//                   <Input
//                     placeholder="Search users by name or email..."
//                     value={userSearch}
//                     onChange={(e) => setUserSearch(e.target.value)}
//                     className="pl-10"
//                   />
//                   <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                 </div>

//                 {userResults.length > 0 && (
//                   <div className="border rounded-lg p-2 max-h-60 overflow-auto">
//                     {userResults.map((user) => (
//                       <div
//                         key={user.id}
//                         className="flex items-center p-2 hover:bg-accent cursor-pointer rounded"
//                         onClick={() => handleUserSelect(user)}
//                       >
//                         <Avatar className="h-8 w-8 mr-2">
//                           <AvatarImage src={user.avatar} />
//                           <AvatarFallback>
//                             {user.name.charAt(0).toUpperCase()}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <p className="font-medium">{user.name}</p>
//                           <p className="text-sm text-muted-foreground">
//                             {user.email}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {selectedUsers.length > 0 && (
//                   <div className="space-y-2">
//                     <Label>Selected Users ({selectedUsers.length})</Label>
//                     <div className="border rounded-lg p-2 max-h-40 overflow-auto">
//                       {selectedUsers.map((user) => (
//                         <div
//                           key={user.id}
//                           className="flex items-center justify-between p-2"
//                         >
//                           <div className="flex items-center">
//                             <Avatar className="h-8 w-8 mr-2">
//                               <AvatarImage src={user.avatar} />
//                               <AvatarFallback>
//                                 {user.name.charAt(0).toUpperCase()}
//                               </AvatarFallback>
//                             </Avatar>
//                             <div>
//                               <p className="font-medium">{user.name}</p>
//                               <p className="text-sm text-muted-foreground">
//                                 {user.email}
//                               </p>
//                             </div>
//                           </div>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => removeUser(user.id)}
//                           >
//                             Remove
//                           </Button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Delivery Channels */}
//           <div className="space-y-2">
//             <Label>Delivery Methods</Label>
//             <div className="flex flex-wrap gap-4">
//               <div className="flex items-center space-x-2">
//                 <Switch
//                   id="in-app"
//                   checked={form.channels.includes("in-app")}
//                   onCheckedChange={(checked) => {
//                     const channels = checked
//                       ? [...form.channels, "in-app"]
//                       : form.channels.filter((c) => c !== "in-app");
//                     setForm({ ...form, channels });
//                   }}
//                 />
//                 <Label htmlFor="in-app" className="flex items-center gap-1">
//                   <Bell className="h-4 w-4" /> In-App
//                 </Label>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <Switch
//                   id="email"
//                   checked={form.channels.includes("email")}
//                   onCheckedChange={(checked) => {
//                     const channels = checked
//                       ? [...form.channels, "email"]
//                       : form.channels.filter((c) => c !== "email");
//                     setForm({ ...form, channels });
//                   }}
//                 />
//                 <Label htmlFor="email" className="flex items-center gap-1">
//                   <Mail className="h-4 w-4" /> Email
//                 </Label>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <Switch
//                   id="push"
//                   checked={form.channels.includes("push")}
//                   onCheckedChange={(checked) => {
//                     const channels = checked
//                       ? [...form.channels, "push"]
//                       : form.channels.filter((c) => c !== "push");
//                     setForm({ ...form, channels });
//                   }}
//                 />
//                 <Label htmlFor="push" className="flex items-center gap-1">
//                   <Smartphone className="h-4 w-4" /> Push
//                 </Label>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <Switch
//                   id="sms"
//                   checked={form.channels.includes("sms")}
//                   onCheckedChange={(checked) => {
//                     const channels = checked
//                       ? [...form.channels, "sms"]
//                       : form.channels.filter((c) => c !== "sms");
//                     setForm({ ...form, channels });
//                   }}
//                 />
//                 <Label htmlFor="sms" className="flex items-center gap-1">
//                   <MessageSquare className="h-4 w-4" /> SMS
//                 </Label>
//               </div>
//             </div>
//           </div>

//           {/* Scheduling */}
//           <div className="space-y-2">
//             <div className="flex items-center space-x-2">
//               <Switch
//                 id="schedule"
//                 checked={form.isScheduled}
//                 onCheckedChange={(checked) =>
//                   setForm({ ...form, isScheduled: checked })
//                 }
//               />
//               <Label htmlFor="schedule">Schedule for later</Label>
//             </div>

//             {form.isScheduled && (
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     className="w-full justify-start text-left font-normal"
//                   >
//                     <CalendarIcon className="mr-2 h-4 w-4" />
//                     {date ? (
//                       format(date, "PPPp")
//                     ) : (
//                       <span>Pick a date and time</span>
//                     )}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0">
//                   <Calendar
//                     mode="single"
//                     selected={date}
//                     onSelect={setDate}
//                     initialFocus
//                   />
//                   <div className="p-3 border-t">
//                     <Input
//                       type="time"
//                       value={date ? format(date, "HH:mm") : ""}
//                       onChange={(e) => {
//                         const [hours, minutes] = e.target.value.split(":");
//                         if (date) {
//                           const newDate = new Date(date);
//                           newDate.setHours(parseInt(hours, 10));
//                           newDate.setMinutes(parseInt(minutes, 10));
//                           setDate(newDate);
//                         }
//                       }}
//                     />
//                   </div>
//                 </PopoverContent>
//               </Popover>
//             )}
//           </div>

//           {/* Metadata for specific channels */}
//           {(form.channels.includes("email") ||
//             form.channels.includes("in-app")) && (
//             <div className="space-y-2">
//               <Label>Advanced Options</Label>
//               <div className="grid gap-2">
//                 {form.channels.includes("email") && (
//                   <div className="flex items-center space-x-2">
//                     <Switch
//                       id="track-opens"
//                       checked={form.metadata.trackOpens ?? true}
//                       onCheckedChange={(checked) =>
//                         setForm({
//                           ...form,
//                           metadata: { ...form.metadata, trackOpens: checked },
//                         })
//                       }
//                     />
//                     <Label htmlFor="track-opens">Track email opens</Label>
//                   </div>
//                 )}
//                 {form.channels.includes("in-app") && (
//                   <div className="flex items-center space-x-2">
//                     <Switch
//                       id="persistent"
//                       checked={form.metadata.persistent ?? false}
//                       onCheckedChange={(checked) =>
//                         setForm({
//                           ...form,
//                           metadata: { ...form.metadata, persistent: checked },
//                         })
//                       }
//                     />
//                     <Label htmlFor="persistent">
//                       Persistent in-app notification
//                     </Label>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </CardContent>
//         <CardFooter>
//           <Button
//             onClick={handleSubmit}
//             disabled={isLoading || !form.title || !form.message}
//             className="w-full"
//           >
//             {isLoading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 {form.isScheduled ? "Scheduling..." : "Sending..."}
//               </>
//             ) : form.isScheduled ? (
//               "Schedule Notification"
//             ) : (
//               "Send Now"
//             )}
//           </Button>
//         </CardFooter>
//       </Card>

//       {/* Notification History */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Notification History</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Title</TableHead>
//                 <TableHead>Type</TableHead>
//                 <TableHead>Recipients</TableHead>
//                 <TableHead>Channels</TableHead>
//                 <TableHead>Status</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               <TableRow>
//                 <TableCell>Flash Sale</TableCell>
//                 <TableCell>
//                   <Badge variant="secondary">Promotion</Badge>
//                 </TableCell>
//                 <TableCell>All Users</TableCell>
//                 <TableCell>
//                   <div className="flex gap-1">
//                     <Badge variant="outline">
//                       <Mail className="h-3 w-3" />
//                     </Badge>
//                     <Badge variant="outline">
//                       <Bell className="h-3 w-3" />
//                     </Badge>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <Badge>Delivered</Badge>
//                 </TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell>Password Reset</TableCell>
//                 <TableCell>
//                   <Badge variant="secondary">Transactional</Badge>
//                 </TableCell>
//                 <TableCell>1 User</TableCell>
//                 <TableCell>
//                   <Badge variant="outline">
//                     <Mail className="h-3 w-3" />
//                   </Badge>
//                 </TableCell>
//                 <TableCell>
//                   <Badge>Opened</Badge>
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// // Sub-components
// function TemplateSelector({
//   onSelect,
// }: {
//   onSelect: (template: NotificationTemplate) => void;
// }) {
//   return (
//     <Select
//       onValueChange={(value) =>
//         onSelect(TEMPLATES.find((t) => t.id === value)!)
//       }
//     >
//       <SelectTrigger>
//         <SelectValue placeholder="Select a template" />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           <SelectLabel>Marketing</SelectLabel>
//           {TEMPLATES.filter((t) => t.type === "promotion").map((template) => (
//             <SelectItem key={template.id} value={template.id}>
//               {template.name}
//             </SelectItem>
//           ))}
//         </SelectGroup>
//         <SelectGroup>
//           <SelectLabel>Transactional</SelectLabel>
//           {TEMPLATES.filter((t) => t.type === "transactional").map(
//             (template) => (
//               <SelectItem key={template.id} value={template.id}>
//                 {template.name}
//               </SelectItem>
//             )
//           )}
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   );
// }

// function SegmentSelector({
//   selectedSegments,
//   onChange,
// }: {
//   selectedSegments: string[];
//   onChange: (segments: string[]) => void;
// }) {
//   return (
//     <div className="space-y-2">
//       <div className="flex flex-wrap gap-2">
//         {USER_SEGMENTS.map((segment) => (
//           <Badge
//             key={segment.id}
//             variant={
//               selectedSegments.includes(segment.id) ? "default" : "outline"
//             }
//             className="cursor-pointer px-3 py-1"
//             onClick={() => {
//               onChange(
//                 selectedSegments.includes(segment.id)
//                   ? selectedSegments.filter((id) => id !== segment.id)
//                   : [...selectedSegments, segment.id]
//               );
//             }}
//           >
//             {segment.name}
//           </Badge>
//         ))}
//       </div>
//     </div>
//   );
// }
