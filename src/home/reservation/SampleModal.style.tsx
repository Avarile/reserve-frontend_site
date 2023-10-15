import { Box, styled } from "@mui/material";

const Container = styled((props: any) => {
  return <Box {...props}></Box>;
})(({ theme }) => ({
  position: "absolute",
  padding: "32px 64px",
  marginTop: "64px", // "calc(50vh - 50%)
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "#FFFFFF",
  borderRadius: "16px",
  width: "75%",
  maxWidth: "680px",

  "& > .title": {
    margin: "16px 0",
    color: "#332820",
    fontSize: "36px",
    textAlign: "center",
  },

  "& > .sub-title": {
    margin: "16px 0",
    color: "#6D6D1F",
    fontSize: "16px",
    textAlign: "center",
  },

  "& > .content": {
    flex: "1",
    display: "flex",
    flexDirection: "column",

    "& > .step": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: "16px",
      margin: "24px 0",

      "& > .each": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",

        "& > .num": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "3px",
          width: "42px",
          height: "39px",
          background: "#CDCDCD",
          fontSize: "26px",
          borderRadius: "50%",
          border: "2px solid #565656",
        },

        "& > .text": {
          width: "58px",
          color: "#565656",
          fontSize: "14px",
          textAlign: "center",
        },
      },

      "& > .each-active": {
        "& > .num": {
          background: "#ACAB5E",
          border: "2px solid #000000",
        },

        "& > .text": {
          color: "#6D6D1F",
        },
      },

      "& > .line": {
        width: "36px",
        height: "3px",
        background: "#CDCDCD",
        borderRadius: "2px",
      },

      "& > .line-active": {
        background: "#332820",
      },
    },
  },

  "& > .buttons": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
    margin: "32px 0",

    "& > button": {
      flex: 1,
      height: "50px",
      fontSize: "18px",
      borderRadius: "6px",
      cursor: "pointer",
    },

    "& > .outline": {
      background: "#FFFFFF",
      color: "#332820",
      border: "1px solid #332820",
    },

    "& > .full": {
      background: "#6D6D1F",
      color: "#FFFFFF",
      border: "1px solid #000000",
    },
  },
}));

export default Container;
