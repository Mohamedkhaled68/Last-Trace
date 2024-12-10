/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            taj: "Tajawal, sans-serif",
        },
        fontSize: {
            // 14px
            "body-14-b": ["14px", { lineHeight: "120%", fontWeight: "700" }],
            "body-14-m": ["14px", { lineHeight: "120%", fontWeight: "500" }],
            "body-14-r": ["14px", { lineHeight: "120%", fontWeight: "400" }],
            // 16px
            "body-16-b": ["16px", { lineHeight: "120%", fontWeight: "700" }],
            "body-16-m": ["16px", { lineHeight: "120%", fontWeight: "500" }],
            "body-16-r": ["16px", { lineHeight: "120%", fontWeight: "400" }],
            // 18px
            "body-18-b": ["18px", { lineHeight: "120%", fontWeight: "700" }],
            "body-18-m": ["18px", { lineHeight: "120%", fontWeight: "500" }],
            "body-18-r": ["18px", { lineHeight: "120%", fontWeight: "400" }],
            // 24px
            "h2-24-b": ["24px", { lineHeight: "120%", fontWeight: "700" }],
            "h2-24-m": ["24px", { lineHeight: "120%", fontWeight: "500" }],
            "h2-24-r": ["24px", { lineHeight: "120%", fontWeight: "400" }],
            // 28px
            "h2-28-b": ["28px", { lineHeight: "120%", fontWeight: "700" }],
            "h2-28-m": ["28px", { lineHeight: "120%", fontWeight: "500" }],
            "h2-28-r": ["28px", { lineHeight: "120%", fontWeight: "400" }],
            // 32px
            "h1-32-b": ["32px", { lineHeight: "120%", fontWeight: "700" }],
            "h1-32-m": ["32px", { lineHeight: "120%", fontWeight: "500" }],
            "h1-32-r": ["32px", { lineHeight: "120%", fontWeight: "400" }],
            // 36px
            "h1-36-b": ["36px", { lineHeight: "120%", fontWeight: "700" }],
            "h1-36-m": ["36px", { lineHeight: "120%", fontWeight: "500" }],
            "h1-36-r": ["36px", { lineHeight: "120%", fontWeight: "400" }],
        },
        colors: {
            white: "#ffffff",
            black: "#000000",
            transparent: "transparent",
            grey: {
                50: "#ebebeb",
                100: "#c1c1c1",
                200: "#a3a3a3",
                300: "#787878",
                400: "#5e5e5e",
                500: "#363636",
                600: "#313131",
                700: "#262626",
                800: "#1e1e1e",
                900: "#171717",
            },
            "neutral-1": {
                50: "#f7f9f9",
                100: "#e7ebed",
                200: "#dbe1e4",
                300: "#cad3d8",
                400: "#c0cbd1",
                500: "#b0bec5",
                600: "#a0adb3",
                700: "#7d878c",
                800: "#61696c",
                900: "#4a5053",
            },
            "secondary-1": {
                50: "#fceeed",
                100: "#f6cbc6",
                200: "#f1b1ab",
                300: "#eb8e84",
                400: "#e7786d",
                500: "#e15648",
                600: "#cd4e42",
                700: "#a03d33",
                800: "#7c2f28",
                900: "#7c2f28",
            },
            "secondary-2": {
                50: "#effced",
                100: "#ccf6c6",
                200: "#b4f1ab",
                300: "#92eb84",
                400: "#92eb84",
                500: "#92eb84",
                600: "#92eb84",
                700: "#41a033",
                800: "#337c28",
                900: "#275f1e",
            },
            "secondary-3": {
                50: "#e6f1fe",
                100: "#b0d3fb",
                200: "#8abef9",
                300: "#54a0f6",
                400: "#338df5",
                500: "#0071f2",
                600: "#0067dc",
                700: "#0050ac",
                800: "#003e85",
                900: "#002f66",
            },
        },
        boxShadow: {
            custom: "0px 1px 10px 0px rgba(0, 0, 0, 0.15)",
        },
    },
    plugins: [],
};

// box-shadow: ;
