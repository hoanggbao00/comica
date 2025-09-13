import type { Metadata } from "next";

export const APP_NAME = "Comica";
const APP_DEFAULT_TITLE = "Comica";
const APP_TITLE_TEMPLATE = `%s - ${APP_NAME}`;
const APP_DESCRIPTION =
  "Comica is a revolutionary AI comic creation tool designed for storytellers and artists. Our MVP allows you to generate powerful comic panels and pages from simple text prompts, giving you the power to bring your stories to life with a unique, brutalist-inspired artistic style. Whether you're a writer looking to visualize your narratives or an artist seeking inspiration, Comica makes comic creation effortless and fun. Unleash your creativity and transform your ideas into stunning comics in seconds!";

export const OpenGraph: Metadata = {
  metadataBase: new URL(process.env.VERCEL_URL || "http://localhost:3000"),
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/icons/favicon-light.ico",
        href: "/icons/favicon-light.ico",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/icons/favicon.ico",
        href: "/icons/favicon.ico",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  keywords: [],
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    images: "/og-image.png",
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: "/og-image.png",
  },
};
