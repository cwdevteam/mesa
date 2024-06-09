"use client";

import Attestation from "../Attestation";
import generateAttestedEventTopics from "@/lib/eas/generateAttestedEventTopics";
import { useAccount } from "wagmi";
import useProjects from "@/hooks/useProjects";

const Attestations = () => {
  const { address } = useAccount();
  const topics = address && generateAttestedEventTopics(address);
  const { projects } = useProjects();

  return (
    <div>
      TOPICS
      <div>
        {topics &&
          topics.map((topic, key) => <p key={key}>{JSON.stringify(topic)}</p>)}
      </div>
      ATTESTATIONS ({projects.length})
      <div id="logs">
        {projects.map((attestation: any, key: any) => (
          <Attestation key={key} attestation={attestation} />
        ))}
      </div>
    </div>
  );
};

export default Attestations;
