import { Camera, CameraType } from "expo-camera/legacy";
import { useState, useEffect, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import * as FaceDetector from "expo-face-detector";
import * as FileSystem from "expo-file-system";
import axios from "axios"; // Import Axios
import { useAuth } from "../../context/AuthContext";

export default function FaceId() {
  const [type, setType] = useState(CameraType.front); // Default to front camera
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [faceDetected, setFaceDetected] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (faceDetected) {
      capturePhoto();
    }
  }, [faceDetected]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }



  const handleFacesDetected = ({ faces }) => {
    if (faces.length > 0) {
      setFaceDetected(true);
    } else {
      setFaceDetected(false);
    }
  };

  const capturePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          base64: false,
        });
        console.log("Photo URI:", photo.uri);
        sendPhotoToApi(photo.uri);
      } catch (error) {
        console.error("Error taking picture:", error);
        Alert.alert("Error", "Failed to capture photo.");
      }
    }
  };

  const { login } = useAuth()
  const sendPhotoToApi = async (photoUri) => {
    try {
      let formData = new FormData();
      formData.append("image", {
        uri: photoUri,
        type: "image/jpeg", // Adjust accordingly to the type of the image
        name: "photo.jpg",
      });

      const response = await axios.post(
        "https://4d79-171-225-185-35.ngrok-free.app/api/face-id/face-auth/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        login(data.user)
        Alert.alert("Login Successful");
      } else {
        Alert.alert("Login Failed", "Could not authenticate face.");
      }
    } catch (error) {
      console.error("Error sending photo to API:", error);
      Alert.alert("Error", "Failed to send photo to API.");
    }
  };

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={type}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runClassifications: FaceDetector.FaceDetectorClassifications.none,
          minDetectionInterval: 100,
          tracking: true,
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
