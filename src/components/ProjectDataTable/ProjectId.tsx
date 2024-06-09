const ProjectId = ({ row }: any) => {
  const uid = row.original[5].value.value[0];
  const shortenedUid = `${uid.slice(0, 5)}...${uid.slice(-3)}`;

  return (
    <a
      href={`https://base-sepolia.easscan.org/attestation/view/${uid}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <p className="truncate underline">{shortenedUid}</p>
    </a>
  );
};

export default ProjectId;
