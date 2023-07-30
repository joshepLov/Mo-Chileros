import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export const CalendarTest = ({onDatesSelected }) => {
    const [selectedDates, setSelectedDates] = useState({});
    const [bothDatesSelected, setBothDatesSelected] = useState(false);
    const [startDateSelected, setStartDateSelected] = useState(null);
    const [endDateSelected, setEndDateSelected] = useState(null);
  
    const handleDateSelect = (date) => {
      if (!selectedDates.startDate || selectedDates.endDate) {
        setSelectedDates({ startDate: date.dateString });
        setStartDateSelected(date.dateString);
        setEndDateSelected(null);
        setBothDatesSelected(false);
      } else if (date.dateString > selectedDates.startDate) {
        setSelectedDates({ ...selectedDates, endDate: date.dateString });
        setEndDateSelected(date.dateString);
        setBothDatesSelected(true);
      } else if (date.dateString === selectedDates.startDate) {
        setSelectedDates({ startDate: null, endDate: null });
        setStartDateSelected(null);
        setEndDateSelected(null);
        setBothDatesSelected(false);
      } else {
        setSelectedDates({ startDate: date.dateString });
        setStartDateSelected(date.dateString);
        setEndDateSelected(null);
        setBothDatesSelected(false);
      }
  
      // Llamada a la función onDatesSelected con las fechas seleccionadas
      onDatesSelected(startDateSelected, endDateSelected);
    };
  
    const getDaysInRange = () => {
      const { startDate, endDate } = selectedDates;
      if (startDate && endDate) {
        const range = {};
        let currentDate = new Date(startDate);
        while (currentDate <= new Date(endDate)) {
          const dateString = currentDate.toISOString().split('T')[0];
          range[dateString] = {
            customStyles: {
              container: {
                backgroundColor: bothDatesSelected ? 'green' : 'red',
                borderRadius: 20,
              },
              text: {
                color: 'white',
              },
            },
          };
          currentDate.setDate(currentDate.getDate() + 1);
        }
        return range;
      }
      return {};
    };
  
    return (
      <View style={styles.container}>
        {/* Mostrar las fechas seleccionadas en pantalla */}
        <Text style={styles.selectedDatesText}>
          {startDateSelected ? `Fecha de inicio: ${startDateSelected}` : 'Selecciona la fecha de inicio'}
        </Text>
        <Text style={styles.selectedDatesText}>
          {endDateSelected ? `Fecha final: ${endDateSelected}` : 'Selecciona la fecha final'}
        </Text>
        <Calendar
          // Resto de las props del calendario...
          onDayPress={handleDateSelect}
          markingType="custom"
          markedDates={{
            ...selectedDates,
            ...getDaysInRange(),
          }}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 16,
    },
    selectedDatesText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'green',
      marginBottom: 8,
    },
  });
  
  