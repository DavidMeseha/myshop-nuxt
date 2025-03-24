import { z } from "zod";
import type { TFunction } from "../types";

const passwordValidationRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;

export function registerSchema(t: TFunction) {
  return z
    .object({
      email: z
        .string()
        .email(t("auth.emailNotValid"))
        .min(1, { message: t("auth.emailRequired") }),
      firstName: z.string().min(1, { message: t("auth.nameRequired") }),
      lastName: z.string().min(1, { message: t("auth.nameRequired") }),
      dayOfBirth: z.string(),
      monthOfBirth: z.string(),
      yearOfBirth: z.string(),
      gender: z.enum(["male", "female"]),
      password: z
        .string()
        .regex(passwordValidationRegex, {
          message: t("auth.passwordFormatError"),
        })
        .min(8, { message: t("auth.passwordMinimumLength") }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("changePassword.confirmPasswordDoseNotMatchNewPassword"),
      path: ["confirmPassword"],
    });
}

export function loginSchema(t: TFunction): z.ZodObject<
  {
    email: z.ZodString;
    password: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  {
    password: string;
    email: string;
  },
  {
    password: string;
    email: string;
  }
> {
  return z.object({
    email: z.string().email(t("auth.emailRequired")),
    password: z.string().min(1, { message: t("auth.passwordRequired") }),
  });
}

export function AddressSchema(t: TFunction) {
  return z.object({
    address: z.string().min(1, { message: t("addresses.addressIsRequired") }),
    country: z.string().min(1, { message: t("addresses.countryIsRequired") }),
    city: z.string().min(1, { message: t("addresses.cityIsRequired") }),
  });
}

export function editProfileSchema(t: TFunction) {
  return z.object({
    email: z.string().email(t("auth.emailNotValid")),
    imageUrl: z.string().url(),
    gender: z.enum(["male", "female"]).optional(),
    firstName: z.string().min(1, t("auth.nameRequired")),
    lastName: z.string().min(1, t("auth.nameRequired")),
    dateOfBirthDay: z.number().optional(),
    dateOfBirthMonth: z.number().optional(),
    dateOfBirthYear: z.number().optional(),
    phone: z.string().optional(),
  });
}

export type EditProfileForm = z.infer<ReturnType<typeof editProfileSchema>>;
export type RegisterForm = z.infer<ReturnType<typeof registerSchema>>;
export type LoginForm = z.infer<ReturnType<typeof loginSchema>>;
export type AddressForm = z.infer<ReturnType<typeof AddressSchema>>;
export type CheckoutForm = {
  shippingAddressId: string;
  billingMethod: string;
};
