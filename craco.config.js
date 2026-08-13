module.exports = {
  webpack: {
    alias: {
      '@': require('path').resolve(__dirname, 'src'),
      '@components': require('path').resolve(__dirname, 'src/components'),
      '@context': require('path').resolve(__dirname, 'src/context'),
      '@services': require('path').resolve(__dirname, 'src/services'),
      '@types': require('path').resolve(__dirname, 'src/types'),
      '@utils': require('path').resolve(__dirname, 'src/utils'),
      '@hooks': require('path').resolve(__dirname, 'src/hooks'),
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@context/(.*)$': '<rootDir>/src/context/$1',
        '^@services/(.*)$': '<rootDir>/src/services/$1',
        '^@types/(.*)$': '<rootDir>/src/types/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
      },
    },
  },
};