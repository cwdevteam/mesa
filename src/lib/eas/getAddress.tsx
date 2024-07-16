const getAddress = (projects: any, refUid, accountAddress, uid, id) => {
  if (projects?.data.length > 0) {
    let refAttestation = projects.data[projects.data.length - 1];
    refUid = refAttestation.result[5];
    if (refUid === id) {
      uid = refAttestation.result[0];
      accountAddress = refAttestation.result[7];
    }
  }
  return { uid, accountAddress };
};
