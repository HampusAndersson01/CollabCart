import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "./firebase";
import { ref, onValue, off, remove, update } from "firebase/database";
import ListForm from "./ListForm";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

interface ListItemData {
  id: string;
  item: string;
  quantity?: string;
  unit?: string;
}

const ListDisplay: React.FC = () => {
  const { listId } = useParams<{ listId: string }>();
  const [list, setList] = useState<ListItemData[]>([]);

  useEffect(() => {
    if (!listId) {
      console.error("List ID not found");
      return;
    }

    const listsRef = ref(database, `lists/${listId}`);

    const handleValue = (snapshot: any) => {
      const data = snapshot.val();

      if (data) {
        const listItems: ListItemData[] = Object.keys(data).map((id) => ({
          id,
          item: data[id].item,
          quantity: data[id].quantity,
          unit: data[id].unit,
        }));
        setList(listItems);
      } else {
        setList([]);
      }
    };

    const unsubscribe = onValue(listsRef, handleValue);

    return () => {
      off(listsRef, "value", handleValue);
    };
  }, [listId]);

  const handleRemoveItem = (itemId: string) => {
    if (listId) {
      const itemRef = ref(database, `lists/${listId}/${itemId}`);
      remove(itemRef);
    }
  };

  const handleQuantityChange = (itemId: string, newQuantity: string) => {
    if (listId) {
      const itemRef = ref(database, `lists/${listId}/${itemId}`);
      update(itemRef, { quantity: newQuantity });
    }
  };

  const handleUnitChange = (itemId: string, newUnit: string) => {
    if (listId) {
      const itemRef = ref(database, `lists/${listId}/${itemId}`);
      update(itemRef, { unit: newUnit });
    }
  };

  return (
    <div>
      <ListForm />
      <List>
        {list.map((itemData) => (
          <ListItem key={itemData.id}>
            <ListItemText primary={itemData.item} />
            <Input
              type="text"
              value={itemData.quantity || ""}
              placeholder="Qty"
              style={{ width: "50px" }} // Set a fixed width
              onChange={(e) =>
                handleQuantityChange(itemData.id, e.target.value)
              }
            />
            <Select
              value={itemData.unit || ""}
              displayEmpty
              style={{ width: "70px" }} // Set a fixed width
              onChange={(e) => handleUnitChange(itemData.id, e.target.value)}
              input={<Input />}
            >
              <MenuItem value="" disabled>
                Unit
              </MenuItem>
              <MenuItem value="g">g</MenuItem>
              <MenuItem value="pc">pc</MenuItem>
              {/* Add other units as needed */}
            </Select>
            <IconButton onClick={() => handleRemoveItem(itemData.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ListDisplay;
