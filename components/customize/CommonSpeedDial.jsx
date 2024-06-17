import React from 'react';
import { SpeedDial } from '@rneui/themed';

const CommonSpeedDial = ({ navigation }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <SpeedDial
      // isOpen={open}
      icon={{ name: 'android', color: '#fff' }}
      openIcon={{ name: 'close', color: '#fff' }}
      
      onOpen={() => {
        navigation.navigate("BMI");
      }} 
    >
      {/* <SpeedDial.Action
        icon={{ name: 'add', color: '#fff' }}
        title="Add"
        onPress={() => console.log('Add Something')}
      />
      <SpeedDial.Action
        icon={{ name: 'delete', color: '#fff' }}
        title="Delete"
        onPress={() => console.log('Delete Something')}
      /> */}
    </SpeedDial>
  );
};

export default CommonSpeedDial;
