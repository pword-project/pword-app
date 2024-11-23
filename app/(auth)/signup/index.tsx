import { Image, Pressable, StyleSheet, TextInput } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useFormik } from "formik";
import * as yup from "yup";
import EmailSchema from "@/schemas/email";
import PasswordSchema from "@/schemas/password";
import { useAuth } from "@/contexts/AuthContext";

export default function Page() {
  const {signup} = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    initialStatus: {
      error: null,
    },
    validationSchema: yup.object().shape({
      email: EmailSchema,
      password: PasswordSchema,
    }),
    onSubmit: async (values, formikHelpers) => {
      const { email, password } = values;
      const { error } = await signup(email, password);

      if (error) {
        formikHelpers.setStatus({ error: error.message });
      }
    },
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: "#A1CEDC",
        dark: "#1D3D47",
      }}
      headerImage={
        <Image
          //eslint-disable-next-line
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Signup!</ThemedText>
        <HelloWave />
      </ThemedView>

      {formik.status.error ? (
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">{formik.status.error}</ThemedText>
        </ThemedView>
      ) : null}

      <ThemedView style={{ display: "flex", flexDirection: "column" }}>
        <ThemedView style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="email"
            id="email"
            value={formik.values.email}
            onChangeText={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            autoComplete="email"
            autoFocus
          />
          {formik.errors.email && formik.touched.email ? (
            <ThemedText type="default">{formik.errors.email}</ThemedText>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="password"
            id="password"
            value={formik.values.password}
            onChangeText={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            autoComplete="password"
            secureTextEntry
          />
          {formik.errors.password && formik.touched.password ? (
            <ThemedText type="default">{formik.errors.password}</ThemedText>
          ) : null}

          <Pressable
            onPress={() => {
              formik.handleSubmit();
            }}
          >
            <ThemedText type="default">Login</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: 8,
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
