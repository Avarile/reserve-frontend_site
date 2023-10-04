import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import Upload from "../../../common/upload";
import Container from "../common/partnerStepContainer.style";

type PartnerStep1PropsType = {
  formRef?: React.MutableRefObject<Record<string, any>>;
  className?: string;
};
const currencies = [
  {
    value: "Test_site_1",
    label: "Test_site_1",
  },
  {
    value: "Test_site_2",
    label: "Test_site_2",
  },
  {
    value: "Test_site_3",
    label: "Test_site_3",
  },
  {
    value: "Test_site_4",
    label: "Test_site_4",
  },
  {
    value: "Test_site_5",
    label: "Test_site_5",
  },
];
const 
PartnerStep1: React.ComponentType<PartnerStep1PropsType> = (props) => {
  const { formRef } = props;
  return (
    <Container className={props.className}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}>
        <Typography textAlign={"center"} variant="h5" component="div">
          Upload and attach files
        </Typography>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}>
        <Typography color={"red"} variant="inherit" component="div">
          Upload and attach files
        </Typography>
      </div>
      <div className="input-area">
        <Upload
          handleFileChange={(url: string) => {
            formRef!.current.pic = url;
          }}></Upload>
      </div>
    </Container>
  );
};

export default PartnerStep1;
