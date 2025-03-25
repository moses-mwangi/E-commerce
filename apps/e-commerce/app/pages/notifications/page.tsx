import { Metadata } from "next";
import NotificationsPage from "./Notification";

export const metadata: Metadata = {
  title: "Hypermart Notification ",
  description: "This is a description of the page",
  openGraph: {
    title: "Page Title",
    description: "This is a description of the page",
    url: "https://yourwebsite.com/page",
    siteName: "Your Site Name",
    images: [
      {
        url: "https://yourwebsite.com/image.jpg",
        width: 800,
        height: 600,
        alt: "Image description",
      },
    ],
    type: "website",
  },
};

export default function Page() {
  return (
    <div>
      <NotificationsPage />
    </div>
  );
}
