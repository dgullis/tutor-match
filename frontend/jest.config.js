module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'] 
  };