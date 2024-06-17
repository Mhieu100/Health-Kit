import { Icon } from "@rneui/base";
import { Button, Card, Text } from "@rneui/themed";
import { ScrollView, View } from "react-native";
import CommonSpeedDial from "../customize/CommonSpeedDial";

const features = [
  {
    title: "Blood Pressure",
    description:
      "Blood pressure is the force of blood pushing against the walls of the arteries as the heart pumps blood.",
    uri: "https://news.olemiss.edu/wp-content/uploads/2019/02/UCIMG-711-2048x1150.jpg",
    navigate: "BloodPressure",
  },
  {
    title: "Blood Sugar (Glucose)",
    description:
      "Blood sugar, or glucose, is the primary sugar found in the blood and is the body's main source of energy.",
    uri: "https://niemagazine.com/wp-content/uploads/2017/11/blood-sugar.jpg",
    navigate: "BloodSugar",
  },
  {
    title: "BMI (Body Mass Index)",
    description:
      "BMI is a measure of body fat based on height and weight that applies to adult men and women.",
    uri: "https://winsorfit.com/wp-content/uploads/2020/02/bmi-vs-bmr.jpg",
    navigate: "BMI",
    style: { marginBottom: 10 },
  },
];

const HomeSceen = ({ navigation }) => {
  return (
    <>
      <ScrollView style={{ backgroundColor: "#ECF0F3" }}>
        {features.map((feature, index) => (
          <View style={feature.style} key={index}>
            <Card>
              <Card.Title>{feature.title}</Card.Title>
              <Card.Divider />
              <Card.Image
                style={{ padding: 0 }}
                source={{
                  uri: `${feature.uri}`,
                }}
              />
              <Text style={{ marginBottom: 10, marginTop: 10 }}>
                {feature.description}
              </Text>
              <Button
                onPress={() => {
                  navigation.navigate(feature.navigate);
                }}
                icon={
                  <Icon
                    name="calculate"
                    color="#ffffff"
                    iconStyle={{ marginRight: 10 }}
                  />
                }
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                }}
                title="Health Check"
              />
            </Card>
          </View>
        ))}
      </ScrollView>
      {/* <CommonSpeedDial  navigation={navigation}/> */}
    </>
  );
};
export default HomeSceen;
