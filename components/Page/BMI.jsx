import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as healthyService from "../../services/healthy.service";
import DatePicker from "react-native-modern-datepicker";
import React, { useEffect, useState } from "react";
import RadioButton from "../customize/RadioButton";
import { Button, Dialog } from "@rneui/themed";
import {
  Table,
  Rows,
  Col,
  TableWrapper,
} from "react-native-table-component";
import formattedDate from "../util/date";
import { useAuth } from "../../context/AuthContext";

const BMI = ({navigation}) => {
  const { user } = useAuth();
  const [selectedValue, setSelectedValue] = useState("man");
  const [selectedDate, setSelectedDate] = useState("");
  const [weight, setWeight] = useState(10);
  const [height, setHeight] = useState(10);
  const [value, setValue] = useState({});
  const [visible, setVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible1, setIsVisible1] = useState(false);

  const toggleDialog = () => {
    setIsVisible(!isVisible);
  };
  const toggleDialog1 = () => {
    setIsVisible1(!isVisible1);
  };
  const toggleDialogResult = () => {
    setVisible(!visible);
  };
  let BMInumber = weight / ((height / 100) * (height / 100));
  const tableTitle = ["Gender", "Weight", "Height", "Result", "BMI", "Date"];
  const tableData = [
    [selectedValue.toUpperCase()],
    [weight + ".00 kg"],
    [height + ".00 cm"],
    [value],
    [BMInumber.toFixed(2) + " kg/m²"],
    [selectedDate],
  ];

  const addBMI = async () => {
    const payload = {
      gender: selectedValue,
      weight: weight,
      height: height,
      date_check: selectedDate.toString(),
      result: value,
      user: user.id,
      value: BMInumber.toFixed(2),
    };
    console.log(payload);
    try {
      await healthyService.addBMI(payload);
      navigation.navigate("Home");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (BMInumber <= 16.4) {
      setValue("Severely Underweight");
    } else if (16.5 <= BMInumber && BMInumber <= 18.4) {
      setValue("Underweight");
    } else if (18.5 <= BMInumber && BMInumber <= 24.9) {
      setValue("Normal");
    } else if (25.0 <= BMInumber && BMInumber <= 29.9) {
      setValue("Overweight");
    } else if (30.0 <= BMInumber && BMInumber <= 34.9) {
      setValue("Obese class I");
    } else if (35.0 <= BMInumber && BMInumber <= 39.9) {
      setValue("Obese class II");
    } else {
      setValue("Obese class III");
    }
  }, [BMInumber]);

  const numbers = [...Array(201)].map((_, i) => ({
    title: `${i + 10}`,
  }));

  return (
    <ScrollView>
      <View style={styles.containerTop}>
        <RadioButton
          color="#00ffff"
          label="man"
          selected={selectedValue === "man"}
          onSelect={() => setSelectedValue("man")}
        />
        <RadioButton
          color="#ff00ff"
          label="woman"
          selected={selectedValue === "woman"}
          onSelect={() => setSelectedValue("woman")}
        />
      </View>

      <Button
        title={`Weight ${weight ? `( ${weight} kg )` : "( 0 kg )"}`}
        onPress={toggleDialog}
        buttonStyle={styles.button}
        color={"#ff1a1a"}
      />

      <Button
        title={`Height ${height ? `( ${height} cm )` : "( 0 cm )"}`}
        onPress={toggleDialog1}
        buttonStyle={styles.button}
        color={"#ff1ab3"}
      />

      <Dialog isVisible={isVisible} onBackdropPress={toggleDialog}>
        <Dialog.Title
          title={`Select weight ${weight ? `( ${weight} kg )` : "( 0 kg )"}`}
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
                setWeight(item.title);
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
          title={`Select height ${height ? `( ${height} cm )` : "( 0 cm )"}`}
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
                setHeight(item.title);
                setIsVisible1(false);
              }}
            >
              <Text style={{ textAlign: "center" }}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Dialog>

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
          <Button title={"Save"} style={{ borderRadius: 6 }} onPress={addBMI} />
        </View>
      </Dialog>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerTop: {
    flexDirection: "row",
    marginTop: 14,
    justifyContent: "center",
  },
  button: {
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#f6f8fa" },
  row: { height: 28 },
  text: { textAlign: "center" },
});

export default BMI;
