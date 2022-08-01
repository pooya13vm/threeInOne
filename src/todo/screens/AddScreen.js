import React, {useState, useContext, useEffect} from 'react';
import {Input, Button} from '@rneui/themed';
import ScreensLayout from '../../components/ScreensLayout';
import DropdownComponent from '../../components/DropDown';
import DatePicker from 'react-native-date-picker';
import {TodoContext} from '../../contexts/todoContext';
import {dateStringMaker} from '../../utility/dateHandler';
import {differentCal} from '../../utility/timeDifferentCal';
import styled from 'styled-components';

const InputContainer = styled.View`
  margin-horizontal: 20px;
  margin-top: 20px;
`;
const TextInputContainer = styled.View`
  margin: 22px;
  height: 170px;
  padding: 10px;
  border-radius: 7px;
  position: relative;
  border-width: 1px;
  border-color: ${props => props.color};
`;
const TextInputLable = styled.Text`
  color: #5c7065;
  font-size: 16px;
`;
const TextInput = styled.TextInput`
  padding-bottom: 10px;
  color: #5c7065;
`;
const TimeShowContainer = styled.View`
  justify-content: center;
  border-radius: 5px;
  align-self: center;
  margin-vertical: 10px;
  padding: 12px;
  border-width: 1px;
  border-color: #75e1a4;
`;
const TimeContent = styled.Text`
  color: #5c7065;
`;

const AddScreen = props => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState();
  const [stringifyDate, setStringifyDate] = useState('');
  const [remainingTime, setRemainingTime] = useState();

  const {setTask, getTask, setImportance, saveTask, setInfo} =
    useContext(TodoContext);

  const colors = {main: '#75e1a4', textColor: '#5C7065', background: '#ffffff'};

  const impressArray = [
    {label: 'Vital', value: 'vital', id: 1},
    {label: 'Obligatory', value: 'obligatory', id: 2},
    {label: 'Medium', value: 'medium', id: 3},
    {label: 'Inessential', value: 'inessential', id: 4},
  ];

  useEffect(() => {
    if (selectedTime) {
      let now = new Date();
      let time = now.getTime();
      let taskTime = selectedTime.getTime();
      if (time >= taskTime) {
        setStringifyDate('please select a future time');
      } else {
        let dif = differentCal(taskTime - time);
        setStringifyDate(dateStringMaker(selectedTime, true));
        setRemainingTime(dif);
      }
    }
  }, [selectedTime]);

  const TimeShow = () => {
    return (
      <TimeShowContainer>
        <TimeContent>{`Deadline : ${stringifyDate}`}</TimeContent>
        <TimeContent>{`Remaining time : ${remainingTime}`}</TimeContent>
      </TimeShowContainer>
    );
  };

  return (
    <ScreensLayout
      title="Add a task"
      props={props}
      onPressFun={() => saveTask(selectedTime, props)}
      colors={colors}>
      <InputContainer>
        <Input
          placeholder="Task Content"
          value={getTask}
          onChangeText={val => setTask(val)}
          inputContainerStyle={{
            paddingHorizontal: 8,
          }}
          containerStyle={{
            height: 50,
          }}
          style={{fontSize: 16, color: '#5C7065'}}
          placeholderTextColor="#5C7065"
          inputStyle={{color: '#5C7065'}}
        />
      </InputContainer>
      <DropdownComponent
        placeholder="How Importance ..."
        categoryList={impressArray}
        setDDvalue={setImportance}
      />
      <TextInputContainer color={colors.main}>
        <TextInputLable>More info:</TextInputLable>
        <TextInput multiline onChangeText={val => setInfo(val)} />
      </TextInputContainer>
      <Button
        title="Choose Deadline"
        buttonStyle={{
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: '#75e1a4',
        }}
        titleStyle={{color: '#5C7065', marginVertical: 5}}
        style={{
          marginTop: 30,
          width: '60%',
          alignSelf: 'center',
        }}
        onPress={() => setOpen(true)}
      />
      <DatePicker
        modal
        open={open}
        locale="en"
        date={date}
        onConfirm={date => {
          setSelectedTime(date);
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      {selectedTime !== undefined ? <TimeShow /> : null}
    </ScreensLayout>
  );
};

export default AddScreen;
