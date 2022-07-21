import React, { useState, useEffect } from "react";
import {
  TextField,
  Box,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import Center from "../components/utils/Center";
import { getPage } from "../api/getPage";
import { updateTitle, updateContent } from "../api/updatePage";

const PageContent = () => {
  const [pageData, setPageData] = useState();
  const [noneSelected, setNoneSelected] = useState(false);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [prevTitle, setPrevTitle] = useState("");
  const [content, setContent] = useState("");
  const [prevContent, setPrevContent] = useState("");

  const location = useLocation();

  const getPageData = async () => {
    const data = await getPage(location.hash.substring(1));
    if (data === null) {
      setNoneSelected(true);
      setPageData(undefined);
    } else {
      setPageData(data);

      setTitle(data.title);
      setPrevTitle(data.title);
      setContent(data.content);
      setPrevContent(data.content);

      setNoneSelected(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getPageData();
    setLoading(false);
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTitleChange = async (e) => {
    setPrevTitle(title);
    setTitle(e.target.value);
    // await updateTitle(location.hash.substring(1), e.target.value);
  };

  const handleContentChange = async (e) => {
    setPrevContent(content);
    setContent(e.target.value);
    // await updateContent(location.hash.substring(1), e.target.value);
  };

  const postData = async () => {
    if (title !== prevTitle) {
      await updateTitle(location.hash.substring(1), title);
    }
    if (content !== prevContent) {
      await updateContent(location.hash.substring(1), content);
    }
  };

  document.onkeydown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      postData();
    }
  };

  return (
    <div>
      {/* loading indicator while data is being fetched */}
      {loading && (
        <Center height={50}>
          <CircularProgress />
        </Center>
      )}
      {/* page data */}
      {pageData && (
        <div>
          <TextField
            value={title}
            onChange={handleTitleChange}
            variant="standard"
            fullWidth={true}
            inputProps={{ style: { fontSize: 40 } }}
          />
          <Box sx={{ mt: 5 }}>
            <TextField
              value={content}
              onChange={handleContentChange}
              multiline
              maxRows={Infinity}
              fullWidth={true}
            />
          </Box>
          <Box sx={{ mt: 5, display: "flex", alignItems: "center" }}>
            <Button
              variant="outlined"
              color="success"
              sx={{ paddingInline: 4, paddingBlock: 1 }}
              onClick={postData}
            >
              Save
            </Button>
            <Typography sx={{ ml: 1, opacity: 0.6 }}>
              OR press{" "}
              <Typography
                variant="span"
                sx={{
                  background: "rgba(0,0,0,0.3)",
                  borderRadius: 2,
                  padding: 1,
                }}
              >
                ctrl + s
              </Typography>{" "}
              to save
            </Typography>
          </Box>
        </div>
      )}
      {/* message if no page is selected */}
      {noneSelected === true && (
        <Center height={50}>
          <Typography variant="h2" align="center">
            Select A Page
          </Typography>
        </Center>
      )}
    </div>
  );
};

export default PageContent;
