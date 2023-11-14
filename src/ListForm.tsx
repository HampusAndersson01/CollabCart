import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { database } from "./firebase";
import { ref, push } from "firebase/database";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ShareIcon from "@mui/icons-material/Share";

const ListForm: React.FC = () => {
  const [item, setItem] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const navigate = useNavigate();
  const { listId } = useParams<{ listId?: string }>();

  const handleAddItem = async () => {
    if (!item) {
      return;
    }

    if (listId) {
      // If a list ID is present in the URL, add the item to that list
      const listRef = ref(database, `lists/${listId}`);
      await push(listRef, { item });
    } else {
      // If no list ID is present, create a new list and add the item
      const listsRef = ref(database, "lists");
      const newListRef = push(listsRef);
      await push(newListRef, { item });

      // Redirect to the new list ID
      navigate(`/list/${newListRef.key}`);
    }

    // Clear the input field after adding the item
    setItem("");
  };

  const handleCreateNewList = async () => {
    const listsRef = ref(database, "lists");
    const newListRef = push(listsRef);
    // Redirect to the new list ID
    navigate(`/list/${newListRef.key}`);
  };

  const handleShare = async () => {
    if (navigator.clipboard) {
      const currentURL = window.location.href;
      await navigator.clipboard.writeText(currentURL);
      setCopied(true);
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.shareButtonContainer}>
          <Button
            style={styles.shareButton}
            variant="text"
            onClick={handleShare}
            startIcon={<ShareIcon />}
          >
            Share
          </Button>
          {copied && (
            <div style={styles.copiedMessage}>Copied to Clipboard!</div>
          )}
        </div>
        <div style={styles.createNewListContainer}>
          <Button
            style={styles.createNewListButton}
            variant="text"
            onClick={handleCreateNewList}
            startIcon={<PlaylistAddIcon />}
          >
            Create New List
          </Button>
        </div>
      </header>
      <TextField
        style={styles.input}
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        label="Add item..."
        variant="outlined"
        onKeyPress={handleKeyPress}
      />

      <div style={styles.buttonContainer}>
        <Button
          style={styles.addButton}
          variant="contained"
          onClick={handleAddItem}
          startIcon={<AddIcon />}
        >
          Add Item
        </Button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    position: "relative",
  },
  input: {
    marginBottom: "10px",
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  shareButtonContainer: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "10px",
    position: "relative",
  },
  shareButton: {
    marginRight: "10px",
  },
  addButton: {
    margin: "10px 0",
    width: "100%",
  },
  createNewListContainer: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginBottom: "10px",
    position: "relative",
  },
  createNewListButton: {
    marginLeft: "10px",
  },
  copiedMessage: {
    position: "absolute",
    top: "0",
    left: "0",
    background: "#000",
    color: "#fff",
    padding: "5px",
    borderRadius: "5px",
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
};

export default ListForm;
