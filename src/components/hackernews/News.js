import React, { useEffect, useState } from "react";

import axios from "axios";

import {
  CircularProgress,
  Grid,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import { StyledButton, StyledGrid } from "./muiNewsStyles";

const News = () => {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("react");
  const [url, setUrl] = useState(
    `https://hn.algolia.com/api/v1/search?query=react`
  );

  const showLoading = () => {
    return loading ? <CircularProgress /> : null;
  };

  const fetchNews = () => {
    setLoading(true);
    axios
      .get(url)
      .then((result) => {
        console.log("res: ", result.data.hits);
        setNews(result.data.hits);
        setLoading(false);
      })
      .catch((error) => console.log("fetchNews,Error:", error));
  };
  useEffect(() => {
    fetchNews();
  }, [url]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`);
  };
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const searchForm = () => {
    return (
      <StyledGrid item xs={12}>
        <form style={{ display: "flex" }} onSubmit={handleSubmit}>
          <TextField type="text" value={searchQuery} onChange={handleChange} />
          <StyledButton type="submit" variant="contained">
            Search
          </StyledButton>
        </form>
      </StyledGrid>
    );
  };

  const showNews = () => {
    return news.map((news, i) => (
      <>
        <Typography key={i} variant="h4" component="p">
          {news.title}
        </Typography>
        <Typography key={i} component="p">
          <a href={news.url}>Read More</a>
        </Typography>
      </>
    ));
  };
  return (
    <>
      <Container component="main" maxWidth="lg">
        <Grid item xs={12} align="center">
          <Typography component="h2" variant="h2">
            News
          </Typography>
        </Grid>
        {searchForm()}
        {showLoading()}
        <Grid item xs={12}>
          {showNews()}
        </Grid>
      </Container>
    </>
  );
};

export default News;
