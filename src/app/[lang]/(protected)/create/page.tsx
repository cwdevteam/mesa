import dynamic from "next/dynamic";

const DynamicZoraPage = dynamic(() => import("@/components/Pages/ZoraPage"), {
  ssr: false,
  loading: () => <div>Loading page...</div>,
});

export default function Create() {
  return (
    <main className="flex flex-col gap-12 container mx-auto py-10 content-start">
      <DynamicZoraPage />
    </main>
  );
}
