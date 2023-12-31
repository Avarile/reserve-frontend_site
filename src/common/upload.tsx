import { useDropzone } from "react-dropzone";
// @mui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
// assets
import { UploadIllustration } from "../assets/illustrations";
//
import Iconify from "./iconify";
//
import { useEffect, useState } from "react";
import SingleFilePreview from "./preview-single-file";
import { UploadProps } from "./types";
import * as ExifReader from "exifreader";

// ----------------------------------------------------------------------
import { http } from "./http";

export interface FileUploadApiRequest {
  content_type: string;
  file_name: string;
  file_size: number;
  id: number;
  type: FileType;
  file?: File;
  user_id: number;
  site_id: string;
}

export enum FileType {
  CompanyBanner = "COMPANY_BANNER",
  CompanyGallery = "COMPANY_GALLERY",
  CompanyLogo = "COMPANY_LOGO",
  CompanyVideo = "COMPANY_VIDEO",
  OpportunityPic = "OPPORTUNITY_PIC",
  UserAvatar = "USER_AVATAR",
}

export interface FileUploadApiRespone {
  // 资源路径
  fileUrl: string;
  // 上传路径
  presignedUrl: string;
}
export function getUploadUrlApi(params: FileUploadApiRequest) {
  return http.request<{ content: FileUploadApiRespone }>({
    url: "/api/sample/upload/image",
    method: "POST",
    data: params,
  });
}
export function fileUploadApi(url: string, params: File) {
  return http.put(url, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
export default function Upload({
  handleFileChange,
  setForceUpdate,
  disabled,
  multiple = false,
  error,
  helperText,
  //
  file,
  onDelete,
  //
  files,
  thumbnail,
  onUpload,
  onRemove,
  onRemoveAll,
  sx,
  ...other
}: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, acceptedFiles } = useDropzone({
    multiple,
    disabled,
    ...other,
  });
  const [fileList, setFiles] = useState<string[]>([]);
  const [metadata, setMetadata] = useState<any>({
    lat: "N/A",
    lng: "N/A",
  });

  const extractMetaData = async (file: File) => {
    const tags = await ExifReader.load(file, { expanded: true });
    const imageData = tags;
    return imageData;
  };

  useEffect(() => {
    let file = acceptedFiles[0];
    if (!file) return;

    getUploadUrlApi({
      user_id: 1,
      site_id: "312",
      content_type: file.type,
      file_name: file.name,
      file_size: file.size,
      id: 0,
      type: FileType.UserAvatar,
    }).then(async (res) => {
      fileUploadApi(res.data.content.presignedUrl, file).then(async () => {
        setFiles([res.data.content.fileUrl]);
        // extractMetaData(file).then((metadata) => {
        //     setMetadata({
        //       lat: metadata.exif?.GPSLatitude?.description || "N/A",
        //       lng: metadata.exif?.GPSLongitude?.description || "N/A",
        //     });
        // });
      });

      const metadata_temp = await extractMetaData(file);

      handleFileChange({
        url: res.data.content.fileUrl,
        lat: metadata_temp.exif?.GPSLatitude?.description || "N/A",
        lng: metadata_temp.exif?.GPSLongitude?.description || "N/A",
      });

      setForceUpdate && setForceUpdate(new Date().getTime().toString());
    });
  }, [acceptedFiles]);
  const hasFile = !!file && !multiple;

  const hasFiles = !!files && multiple && !!files.length;

  const hasError = isDragReject || !!error;

  const renderPlaceholder = (
    <Stack spacing={3} alignItems="center" justifyContent="center" flexWrap="wrap">
      <UploadIllustration sx={{ width: 1, maxWidth: 200 }} />
      <Stack spacing={1} sx={{ textAlign: "center" }}>
        <Typography variant="h6">Drop or Select file</Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Drop files here or click
          <Box
            component="span"
            sx={{
              mx: 0.5,
              color: "primary.main",
              textDecoration: "underline",
            }}>
            browse
          </Box>
          thorough your machine
        </Typography>
      </Stack>
    </Stack>
  );

  const renderSinglePreview = <SingleFilePreview imgUrl={typeof file === "string" ? file : file?.preview} />;

  const removeSinglePreview = hasFile && onDelete && (
    <IconButton
      size="small"
      onClick={onDelete}
      sx={{
        top: 16,
        right: 16,
        zIndex: 9,
        position: "absolute",
        color: (theme) => alpha(theme.palette.common.white, 0.8),
        bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
        "&:hover": {
          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
        },
      }}>
      {/* <Iconify icon="mingcute:close-line" width={18} /> */}
    </IconButton>
  );

  const renderMultiPreview = hasFiles && (
    <>
      <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
        {onRemoveAll && (
          <Button color="inherit" variant="outlined" size="small" onClick={onRemoveAll}>
            Remove All
          </Button>
        )}

        {onUpload && (
          <Button size="small" variant="contained" onClick={onUpload} startIcon={<Iconify icon="eva:cloud-upload-fill" />}>
            Upload
          </Button>
        )}
      </Stack>
    </>
  );

  return (
    <Box sx={{ width: 1, position: "relative", ...sx }}>
      <Box
        {...getRootProps()}
        sx={{
          p: 5,
          outline: "none",
          borderRadius: 1,
          cursor: "pointer",
          overflow: "hidden",
          position: "relative",
          height: 280,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
          border: (theme) => `1px dashed ${alpha(theme.palette.grey[500], 0.2)}`,
          transition: (theme) => theme.transitions.create(["opacity", "padding"]),
          "&:hover": {
            opacity: 0.72,
          },
          ...(isDragActive && {
            opacity: 0.72,
          }),
          ...(disabled && {
            opacity: 0.48,
            pointerEvents: "none",
          }),
          ...(hasError && {
            color: "error.main",
            borderColor: "error.main",
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
          }),
          ...(hasFile && {
            padding: "24% 0",
          }),
        }}>
        <input {...getInputProps()} />
        {fileList.length
          ? fileList.map((item) => {
              return <SingleFilePreview imgUrl={item}></SingleFilePreview>;
            })
          : renderPlaceholder}
      </Box>

      {removeSinglePreview}

      {helperText && helperText}

      {/* <RejectionFiles fileRejections={fileRejections} /> */}

      {renderMultiPreview}
    </Box>
  );
}
