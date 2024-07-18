import dynamic from "next/dynamic";

const DynamicZoraPage = dynamic(() => import("./ZoraPage"), {
  ssr: false,
  loading: () => <div>Loading page...</div>,
});

export default function Zora() {
  return (
    <main className="flex flex-col gap-12 container mx-auto py-10 content-start">
      <DynamicZoraPage />
      <div className="h-20 flex-none"></div>
    </main>
  );
}
