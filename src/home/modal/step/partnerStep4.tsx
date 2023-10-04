import { MenuItem, TextField, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Container from "../common/partnerStepContainer.style";
import { FormRef } from "../modal";
import dayjs from 'dayjs'
type PartnerStep1PropsType = {
  formRef?: React.MutableRefObject<FormRef>;
  className?: string;
};
const PartnerStep1: React.ComponentType<PartnerStep1PropsType> = (props) => {
  const { formRef } = props;
  return (
    <Container className={props.className}>
      <Typography variant="h6">{formRef?.current.submitter.email}</Typography>
    </Container>
  );
};

export default PartnerStep1;
