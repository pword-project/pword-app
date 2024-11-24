import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useFormik } from "formik";
import * as yup from "yup";
import EmailSchema from "@/schemas/email";
import PasswordSchema from "@/schemas/password";
import { useAuth } from "@/contexts/AuthContext";
import { ThemedTextInput } from "@/components/ThemedInput";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect } from "react";
import { Link, useRouter } from "expo-router";

export default function SignupForm() {
  const errorColor = useThemeColor({}, "error");

  const { signup } = useAuth();
  const router = useRouter();

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
        return formikHelpers.setStatus({ error: error.message });
      }

      router.replace("/");
    },
  });

  useEffect(() => {
    return () => {
      formik.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {formik.status?.error ? (
        <ThemedView style={styles.titleContainer}>
          <ThemedText
            type="smallprint"
            style={{
              color: errorColor,
            }}
          >
            {formik.status?.error}
          </ThemedText>
        </ThemedView>
      ) : null}

      <ThemedView style={styles.formContainer}>
        <ThemedTextInput
          style={styles.input}
          label="Email"
          placeholder="email"
          id="email"
          value={formik.values.email}
          onChangeText={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          autoComplete="email"
          error={formik.touched.email ? formik.errors.email : ""}
        />

        <ThemedTextInput
          style={styles.input}
          label="Password"
          placeholder="password"
          id="password"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          autoComplete="password"
          error={formik.touched.password ? formik.errors.password : ""}
          secureTextEntry
        />

        <Pressable
          onPress={() => {
            formik.handleSubmit();
          }}
        >
          <ThemedText
            type="subtitle"
            style={{
              textAlign: "center",
            }}
          >
            Sign up
          </ThemedText>
        </Pressable>

        <ThemedText
          type="default"
          style={{
            textAlign: "center",
          }}
        >
          Already have an account?
        </ThemedText>

        <Link
          target="_self"
          href="/"
          style={{
            textAlign: "center",
            marginTop: 42,
          }}
        >
          <ThemedText type="link">Log In</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  formContainer: {
    display: "flex",
    padding: 16,
    borderRadius: 16,
    flexDirection: "column",
    width: "100%",
    maxWidth: 500,
    gap: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
  },
});
