import MUIRichTextEditor from 'mui-rte';
import React, { useRef, useState } from 'react';
import { stateToHTML } from "draft-js-export-html";
import { Button, Container, Paper, Switch, TextField, Typography } from '@material-ui/core';
import useStyles from './Styles';
import { convertFromRaw } from 'draft-js';
import LoginImg from '../../images/Login.svg'
import { useNavigate } from 'react-router-dom';

const Write = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  const [htmlContent, setHtmlContent] = useState(null);
  const [editorState, setEditorState] = useState(localStorage.getItem('editorState'));
  const user = JSON.parse(localStorage.getItem('profile'));
  const fileUploadRef = useRef();

  //Function to convert file into base64 string
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  //Function to handle file read
  const handleFileRead = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setPostData({ ...postData, selectedFile: base64 });
  };

  const handleSave = (data) => {
    console.log("saved", data);
    localStorage.setItem('editorState', data)
    // const contentState = convertFromRaw(data);
    // const html = stateToHTML(contentState);
    // console.log(html);
  };

  const handleChange = (editorState) => {
    setHtmlContent(stateToHTML(editorState.getCurrentContent()));
  };

  const NotLoggedInComponent = () => {
    return (
      <div className={classes.NotLoggedInComponent} elevation={0}>
        <img className={classes.loginImg} src={LoginImg}/>
        <Typography variant="h6" align="center" style={{ padding: '0.5em' }}>
          Please Sign in to Write new Blog.
        </Typography>
        <Button
        variant='contained'
        color='primary'
        disableElevation
        onClick={() => navigate('/auth')}
      >
        Login
      </Button>
      </div>
    );
  }
  return (
    <Container className={classes.container} maxWidth="xl">
      {!user?.result?.name ? <NotLoggedInComponent /> :
        <>
          <Typography variant='h4'color='secondary' className={classes.header}> Write something..</Typography>
          <Paper className={classes.paper} elevation={0}>
          <TextField variant="outlined" multiline label="Title" />
          <MUIRichTextEditor
            defaultValue={editorState}
            controls={["title", "bold", "italic", "underline", "strikethrough", "undo", "redo", "link", "numberList", "bulletList", "save"]}
            toolbarButtonSize='medium'
            label="Start typing..."
            inlineToolbar={true}
            draftEditorProps={{ spellCheck: true }}
            onSave={handleSave}
            onChange={handleChange}
          />
          </Paper>
        </>
      }
    </Container>
  )
}

export default Write;