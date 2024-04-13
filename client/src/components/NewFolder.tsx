/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addFolderMutation } from "../graphql/mutations/folder";
import { AuthContext } from "../context/AuthProvider";

type Props = {
  refetch: () => any;
};

function NewFolder({ refetch }: Props) {
  const {
    user: { uid },
  } = useContext(AuthContext);

  const [newFolderName, setNewFolderName] = useState<string>();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [addFolder] = useMutation(addFolderMutation);

  const handleOpenPopup = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewFolderName("");
    navigate(-1);
  };

  const handleNewFolderNameChange = (e: any) => {
    setNewFolderName(e.target.value);
  };

  const handleAddNewFolder = async () => {
    await addFolder({
      variables: {
        name: newFolderName,
        uid: uid,
      },
    });
    handleClose();
    refetch();
  };

  return (
    <div>
      <Tooltip title="Add Folder" onClick={handleOpenPopup}>
        <IconButton size="small">
          <Button variant="contained">add</Button>
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Folder Name"
            fullWidth
            size="small"
            variant="standard"
            sx={{ width: "400px" }}
            autoComplete="off"
            value={newFolderName}
            onChange={handleNewFolderNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddNewFolder}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewFolder;
