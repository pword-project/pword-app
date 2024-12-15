import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useFormik } from "formik";
import * as yup from "yup";
import EmailSchema from "@/schemas/email";
import { ThemedTextInput } from "@/components/ThemedInput";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect } from "react";
import { Link, useRouter } from "expo-router";
import { signInOtp, verifyOtp } from "@/actions/auth/actions";
import { VerifyEmailOtpParams } from "@supabase/supabase-js";
import { toast } from "@backpackapp-io/react-native-toast";

export default function LoginWithOTP() {
  const errorColor = useThemeColor({}, "error");
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
      password: yup.string().required("OTP is required"),
    }),
    onSubmit: async (values, formikHelpers) => {
      const { email, password } = values;
      const {
        error,
        data: { session },
      } = await verifyOtp({
        email,
        token: password,
      } as VerifyEmailOtpParams);

      if (error) {
        return formikHelpers.setStatus({ error: error.message });
      }

      if (!session)
        toast.error("Please check your inbox for email verification!");

      router.replace("/home");
    },
  });

  useEffect(() => {
    formik.resetForm();
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

        <Pressable
          onPress={async () => {
            if (!Boolean(formik.values.email)) {
              return toast.error("Email is required");
            }

            const { error } = await signInOtp(formik.values.email);

            if (error) {
              return toast.error(error.message);
            }

            toast.success("OTP sent to your email!");
          }}
        >
          <ThemedText
            type="button"
            style={{
              textAlign: "center",
            }}
          >
            Send otp
          </ThemedText>
        </Pressable>

        <ThemedTextInput
          style={styles.input}
          label="One time password"
          placeholder="One time password"
          id="password"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          autoComplete="password"
          error={formik.touched.password ? formik.errors.password : ""}
        />

        <Pressable
          onPress={() => {
            formik.handleSubmit();
          }}
        >
          <ThemedText
            type="button"
            style={{
              textAlign: "center",
            }}
          >
            Log in
          </ThemedText>
        </Pressable>

        <ThemedText
          type="default"
          style={{
            textAlign: "center",
            marginTop: 42,
          }}
        >
          Already have an account?{" "}
          <Link
            target="_self"
            href="/"
            style={{
              textAlign: "center",
              marginLeft: 4,
            }}
          >
            <ThemedText type="link">Log in</ThemedText>
          </Link>
        </ThemedText>

        <ThemedText
          type="default"
          style={{
            textAlign: "center",
            marginTop: 16,
          }}
        >
          Don't have an account?{" "}
          <Link
            target="_self"
            href="/signup"
            style={{
              textAlign: "center",
            }}
          >
            <ThemedText type="link">Sign up</ThemedText>
          </Link>
        </ThemedText>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
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
