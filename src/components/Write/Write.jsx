import MUIRichTextEditor from 'mui-rte';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Card,
  CardActionArea,
  MenuItem
} from '@material-ui/core';
import { Clear, PostAdd } from '@material-ui/icons';
import { createPost, updatePost } from '../../actions/posts';
import { useDispatch } from 'react-redux';
import useStyles from './Styles';
import { convertToRaw } from 'draft-js';
import LoginImg from '../../images/Login.svg';
import placeholderImg from '../../images/PlaceholderImg.png';
import { stateToHTML } from 'draft-js-export-html';

const categories = [
  {
    value: 'Agriculture',
    label: 'Agriculture'
  },
  {
    value: 'Fertilizers',
    label: 'Fertilizers'
  },
  {
    value: 'Crop',
    label: 'Crop'
  },
  {
    value: 'Technology',
    label: 'Technology'
  },
  {
    value: 'Other',
    label: 'Other'
  }
];

const Write = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  const [postError, setPostError] = useState({
    title: false,
    message: false,
    tags: false,
    selectedFile: false
  });
  const [save, setSave] = useState('Saved');
  const editorState = localStorage.getItem('editorState');
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

  // mui rte Save
  const handleSave = (data) => {
    localStorage.setItem('editorState', data);
  };

  const handleSaveText = () => {
    setTimeout(() => {
      setSave('Saved');
    }, 2000);
  };

  // mui rte handleChange
  const handleEditorChange = (editorState) => {
    setSave('Saving..');
    const contentState = editorState.getCurrentContent();
    const rawData = convertToRaw(contentState);
    // localStorage.setItem('editorState', JSON.stringify(rawData));
    setPostData({ ...postData, message: stateToHTML(contentState) });
    handleSaveText();
    setPostError({ ...postError, message: false });
  };

  // Clear form
  const clear = () => {
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    localStorage.setItem('editorState', '');
  };

  //Form Submit
  const handleSubmit = async () => {
    if (postData.message.length <= 11) setPostError({ ...postError, message: true });

    if (!postData.tags) setPostError({ ...postError, tags: true });

    if (!postData.title) setPostError({ ...postError, title: true });
    
    if (!postData.selectedFile) setPostError({ ...postError, selectedFile: true });
    
    if (postData.title && postData.message && postData.tags && postData.selectedFile) {
      console.log(postData.message);
      dispatch(createPost(
        { ...postData, name: user?.result?.name, creatorImg: user?.result.picture },
        navigate
      ));
      clear();
    }
  };

  const NotLoggedInComponent = () => {
    return (
      <div className={classes.NotLoggedInComponent} elevation={0}>
        <img className={classes.loginImg} src={LoginImg} alt="Login image" />
        <Typography variant="h6" align="center" style={{ padding: '0.5em' }}>
          Please Sign in to Write new Blog.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => navigate('/auth')}>
          Login
        </Button>
      </div>
    );
  };

  const HeaderComponent = () => (
    <div className={classes.header}>
      <div className={classes.headerTitle}>
        <Typography variant="h5">Draft By {user?.result?.name.split(' ')[0]} </Typography>
        <Typography varialnt="subtitle">{save}</Typography>
      </div>
      <div className={classes.buttonGroup}>
        <div>
          <Button
            variant="outlined"
            color="secondary"
            onClick={clear}
            disableElevation
            startIcon={<Clear />}>
            Clear
          </Button>
        </div>
        <div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            disableElevation
            endIcon={<PostAdd />}
            onClick={handleSubmit}>
            Publish
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Container className={classes.container} maxWidth="xl">
      {!user?.result?.name ? (
        <NotLoggedInComponent />
      ) : (
        <>
          <HeaderComponent />
          <Paper className={classes.paper} elevation={0}>
            <Card
              className={postError.selectedFile ? classes.fileInputError : classes.fileInputNormal}
              elevation={0}>
              <CardActionArea>
                <input
                  hidden
                  ref={fileUploadRef}
                  id="originalFileName"
                  type="file"
                  accept="image/*"
                  required
                  label="Document"
                  name="originalFileName"
                  onChange={(e) => {
                    handleFileRead(e);
                    setPostError({ ...postError, selectedFile: false });
                  }}
                />
                <img
                  onClick={() => fileUploadRef.current.click()}
                  className={classes.selectedFile}
                  alt="placeholder-img"
                  src={postData?.selectedFile || placeholderImg}
                />
              </CardActionArea>
            </Card>
            {postError.selectedFile ? (
              <Typography color="error"> Please Select a Image for the Article </Typography>
            ) : (
              ''
            )}
            <TextField
              error={postError.title}
              name="title"
              variant="outlined"
              label="Title"
              multiline
              helperText={postError.title ? 'Please Enter a Title for your Article' : ''}
              value={postData.title}
              onChange={(e) => {
                setPostData({ ...postData, title: e.target.value });
                setPostError({ ...postError, title: false });
              }}
            />
            <TextField
              id="outlined-select-currency"
              select
              error={postError.tags}
              label="Category"
              value={postData.tags}
              onChange={(e) => {
                setPostData({ ...postData, tags: e.target.value });
                setPostError({ ...postError, tags: false });
              }}
              helperText={postError.tags ? 'Please Select a Category for your Article' : ''}
              variant="outlined">
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {postError.message ? (
              <Typography color="error"> Please Write Something to post... 👇 </Typography>
            ) : (
              ''
            )}
            <MUIRichTextEditor
              defaultValue={editorState}
              controls={[
                'title',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'undo',
                'redo',
                // 'code',
                'link',
                'numberList',
                'bulletList',
                'save'
              ]}
              // toolbarButtonSize="medium"
              label="Start typing..."
              inlineToolbar={true}
              draftEditorProps={{ spellCheck: true }}
              onSave={handleSave}
              onChange={handleEditorChange}
            />
          </Paper>
        </>
      )}
    </Container>
  );
};

export default Write;