import { TimelineProvider } from "@/context/TimelineContext";
import ProjectTabs from "@/components/Project/Tabs";
import MockData from "./project.json";

export default async function Project() {
  return (
    <TimelineProvider>
      <main className="container flex flex-col gap-6 py-10 items-center lg:items-start w-full">
        <ProjectTabs
          project={MockData}
          contractTime={null}
          contractId="contractTestId"
          contractHistories={MockData.contractHistories}
        />
      </main>
    </TimelineProvider>
  );
}
