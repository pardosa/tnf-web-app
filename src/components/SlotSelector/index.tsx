import { FC, useCallback } from 'react';

import { Flex, FlexProps, Text, Box, Button, Spinner } from '@chakra-ui/react';
import { format } from 'date-fns';
import moment from 'moment';
import { DayPickerSingleDateController } from 'react-dates';

import { SlotWithKey as Slot } from '@/types/domain';

import { Container } from './styled';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

type Props = {
  date: Date;
  availableSlots: Slot[];
  value?: Slot;
  onChange: (slot: Slot) => void;
  styleProps?: FlexProps;
  slotLoading?: Slot;
  loadingSlots: boolean;
  onDateSelected: (date: Date) => void;
  bookedSlots: string[];
};

const SlotSelector: FC<Props> = ({
  date,
  availableSlots,
  loadingSlots,
  value,
  onChange,
  styleProps,
  onDateSelected,
  bookedSlots,
  ...props
}) => {
  const onSlotSelected = useCallback(
    (slot: Slot) => {
      onChange(slot);
    },
    [onChange]
  );

  const minStartDate = moment(new Date());
  const maxStartDate = moment(
    new Date(new Date().setDate(new Date().getDate() + 30))
  );
  const time = new Date().toLocaleTimeString('en-GB');

  return (
    <Container {...styleProps}>
      <DayPickerSingleDateController
        initialVisibleMonth={() => moment(date)}
        onFocusChange={() => null}
        date={moment(date)}
        focused
        hideKeyboardShortcutsPanel
        isDayBlocked={(d) => {
          const isBlocked =
            d.startOf('day') < minStartDate.startOf('day') ||
            d.endOf('day') > maxStartDate.endOf('day');
          return isBlocked;
        }}
        onDateChange={(d) => {
          if (d) {
            onDateSelected(d.toDate());
          }
        }}
        {...props}
      />
      <Flex flexDirection='column' px='12px' w='100%' pb={2}>
        <Text fontSize='17px' mb='20px' mt='22px' textAlign='left'>
          {format(date, 'eeee, MMMM dd')}
        </Text>
        <Box flexGrow={1} overflow='auto' position='relative'>
          {loadingSlots ? (
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          ) : availableSlots.length > 0 ? (
            availableSlots.map((slot) => {
              const isBooked =
                bookedSlots.includes(slot.start + ':00') ||
                (slot.start < time &&
                  new Date().getDate() === new Date(date).getDate());
              return (
                <Button
                  key={slot.key}
                  _hover={{
                    backgroundColor: 'white.10',
                  }}
                  borderColor='white.10'
                  colorScheme={isBooked ? 'gray' : 'teal'}
                  fontSize='16px'
                  p={2}
                  mb={2}
                  onClick={() => !isBooked && onSlotSelected(slot)}
                  variant={
                    (value && value.start === slot.start) || isBooked
                      ? 'solid'
                      : 'outline'
                  }
                  width='100%'
                  size={'sm'}
                >
                  {slot.start + ' - ' + slot.end}
                </Button>
              );
            })
          ) : (
            <span>Not Available</span>
          )}
        </Box>
      </Flex>
    </Container>
  );
};

export default SlotSelector;
