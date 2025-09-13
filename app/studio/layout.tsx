import QueryProvider from "@/components/providers/query-provider";

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
