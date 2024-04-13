import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import DatePicker from "react-native-modern-datepicker";
import { Button, Dialog, ListItem } from "@rneui/themed";

const BloodPressure = () => {
  const [selectedDate, setSelectedDate] = useState("");
  var inputDate = new Date();
  var formattedDate = inputDate.toISOString().slice(0, 16).replace("T", " ");

  const [isVisible, setIsVisible] = useState(false);
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);

  const toggleDialog = () => {
    setIsVisible(!isVisible);
  };
  const toggleDialog1 = () => {
    setIsVisible1(!isVisible1);
  };
  const toggleDialog2 = () => {
    setIsVisible2(!isVisible2);
  };
  const [systolic, setSystolic] = useState(20);
  const [diastolic, setDiastolic] = useState(20);
  const [pulse, setPulse] = useState(20);

  const numbers = [...Array(281)].map((_, i) => ({
    title: `${i + 20}`,
  }));

  return (
    <>
      <View style={{ marginBottom: 10 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            margin: 10,
          }}
        >
          Choose health index
        </Text>

        <Button
          title={`Systolic ${systolic ? `( ${systolic} mmHg )` : "( 0 mmHg )"}`}
          onPress={toggleDialog}
          buttonStyle={styles.button}
          color={"#ff1a1a"}
        />

        <Button
          title={`Diastolic ${
            diastolic ? `( ${diastolic} mmHg )` : "( 0 mmHg )"
          }`}
          onPress={toggleDialog1}
          buttonStyle={styles.button}
          color={"#ff1ab3"}
        />

        <Button
          title={`Pulse ${pulse ? `( ${pulse} BPM )` : "( 0 BPM )"}`}
          onPress={toggleDialog2}
          buttonStyle={styles.button}
          color={"#cc33ff"}
        />
      </View>

      <DatePicker
        selected={formattedDate}
        current={formattedDate}
        onSelectedChange={(date) => setSelectedDate(date)}
      />
      <Button
        onPress={() => {
          console.log(selectedDate);
        }}
      >
        Submit
      </Button>

      <Dialog isVisible={isVisible} onBackdropPress={toggleDialog}>
        <Dialog.Title
          title={`Select systolic ${
            systolic ? `( ${systolic} mmHg )` : "( 0 mmHg )"
          }`}
          titleStyle={{ textAlign: "center", fontSize: 15 }}
        />
        <ScrollView
          style={{ height: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {numbers.map((item, index) => (
            <ListItem
              key={index}
              onPress={() => {
                setSystolic(item.title);
                setIsVisible(false);
              }}
            >
              <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </ScrollView>
      </Dialog>

      <Dialog isVisible={isVisible1} onBackdropPress={toggleDialog1}>
        <Dialog.Title
          title={`Select diastolic ${
            diastolic ? `( ${diastolic} mmHg )` : "( 0 mmHg )"
          }`}
          titleStyle={{ textAlign: "center", fontSize: 15 }}
        />
        <ScrollView
          style={{ height: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {numbers.map((item, index) => (
            <ListItem
              key={index}
              onPress={() => {
                setDiastolic(item.title);
                setIsVisible1(false);
              }}
            >
              <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </ScrollView>
      </Dialog>

      <Dialog isVisible={isVisible2} onBackdropPress={toggleDialog2}>
        <Dialog.Title
          title={`Select pulse ${pulse ? `( ${pulse} BPM )` : "( 0 BPM )"}`}
          titleStyle={{ textAlign: "center", fontSize: 15 }}
        />
        <ScrollView
          style={{ height: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {numbers.map((item, index) => {
            if (index >= 181) {
              return null; // Stop rendering when index reaches 200
            }
            return (
              <ListItem
                key={index}
                onPress={() => {
                  setPulse(item.title);
                  setIsVisible2(false);
                }}
              >
                <ListItem.Content>
                  <ListItem.Title>{item.title}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            );
          })}
        </ScrollView>
      </Dialog>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginHorizontal: 20,
  },
});
export default BloodPressure;
