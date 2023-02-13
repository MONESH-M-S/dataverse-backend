// Utility Function to check whether the environment is dev or not

module.exports = () => {
  const env = process.env.NODE_ENV;
  return env === "dev";
};
