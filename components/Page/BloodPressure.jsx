import React, { useEffect, useState } from "react";
import * as healthyService from "../../services/healthy.service";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DatePicker from "react-native-modern-datepicker";
import { Button, Dialog } from "@rneui/themed";
import {
  Table,
  Row,
  Rows,
  Col,
  TableWrapper,
} from "react-native-table-component";
import { useAuth } from "../../context/AuthContext";
import formattedDate from "../util/date";

const BloodPressure = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [visible, setVisible] = useState(false);
  const [systolic, setSystolic] = useState(20);
  const [diastolic, setDiastolic] = useState(20);
  const [pulse, setPulse] = useState(20);
  const [value, setValue] = useState({result: "", detail: ""});

  const { user } = useAuth();

  const tableTitle = ["Systolic", "Diastolic", "Pulse", "Result", "Date Time"];
  const tableData = [
    [systolic + ".00 mmHg"],
    [diastolic + ".00 mmHg"],
    [pulse + ".00 BPM"],
    [value.result],
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

  const addBloodPressure = async () => {
    const payload = {
      sys: systolic,
      dia: diastolic,
      pul: pulse,
      dateCheck: selectedDate,
      result: value.result,
      user_id: user.id,
    };
    console.log(payload);
    try {
      await healthyService.addBloodPressure(payload);
      navigation.navigate("Home");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (systolic < 90 || diastolic < 60) {
      setValue({
        result: "Hypotension",
        detail:
          "Your blood pressure is low. If it contunues, please see a doctor in time!",
      });
    } else if (
      90 <= systolic &&
      systolic <= 119 &&
      60 <= diastolic &&
      diastolic <= 79
    ) {
      setValue({
        result: "Normal",
        detail: "Your blood pressure is normal, keep it",
      });
    } else if (
      120 <= systolic &&
      systolic <= 129 &&
      60 <= diastolic &&
      diastolic <= 79
    ) {
      setValue({
        result: "Elevated",
        detail:
          "Your blood pressure is a little high. Pleasr maintain a healthy lifestyle and measure your blood pressure in time!",
      });
    } else if (
      (130 <= systolic && systolic <= 139) ||
      (80 <= diastolic && diastolic <= 89)
    ) {
      setValue({
        result: "Hypertension Stage 1",
        detail:
          "Your blood pressure is high, please pay attention to your diet and lifestyle! If this continues, please see a doctor!",
      });
    } else if (
      (140 <= systolic && systolic <= 180) ||
      (90 <= diastolic && diastolic <= 120)
    ) {
      setValue({
        result: "Hypertension Stage 2",
        detail:
          "Your blood pressure is high, please pay attention to your diet and lifestyle! If this continues, please see a doctor!",
      });
    } else if (systolic > 180 || diastolic > 120) {
      setValue({
        result: "Hypertensive",
        detail:
          "Your blood pressure is seriously high, please seek the help of a doctor in time!",
      });
    }
  }, [systolic, diastolic]);

  const numbers = [...Array(201)].map((_, i) => ({
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
                textStyle={styles.text}
              />
            </TableWrapper>
          </Table>
        </View>
        <View style={{ marginTop: 10 }}>
          <Button
            title={"Save"}
            style={{ borderRadius: 6 }}
            onPress={addBloodPressure}
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
            <TouchableOpacity
              style={{
                padding: 8,
                margin: 2,
                backgroundColor: "#f0f5f5",
                borderRadius: 6,
              }}
              key={index}
              onPress={() => {
                setSystolic(item.title);
                setIsVisible(false);
              }}
            >
              <Text style={{ textAlign: "center" }}>{item.title}</Text>
            </TouchableOpacity>
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
            <TouchableOpacity
              style={{
                padding: 8,
                margin: 2,
                backgroundColor: "#f0f5f5",
                borderRadius: 6,
              }}
              key={index}
              onPress={() => {
                setDiastolic(item.title);
                setIsVisible1(false);
              }}
            >
              <Text style={{ textAlign: "center" }}>{item.title}</Text>
            </TouchableOpacity>
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
              <TouchableOpacity
                style={{
                  padding: 8,
                  margin: 2,
                  backgroundColor: "#f0f5f5",
                  borderRadius: 6,
                }}
                key={index}
                onPress={() => {
                  setPulse(item.title);
                  setIsVisible2(false);
                }}
              >
                <Text style={{ textAlign: "center" }}>{item.title}</Text>
              </TouchableOpacity>
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
    borderRadius: 8,
  },
  container: { backgroundColor: "#fff" },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#f6f8fa" },
  row: { height: 28 },
  text: { textAlign: "center" },
});
export default BloodPressure;
