import { Heading, Box, Center, Square, Button } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';
import { Flex, Spacer } from '@chakra-ui/react';

const Header = () => {
  return (
    <Flex flexDirection={'row'} alignItems='center' gap='2' pb={4} p={2}>
      <Link href='/'>
        <Heading size='md'>Booking App</Heading>
      </Link>
      <Link href='/items'>
        <Button colorScheme='teal' variant='ghost'>
          Items
        </Button>
      </Link>
      <Link href='/appointments'>
        <Button colorScheme='teal' variant='ghost'>
          Appointments
        </Button>
      </Link>
    </Flex>
  );
};

export default Header;
