export const getFullUrl = (name) => {
  if (!name) {
    return undefined;
  }
  if (name.includes('http')) {
    return name;
  }
  return `https://5f05e1ddde8c410011025a1b.liara.space/q2a/7khatcode-${name}`;
};
