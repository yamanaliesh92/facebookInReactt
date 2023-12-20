import { Modal } from "@mantine/core";
import { FC } from "react";
import PostShare from "../postShare/postShare";
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ShareModels: FC<Props> = ({ setOpen, open }) => {
  return (
    <>
      <Modal size="70%" opened={open} onClose={() => setOpen(false)}>
        <PostShare />
      </Modal>
    </>
  );
};
export default ShareModels;
