import { useCallback, useState } from 'react';

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Textarea,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  Doctor,
  Slot,
  useBookAppointmentMutation,
} from '@/generated/core.graphql';

type FormData = {
  name: string;
  description: string;
};

type IProps = {
  doctor: Doctor;
  date: Date;
  slot: Slot;
  onSubmitSuccess: () => void;
};
const BookAppoinment = (props: IProps) => {
  const [bookAppoinment, { loading: bookAppoinmentLoading }] =
    useBookAppointmentMutation();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>();
  const [isOpen, setOpen] = useState<boolean>(false);
  const modalHandler = useCallback(() => setOpen(!isOpen), []);
  const onSubmit: SubmitHandler<FormData> = (data) => {
    modalHandler();
  };

  const addAppointment = useCallback(async () => {
    try {
      await bookAppoinment({
        variables: {
          bookAppointmentInput: {
            slot: {
              doctorId: props.slot.doctorId,
              start: props.slot.start,
              end: props.slot.end,
            },
            patientName: getValues('name'),
            description: getValues('description'),
            date: props.date,
          },
        },
      }).then((res) => {
        modalHandler();
        props.onSubmitSuccess();
      });
    } catch (ex) {
      console.log(ex);
    }
  }, [bookAppoinment, getValues, modalHandler, props]);

  return (
    <Box
      p={2}
      border={1}
      shadow='md'
      borderWidth='1px'
      bg={'white'}
      mt={4}
      w={'600px'}
    >
      <Heading as='h2' fontSize='large'>
        Booking Form
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl pb={2} isInvalid={errors.name ? true : false}>
          <FormLabel>Patient Name</FormLabel>
          <Input {...register('name', { required: true, minLength: 3 })} />
          {errors.name && (
            <FormErrorMessage>Min Lenght 3 Characters</FormErrorMessage>
          )}
        </FormControl>
        <FormControl pb={2}>
          <FormLabel>Notes</FormLabel>
          <Textarea
            placeholder='Notes to doctor'
            {...register('description')}
          />
        </FormControl>

        <Button colorScheme='teal' size='md' type='submit'>
          Submit
        </Button>
      </form>
      <Modal isOpen={isOpen} onClose={modalHandler}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Booking Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl pb={2}>
              <FormLabel>Doctor Name : {props.doctor.name}</FormLabel>
            </FormControl>
            <FormControl pb={2}>
              <FormLabel>Date : {props.date.toDateString()}</FormLabel>
            </FormControl>
            <FormControl pb={2}>
              <FormLabel>Slot : {props.slot.start}</FormLabel>
            </FormControl>
            <FormControl pb={2}>
              <FormLabel>Patient Name : {getValues('name')}</FormLabel>
            </FormControl>
            <FormControl pb={2}>
              <FormLabel>Notes : {getValues('description')}</FormLabel>
            </FormControl>
            {bookAppoinmentLoading ? (
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
              />
            ) : (
              <></>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='gray' mr={3} onClick={modalHandler}>
              Close
            </Button>
            <Button colorScheme='teal' onClick={addAppointment}>
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BookAppoinment;
