import React, { useState, useEffect } from "react";
import { TextField, Box, CircularProgress, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import Center from "../components/utils/Center";
import { getPage } from "../api/getPage";
import { updateTitle, updateContent } from "../api/updatePage";

const PageContent = () => {
  const [pageData, setPageData] = useState();
  const [noneSelected, setNoneSelected] = useState(false);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const location = useLocation();

  const getPageData = async () => {
    const data = await getPage(location.hash.substring(1));
    if (data === null) {
      setNoneSelected(true);
    } else {
      setPageData(data);

      setTitle(data.title);
      setContent(data.content);

      setNoneSelected(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getPageData();
    setLoading(false);
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTitleChange = async (e) => {
    setTitle(e.target.value);
    await updateTitle(location.hash.substring(1), e.target.value, content);
  };

  const handleContentChange = async (e) => {
    setContent(e.target.value);
    await updateContent(location.hash.substring(1), e.target.value, content);
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
