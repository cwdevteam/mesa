export const getAddress = (attestation: any, address: string, uid: string) => {
  let refUid = "";
  let accountAddress = address;
  let refAttestation = attestation;
  refUid = refAttestation[5];
  if (refUid === uid) {
    uid = refAttestation[0];
    accountAddress = refAttestation[7];
  }
  return { uid, accountAddress };
};
