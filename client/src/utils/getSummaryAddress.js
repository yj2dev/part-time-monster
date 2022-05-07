const getSummaryAddress = (address) => {
  address = address.split(" ");
  return `${address[0]} ${address[1]}`;
};

export default getSummaryAddress;
