import { toast } from "react-toastify";

export const checkMimeType = (event, mimeTypes) => {
  //getting file object
  let file = event.target.files[0];
  //define message container
  let err = "";
  // list allow mime type
  const types = mimeTypes;
  // compare file type find doesn't matach
  if (types.every((type) => file.type !== type)) {
    // create error message and assign to container
    err += file.type + " is not a supported format\n";
  }

  if (err !== "") {
    // if message not same old that mean has error
    event.target.value = null; // discard selected file
    toast.error(err);
    return false;
  }
  return true;
};

export const checkFileSize = (event, fileSize) => {
  let file = event.target.files[0];
  let size = fileSize;
  let err = "";
  if (file.size > size) {
    err += file.type + " is too large, please pick a smaller file\n";
  }

  if (err !== "") {
    event.target.value = null;
    toast.error(err);
    return false;
  }

  return true;
};
