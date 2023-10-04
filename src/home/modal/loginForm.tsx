import { MenuItem, TextField } from "@mui/material";
import { useEffect } from "react";
import Container from "./common/partnerStepContainer.style";

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
const PartnerStep1: React.ComponentType<PartnerStep1PropsType> = (props) => {
  const { formRef } = props;
  return (
    <Container className={props.className}>
      <div className="input-area">
        <div className="each required">
          <TextField
            onChange={(e) => {
              let value = e.target.value;
              formRef!.current["email"] = value;
            }}
            size="small"
            fullWidth
            label="email"
          />
        </div>
        <div className="each  required">
          <TextField
            onChange={(e) => {
              let value = e.target.value;
              formRef!.current["password"] = value;
            }}
            size="small"
            fullWidth
            label="password"
          />
        </div>
      </div>
    </Container>
  );
};

export default PartnerStep1;
