import type { TFunction } from "~/types";


export function headerProfileMenu(t: TFunction) {
  return [
    {
      name: t("profile"),
      to: "/user/me",
      icon: "weui:contacts-outlined",
    },
    {
      name: t("profile.addresses"),
      to: "/user/addresses",
      icon: "weui:location-outlined",
    },
    {
      name: t("profile.myReviews"),
      to: "/user/reviews",
      icon: "weui:star-outlined",
    },
    {
      name: t("profile.ordersHistory"),
      to: "/user/reviews",
      icon: "weui:folder-outlined",
    },
  ];
}

export function mobileMenu(t: TFunction) {
  return [
    {
      name: t("profile"),
      to: "/user/me",
      icon: "weui:contacts-outlined",
    },
    {
      name: t("profile.addresses"),
      to: "/user/addresses",
      icon: "weui:location-outlined",
    },
    {
      name: t("profile.myReviews"),
      to: "/user/reviews",
      icon: "weui:star-outlined",
    },
    {
      name: t("profile.ordersHistory"),
      to: "/user/orders",
      icon: "weui:folder-outlined",
    },
    {
      name: t("profile.changePassword"),
      to: "/user/changepassword",
      icon: "weui:lock-outlined",
    },
    {
      name: t("profile.following"),
      to: "/user/following",
      icon: "weui:transfer2-outlined",
    },
  ];
}
