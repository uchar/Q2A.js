const getUploadLink = async (_, __, context) => {
  console.log('context', context);
  return 'https://link';
};

export { getUploadLink };
