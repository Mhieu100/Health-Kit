import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  BarChart,
  LineChart,
  PopulationPyramid,
} from "react-native-gifted-charts";
import { useAuth } from "../../context/AuthContext";
import * as healthyService from "../../services/healthy.service";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

const TrackerSceen = () => {
  const { user } = useAuth();
  const [bloodPressure, setBloodPressure] = useState([]);
  const [bloodSugar, setBloodSugar] = useState([]);
  const [bmi, setBMI] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const bp = await healthyService.getBloodPressure(user.id);
          console.log(bp);
          setBloodPressure(bp.info);
          const bs = await healthyService.getBloodSugar(user.id);
          console.log(bs);
          setBloodSugar(bs.info);
          const bm = await healthyService.getBMI(user.id);
          console.log(bm);
          setBMI(bm.info);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [user.id])
  );

  const sys = bloodPressure.map((item) => ({
    value: parseInt(item.sys, 10),
    dataPointText: item.sys,
  }));

  const dia = bloodPressure.map((item) => ({
    value: parseInt(item.dia, 10),
    dataPointText: item.dia,
  }));
  const pul = bloodPressure.map((item) => ({
    value: parseInt(item.pul, 10),
    dataPointText: item.pul,
  }));

  const value = bloodSugar.map((item) => ({
    value: parseInt(item.value, 10),
    label: item.date_check,
  }));

  const data = bmi.map((item) => ({
    left: parseInt(item.height, 10),
    right: parseInt(item.weight, 10),
  }));
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginVertical: 12,
            color: "#177AD5",
          }}
        >
          Blood Pressure
        </Text>
        <LineChart
          thickness={3}
          data={sys}
          data2={dia}
          data3={pul}
          height={250}
          showVerticalLines
          spacing={44}
          initialSpacing={0}
          color1="skyblue"
          color2="orange"
          color3="red"
          textColor1="skyblue"
          textColor2="orange"
          textColor3="red"
          dataPointsHeight={6}
          dataPointsWidth={6}
          dataPointsColor1="skyblue"
          dataPointsColor2="orange"
          dataPointsColor3="red"
          textShiftY={-2}
          textShiftX={-5}
          textFontSize={13}
          noOfSections={4}
          width={250}
          isAnimated
        />
      </View>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginVertical: 12,
            color: "#177AD5",
          }}
        >
          Blood Sugar
        </Text>
        <View style={{ marginRight: 50, marginBottom: 10 }}>
          <BarChart
            width={250}
            data={value}
            frontColor={"#177AD5"}
            barWidth={40}
            noOfSections={4}
            backgroundColor={"#f2f2f2"}
            barBorderRadius={4}
            yAxisThickness={1}
            xAxisThickness={1}
            isAnimated
          />
        </View>
      </View>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginVertical: 12,
            color: "#177AD5",
          }}
        >
          Body Mass Index
        </Text>
        <View style={{ marginRight: 25, marginBottom: 10 }}>
          <PopulationPyramid data={data} width={320} showValuesAsBarLabels />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    margin: 18,
  },
});
export default TrackerSceen;
