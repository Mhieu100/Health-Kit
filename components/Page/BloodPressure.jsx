import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import DatePicker from "react-native-modern-datepicker";
import { Button, Dialog, ListItem } from "@rneui/themed";
import {
  Table,
  Row,
  Rows,
  Col,
  TableWrapper,
} from "react-native-table-component";

const BloodPressure = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [visible, setVisible] = useState(false);
  const [systolic, setSystolic] = useState(20);
  const [diastolic, setDiastolic] = useState(20);
  const [pulse, setPulse] = useState(20);
  const [value, setValue] = useState("");

  const tableTitle = ["Systolic", "Diastolic", "Pulse", "Result", "Date Time"];
  const tableData = [
    [systolic + ".00 mmHg"],
    [diastolic + ".00 mmHg"],
    [pulse + ".00 BPM"],
    [value],
    [selectedDate],
  ];

  const toggleDialog = () => {
    setIsVisible(!isVisible);
  };
  const toggleDialog1 = () => {
    setIsVisible1(!isVisible1);
  };
  const toggleDialog2 = () => {
    setIsVisible2(!isVisible2);
  };
  const toggleDialogResult = () => {
    setVisible(!visible);
  };
  var inputDate = new Date();
  var formattedDate = inputDate.toISOString().slice(0, 16).replace("T", " ");

  // useEffect(() => {
  //   if (systolic < 90 || diastolic < 60) {
  //     setValue("Hypotension");
  //   } else if (90 <= systolic && systolic <= 119 && 60 <= diastolic && diastolic <= 79) {
  //     setValue("Normal");
  //   } else if (120 <= systolic && systolic <= 129 && 60 <= diastolic && diastolic <= 79) {
  //     setValue("Elevated");
  //   } else if (130 <= systolic && systolic <= 139 || 80 <= diastolic && diastolic <= 89) {
  //     setValue("Hypertension - Stage 1");
  //   } else if (140 <= systolic && systolic <= 180 || 90 <= diastolic && diastolic <= 120) {
  //     setValue("Hypertension - Stage 2");
  //   } else if (systolic > 180 || diastolic > 120) {
  //     setValue("Hypertensive");
  //   }
  //}, [systolic, diastolic]);

  useEffect(() => {
    if (systolic < 90 || diastolic < 60) {
      setValue("Hypotension");
    } else if (
      90 <= systolic &&
      systolic <= 119 &&
      60 <= diastolic &&
      diastolic <= 79
    ) {
      setValue("Normal");
    } else if (
      120 <= systolic &&
      systolic <= 129 &&
      60 <= diastolic &&
      diastolic <= 79
    ) {
      setValue("Elevated");
    } else if (
      (130 <= systolic && systolic <= 139) ||
      (80 <= diastolic && diastolic <= 89)
    ) {
      setValue("Hypertension Stage 1");
    } else if (
      (140 <= systolic && systolic <= 180) ||
      (90 <= diastolic && diastolic <= 120)
    ) {
      setValue("Hypertension Stage 2");
    } else if (systolic > 180 || diastolic > 120) {
      setValue("Hypertensive");
    }
  }, [systolic, diastolic]);

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
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          margin: 10,
        }}
      >
        Select Date Check
      </Text>
      <DatePicker
        selected={formattedDate}
        current={formattedDate}
        onSelectedChange={(date) => setSelectedDate(date)}
      />
      <View style={{ margin: 12 }}>
        <Button onPress={toggleDialogResult}>Submit</Button>
      </View>

      <Dialog isVisible={visible}>
        <Dialog.Title
          titleStyle={{ textAlign: "center", fontSize: 15 }}
          title="Result Blood Pressure"
        />
        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 1 }}>
            <TableWrapper style={styles.wrapper}>
              <Col
                data={tableTitle}
                style={styles.title}
                heightArr={[28, 28]}
                textStyle={styles.text}
              />
              <Rows
                data={tableData}
                flexArr={[0, 1, 1]}
                style={styles.row}
                textStyle={{ textAlign: "center" }}
              />
            </TableWrapper>
          </Table>
        </View>
        <View style={{ marginTop: 10 }}>
          <Button
            title={"Save"}
            style={{ borderRadius: 6 }}
            onPress={toggleDialogResult}
          />
        </View>
      </Dialog>

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
  container: { backgroundColor: "#fff" },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#f6f8fa" },
  row: { height: 28 },
  text: { textAlign: "center" },
});
export default BloodPressure;
