import { Box, styled } from "@mui/material";

const Container = styled((props: any) => {
  return <Box {...props}></Box>;
})(({ theme, lgUp }) => ({
  position: "absolute",
  padding: lgUp ? "64px 128px" : "64px 28px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "#FFFFFF",
  borderRadius: "16px",
  width: "300px",
  maxWidth: "400px",
  overflow: "scroll",
  height:"80%",

  "& > .logo": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: "16px 0",
    width: "100%",

    "& > img": {
      width: "87px",
      height: "93px",
    },
  },

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

  "& > .tip": {
    margin: "16px 0",
    color: "#332820",
    fontSize: "16px",
    textAlign: "center",

    "& > .click": {
      color: "#6D6D1F",
      cursor: "pointer",
    },
  },
}));

export default Container;
