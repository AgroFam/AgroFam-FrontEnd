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
  MenuItem,
  Backdrop,
  LinearProgress
} from '@material-ui/core';
import {
  Clear,
  ClosedCaption,
  Language,
  PostAddRounded,
  Public,
  Subtitles,
  TranslateRounded
} from '@material-ui/icons';
import { createPost } from '../../actions/posts';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './Styles';
import LoginImg from '../../images/Login.svg';
import placeholderImg from '../../images/PlaceholderImg.png';
import { stateToHTML } from 'draft-js-export-html';
import { useEffect } from 'react';

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
  const { isLoading, progress } = useSelector((state) => state.posts);
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  const [postError, setPostError] = useState({
    title: false,
    message: false,
    tags: false,
    selectedFile: false
  });
  const [save, setSave] = useState('✅ Saved');
  const localEditorState = localStorage.getItem('editorState');
  const user = JSON.parse(localStorage.getItem('profile'));
  const fileUploadRef = useRef();
  // const textEditorRef = useRef();

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
    handleSaveText();
  };

  const handleSaveText = () => {
    setSave('⏳ Saving..');
    setTimeout(() => {
      setSave('✅ Saved');
    }, 2000);
  };

  // mui rte handleChange
  const handleEditorChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    // const rawData = convertToRaw(contentState);
    setPostData({ ...postData, message: stateToHTML(contentState) });
    setPostError({ ...postError, message: false });
  };

  // Clear form
  const clear = () => {
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    localStorage.setItem('editorState', '');
  };

  //Form Submit
  const handleSubmit = async () => {
    if (postData.message.length <= 200) setPostError({ ...postError, message: true });

    if (!postData.tags) setPostError({ ...postError, tags: true });

    if (!postData.title) setPostError({ ...postError, title: true });

    if (!postData.selectedFile) setPostError({ ...postError, selectedFile: true });

    if (
      postData.title &&
      postData.message.length >= 200 &&
      postData.tags &&
      postData.selectedFile
    ) {
      dispatch(
        createPost(
          { ...postData, name: user?.result?.name, creatorImg: user?.result.picture },
          navigate,
          clear
        )
      );
    }
  };

  useEffect(() => {
    var counter = 0;

    // Start the changing images
    setInterval(function () {
      if (counter === 5) {
        counter = 0;
      }
      changeImage(counter);
      counter++;
    }, 3000);
  }, []);

  const [placeHolderIcon, setPlaceHolderIcon] = useState(<TranslateRounded />);
  const changeImage = (counter) => {
    var images = [<Language />, <ClosedCaption />, <Public />, <Subtitles />, <TranslateRounded />];
    setPlaceHolderIcon(images[counter]);
  };

  const NotLoggedInComponent = () => {
    return (
      <div className={classes.NotLoggedInComponent} elevation={0}>
        <img className={classes.loginImg} src={LoginImg} alt="Login" />
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
            endIcon={<PostAddRounded />}
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
          <Backdrop
            style={{ zIndex: 1000, backdropFilter: 'blur(10px)' }}
            className={classes.backdrop}
            open={isLoading}>
            <div className={classes.loaderContainer}>
              <div className={classes.loader}>
                <div className={classes.loaderImage}>{placeHolderIcon}</div>
                  <span>
                    <Typography variant='body1'>Translating...</Typography>
                  </span>
              </div>
                <div className={classes.linearProgressContainer}>
                  <Typography style={{ color: '#b4b1b1' }} variant='caption'>Do not hit Back or Refresh the page</Typography>
                  <LinearProgress variant="determinate" value={progress}/>
                </div>
            </div>
          </Backdrop>
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
              <Typography color="error">
                {' '}
                Please Write Something to post... <span role="img">👇</span>{' '}
              </Typography>
            ) : (
              ''
            )}
            <MUIRichTextEditor
              defaultValue={localEditorState}
              controls={[
                'title',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'undo',
                'redo',
                'link',
                'numberList',
                'bulletList',
                'save'
              ]}
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
