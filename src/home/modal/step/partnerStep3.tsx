import { MenuItem, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Container from "../common/partnerStepContainer.style";
import { FormRef } from "../modal";
import dayjs from 'dayjs'
type PartnerStep1PropsType = {
  formRef?: React.MutableRefObject<FormRef>;
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
        <div className="each desktop-half required">
          <DatePicker
            onChange={(e:any) => {
             let value =  dayjs(e).format('YYYY-MM-DD')
             formRef!.current.info.date = value;
            }}
            label="Submit Date"
          />
        </div>
        <div className="each desktop-half required">
          <TextField
            onChange={(e) => {
              let value = e.target.value;
              formRef!.current.info.lat = value;
            }}
            size="small"
            fullWidth
            label="lat"
          />
        </div>
        <div className="each desktop-half required">
          <TextField
            onChange={(e) => {
              let value = e.target.value;
              formRef!.current.info.lng = value;
            }}
            size="small"
            fullWidth
            label="lng"
          />
        </div>
        <div className="each desktop-half required">
          <TextField
            onChange={(e) => {
              let value = e.target.value;
              formRef!.current.info.notes = value;
            }}
            size="small"
            fullWidth
            label="notes"
          />
        </div>
        <div className="each desktop-half required">
          <TextField
            onChange={(e) => {
              let value = e.target.value;
              formRef!.current.info.site_id = value;
            }}
            size="small"
            fullWidth
            label="site_id"
          />
        </div>
        <div className="each desktop-half required">
          <TextField
            onChange={(e) => {
              let value = e.target.value;
              formRef!.current.info.volume_1 = Number(value);
            }}
            size="small"
            fullWidth
            label="volume_1"
          />
        </div>
        <div className="each desktop-half required">
          <TextField
            onChange={(e) => {
              let value = e.target.value;
              formRef!.current.info.volume_2 = Number(value);
            }}
            size="small"
            fullWidth
            label="volume_2"
          />
        </div>
        <div className="each desktop-half required">
          <TextField
            onChange={(e) => {
              let value = e.target.value;
              formRef!.current.info.water_way = value;
            }}
            size="small"
            fullWidth
            label="water_way"
          />
        </div>
      </div>
    </Container>
  );
};

export default PartnerStep1;
