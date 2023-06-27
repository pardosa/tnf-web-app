import { useCallback, useEffect, useState } from 'react';

import { Heading, Box, Text } from '@chakra-ui/react';
import { addMinutes, addDays } from 'date-fns';

import DoctorSelector from '@/components/DoctorSelector';
import SlotSelector from '@/components/SlotSelector';
import { Doctor, Slot, useDoctorsQuery } from '@/generated/core.graphql';
import { SlotWithKey } from '@/types/domain';
import { splitTime } from '@/utilities/time';

const Appointments = () => {
  const { data, loading } = useDoctorsQuery();
  const [error, setError] = useState<string>();
  const [slots, setSlots] = useState<SlotWithKey[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>();
  const [isLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<SlotWithKey>();
  const [date, setDate] = useState<Date>(new Date());

  const generateSlots = useCallback(
    (doctor: Doctor, selectedDate: Date): SlotWithKey[] => {
      const dayOfWeek = selectedDate.getDay();
      const availability = doctor?.availability?.filter(
        (avl) => avl.dayOfWeek === dayOfWeek
      );
      const data: SlotWithKey[] = [];
      if (availability && availability.length > 0) {
        availability?.map((av) => {
          const times = splitTime(av.startTimeUtc, av.endTimeUtc, 15);

          times.map((tm: any, key: number) => {
            const start = data.length === 0 ? av.startTimeUtc : times[key - 1];
            // console.log(tm);
            // if (!bookedSlots.includes(start + ':00')) {
            const tmp: SlotWithKey = {
              key: 'slot' + key,
              doctorId: doctor?.id,
              start: start,
              end: tm,
            };
            data.push(tmp);
            // }
          });
        });
      }

      return data;
    },
    []
  );

  useEffect(() => {
    if (
      selectedDoctor &&
      selectedDoctor.availability &&
      selectedDoctor.availability?.length > 0 &&
      date
    ) {
      const slotData = generateSlots(selectedDoctor, date);
      setSlots(slotData);
    } else {
      setSlots([]);
    }
  }, [selectedDoctor, date, generateSlots]);

  return (
    <Box>
      <Heading>Appointments</Heading>
      {error && (
        <Box>
          <Text>{error}</Text>
        </Box>
      )}
      <DoctorSelector
        doctors={data?.doctors as Doctor[]}
        value={selectedDoctor}
        onChange={setSelectedDoctor}
      />
      {selectedDoctor ? (
        <Box>
          <Heading fontSize='large' pb={2}>
            Available Slot for doctor <span>{selectedDoctor?.name}</span>
          </Heading>
          <SlotSelector
            date={date}
            availableSlots={slots}
            value={selectedSlot}
            onChange={setSelectedSlot}
            loadingSlots={isLoading}
            onDateSelected={(dt) => {
              setDate(dt);
              setSelectedSlot(undefined);
            }}
          />
        </Box>
      ) : (
        <Text>No slots available</Text>
      )}
    </Box>
  );
};

export default Appointments;
