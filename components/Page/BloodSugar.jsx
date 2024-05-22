import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import * as healthyService from "../../services/healthy.service";
import React, { useEffect, useState } from "react";
import DatePicker from "react-native-modern-datepicker";
import formattedDate from "../util/date";
import { Button } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Dialog } from "@rneui/themed";
import { Table, Rows, Col, TableWrapper } from "react-native-table-component";
import { useAuth } from "../../context/AuthContext";

const BloodSugar = ({navigation}) => {
  const conditions = [
    "Before Excercise",
    "After Excercise",
    "Before A Meal",
    "After A Meal",
    "Fasting",
    "Default",
    "Asleep",
  ];

  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [value, setValue] = useState("80.0");
  const [unit, setUnit] = useState("mg/dL");
  const [result, setResult] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [condition, setCondition] = useState("Asleep");

  const toggleDialogResult = () => {
    setVisible(!visible);
  };

  const tableTitle = ["Conditon", "Value", "Unit", "Result", "Date"];
  const tableData = [[condition], [value], [unit], [result], [selectedDate]];

  const convertUnit = () => {
    if (unit === "mg/dL") {
      const newValue = (parseFloat(value) / 18).toFixed(2); // mg/dL to mmol/L
      setValue(newValue);
      setUnit("mmol/L");
    } else {
      const newValue = (parseFloat(value) * 18).toFixed(2); // mmol/L to mg/dL
      setValue(newValue);
      setUnit("mg/dL");
    }
  };

  const { user } = useAuth();

  const addBloodSugar = async () => {
    const payload = {
      fettle: condition,
      unit: unit,
      value: value,
      dateCheck: selectedDate,
      result: result,
      user_id: user.id,
    };
    console.log(payload);
    try {
      await healthyService.addBloodSugar(payload);
      navigation.navigate("Home");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (value < 72.0 && unit == "mg/dL") {
      setResult("Low");
    } else if (72.0 <= value && value <= 99.0 && unit == "mg/dL") {
      setResult("Normal");
    } else if (99.0 < value && value < 126.0 && unit == "mg/dL") {
      setResult("Pre-diabetes");
    } else if (value >= 126.0 && unit == "mg/dL") {
      setResult("Diabetes");
    } else if (value < 4.0 && unit == "mmol/L") {
      setResult("Low");
    } else if (4.0 <= value && value <= 5.5 && unit == "mmol/L") {
      setResult("Normal");
    } else if (5.5 < value && value < 7.0 && unit == "mmol/L") {
      setResult("Pre-diabetes");
    } else if (value >= 7.0 && unit == "mmol/L") {
      setResult("Diabetes");
    }
  }, [value, unit]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.readingContainer}>
          <TextInput
            style={styles.readingText}
            keyboardType="numeric"
            value={value}
            onChangeText={setValue}
          />
          <Text style={styles.unitText}>{unit}</Text>
        </View>
        <Button title="Convert Unit" onPress={convertUnit} />

        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.dropdownText}>{condition}</Text>
          <Ionicons
            name="caret-down-outline"
            size={24}
            color="grey"
            style={styles.phoneIcon}
          />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Condition</Text>
            {conditions.map((index) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  setCondition(`${index}`);
                  setModalVisible(false);
                }}
              >
                <Text style={{ textAlign: "center" }}>{index}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.modalActions}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
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
        <Button title={"Submit"} onPress={toggleDialogResult} />
      </View>

      <Dialog isVisible={visible}>
        <Dialog.Title
          titleStyle={{ textAlign: "center", fontSize: 15 }}
          title="Result Blood Sugar"
        />
        <View style={styles.container_table}>
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
            onPress={addBloodSugar}
          />
        </View>
      </Dialog>
    </ScrollView>
  );
};

export default BloodSugar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    marginHorizontal: 18,
    marginVertical: 10,
  },
  readingContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    flexDirection: "row",
  },
  readingText: {
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  unitText: {
    fontSize: 18,
    color: "#888",
    marginLeft: 10,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginVertical: 16,
    width: "90%",
  },
  dropdownText: {
    fontSize: 18,
  },
  modalView: {
    marginTop: "auto",
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  phoneIcon: {
    marginLeft: 10,
  },
  container_table: { backgroundColor: "#fff" },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#f6f8fa" },
  row: { height: 28 },
  text: { textAlign: "center" },
});
