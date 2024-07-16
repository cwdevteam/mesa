export const getAddress = (projects: any, address: string, uid: string) => {
  let refUid = "";
  let accountAddress = address;
  if (projects?.length > 0) {
    let refAttestation = projects[projects.length - 1];
    refUid = refAttestation[5].value.value[5];
    if (refUid === uid) {
      uid = refAttestation[5].value.value[0];
      accountAddress = refAttestation[5].value.value[7];
    }
  }
  return { uid, accountAddress };
};
