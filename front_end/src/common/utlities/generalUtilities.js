export const getProfileImageAddress = (profileImageName) => {
  if (!profileImageName) {
    return undefined;
  }
  if (profileImageName.includes('http')) {
    return profileImageName;
  }
  return `https://5f05e1ddde8c410011025a1b.liara.space/q2a/7khatcode-${profileImageName}`;
};
