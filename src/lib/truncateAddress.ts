const truncateAddress = (address: string) =>
  address
    ? address.slice(0, 5) +
      '...' +
      address.slice(address.length - 5, address.length)
    : '';

export default truncateAddress;
