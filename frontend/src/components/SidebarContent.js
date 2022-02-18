import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Toolbar, Divider, Button, CircularProgress } from "@mui/material";
import Logout from "./auth/Logout";
import AddIcon from "@mui/icons-material/Add";
import { getAllPages } from "../api/getAllPages";
import Center from "./utils/Center";
import { newPage } from "../api/newPage";
import { useNavigate, useLocation } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deletePage } from "../api/deletePage";

const SidebarContent = () => {
  const location = useLocation();
  let navigate = useNavigate();

  const [pagesData, setPagesData] = useState();
  const [selectedPageId, setSelectedPageId] = useState(
    location.hash.substring(1)
  );

  async function getData() {
    const data = await getAllPages();
    setPagesData(data);
  }

  useEffect(() => {
    getData();
  }, []);

  const selectPage = (pageId) => {
    navigate(`#${pageId}`);
    setSelectedPageId(pageId);
  };

  const onPressAdd = async () => {
    const newPageData = await newPage();
    setPagesData((prev) => [
      ...prev,
      {
        createdAt: newPageData.createdAt,
        title: newPageData.title,
        updatedAt: newPageData.updatedAt,
        _id: newPageData._id,
      },
    ]);
    selectPage(newPageData._id);
  };

  const onPressDelete = async (removeId) => {
    await deletePage(removeId);
    setPagesData((pages) => pages.filter((page) => page._id !== removeId));
    navigate(`#`);
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <div>
        <Toolbar />
        <Divider />
        <List>
          <ListItem>
            <Button
              color="success"
              endIcon={<AddIcon />}
              fullWidth={true}
              variant={"outlined"}
              onClick={onPressAdd}
            >
              Add
            </Button>
          </ListItem>

          {pagesData ? (
            pagesData.map((data, index) => (
              <ListItem
                button
                key={data._id}
                selected={data._id === selectedPageId}
              >
                <ListItemText
                  primary={data.title}
                  onClick={() => selectPage(data._id)}
                />
                <DeleteOutlineIcon onClick={() => onPressDelete(data._id)} />
              </ListItem>
            ))
          ) : (
            <Center height={20}>
              <CircularProgress />
            </Center>
          )}
        </List>
      </div>
      <List style={{ bottom: 0 }}>
        <ListItem>
          <Logout />
        </ListItem>
      </List>
    </div>
  );
};

export default SidebarContent;
