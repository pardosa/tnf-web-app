import { FC } from 'react';

import { Box, Button, Heading, SimpleGrid, Text } from '@chakra-ui/react';

import { Doctor } from '@/generated/core.graphql';

const DoctorSelector: FC<{
  doctors: Doctor[];
  value?: Doctor;
  onChange: (doc: Doctor) => void;
}> = ({ doctors, value, onChange }) => {
  return (
    <Box pb={4}>
      <Heading as='h2' fontSize='x-large'>
        Doctors
      </Heading>

      {!doctors || doctors.length === 0 ? (
        <Text>No doctors</Text>
      ) : (
        <SimpleGrid
          spacing={4}
          templateColumns='repeat(auto-fill, minmax(200px, 1fr))'
        >
          {doctors.map((doc) => (
            <Box
              key={doc.id}
              p={5}
              shadow='md'
              borderWidth='1px'
              bg={value?.id === doc.id ? 'gray.100' : 'white'}
            >
              <Heading fontSize='xl'>{doc.name}</Heading>
              <Button
                size={'sm'}
                mt={4}
                onClick={() => onChange(doc)}
                colorScheme='teal'
              >
                Make Appointment
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default DoctorSelector;
