import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';

const LoadingBar = () => {
  const barColor = useColorModeValue("blue.300", "blue.300");

  return (
    <Box
      bg={barColor}
      h="4px"
      position="fixed"
      top="0"
      left="0"
      width="0%"
      zIndex="9999"
      animation="loading 0.4s linear forwards"
      _keyframes={{
        loading: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      }}
    />
  );
};

export default LoadingBar;