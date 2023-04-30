import React, { useEffect } from 'react';
import { Divider, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getArticlesFromSearch } from '../../redux/actions/posts';
import useStyles from './styles';
import { Skeleton } from '@material-ui/lab';
import { useLocation } from 'react-router-dom';
import agroFamLogo from '../../images/agroFamLogo.png';
import { getQueryParams } from '../../utils/utils';


const News = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const searchQuery = getQueryParams('searchQuery');
  const tagsQuery = getQueryParams('tags');
  const { articles, isLoadingNews } = useSelector((state) => state.posts);
  const language = useSelector((state) => state.settings.language).toLowerCase();
  
  const queriesByLanguage = {
    english: [
      `Agriculture News In India`,
      `india agri news`,
      `agri news india`,
      `agri news`,
      `agriculture news`,
      `agriculture news india`,
      `agriculture news`,
      `agri news`,
      `todays agriculture news`,
      `latest news on agriculture`,
    ],
    hindi: [
      `भारत में कृषि समाचार`,
      `कृषि समाचार भारत`,
      `भारत में नवीनतम कृषि समाचार`,
      `भारतीय कृषि समाचार आज`,
      `भारत में शीर्ष कृषि समाचार`,
      `भारत कृषि समाचार`,
      `भारत में कृषि समाचार अपडेट`,
      `भारत कृषि व्यवसाय समाचार`,
      `भारतीय कृषि के समाचार`,
      `भारत में नई कृषि नीतियां`,
    ],
    marathi: [
      "भारतातील शेतीवरील बातम्या",
      "महाराष्ट्र शेतीवरील बातम्या",
      "शेती समाचार मराठीत",
      "शेती बातम्या",
      "भारतातील शेती समाचार",
      "शेती बातम्या लेटेस्ट",
      "मराठी शेती समाचार",
      "शेतीची बातम्या",
      "आजच्या शेती समाचार",
      "शेती समाचार ताज्या",
    ],
    punjabi: [
      "ਭਾਰਤੀ ਖੇਤੀ ਦੀਆਂ ਖਬਰਾਂ ਪੰਜਾਬੀ ਵਿੱਚ",
      "ਖੇਤੀ ਖਬਰਾਂ ਭਾਰਤ ਵਿੱਚ",
      "ਭਾਰਤ ਦੀਆਂ ਖੇਤੀ ਦੀਆਂ ਤਾਜ਼ਾ ਖਬਰਾਂ",
      "ਪੰਜਾਬ ਵਿੱਚ ਕਿਸਾਨ ਖੇਤੀ ਨਾਲ ਸਬੰਧਿਤ ਖਬਰਾਂ",
      "ਖੇਤੀ ਦੀਆਂ ਵਿਸਤਾਰਾਂ ਦੇ ਬਾਰੇ ਖਬਰਾਂ",
      "ਖੇਤੀ ਦੀਆਂ ਤਾਜ਼ਾ ਖਬਰਾਂ ਪੰਜਾਬੀ ਭਾਸ਼ਾ ਵਿੱਚ",
      "ਪੰਜਾਬ ਦੀਆਂ ਖੇਤੀ ਦੀਆਂ ਖਬਰਾਂ ਅਤੇ ਅਨੁਸਾਰਾਂ",
      "ਖੇਤੀ ਤੇ ਕਿਸਾਨ ਨਾਲ ਸੰਬੰਧਿਤ ਪੰਜਾਬੀ ਵਿੱਚ ਖਬਰਾਂ",
      "ਖੇਤੀ ਖਬਰਾਂ ਦੇ ਹਾਲ ਪੰਜਾਬ ਵਿੱਚ ਜਾਣੋ",
    ],
    gujarati: [
      "કૃષિ સમાચાર ગુજરાતી",  
      "ગુજરાત ખેતી સમાચાર",  
      "ગુજરાત કૃષિ સમાચાર",  
      "ખેતી સમાચાર ગુજરાતી",  
      "કૃષિ સમાચારની છડી",  
      "અમદાવાદ કૃષિ સમાચાર",  
      "ગુજરાતીમાં ખેતી સમાચાર",  
      "કૃષિ સમાચાર ગુજરાતીમાં",  
      "તાજી ખેતી સમાચાર ગુજરાતીમાં",  
      "કૃષિ સમાચાર હિંદીમાં",
    ],
    tamil: [  
      "தமிழகத்தின் வேளாண்மை செய்திகள்",  
      "தமிழ்நாட்டில் புதிய வேளாண்மை செய்திகள்",  
      "தமிழ்நாட்டில் வேளாண்மை செய்திகள்",  
      "வேளாண்மை செய்திகள்",  
      "வேளாண்மை செய்திகள் தமிழ்",  
      "தமிழகத்தின் தொழில்நுட்ப செய்திகள்",  
      "செய்திகள் தமிழ்",  
      "இந்தியாவின் வேளாண்மை செய்திகள்",  
      "இந்தியாவின் தொழில்நுட்ப செய்திகள்",  
      "நாடுகளின் வேளாண்மை செய்திகள்",
    ],
    telugu: [
      'తెలంగాణలో వరసాతిపోతున్న పశువుల సంఖ్యకు సంబంధించిన వార్తలు',
      'తెలంగాణలో వరసాతిపోతున్న పరిస్థితికి సంబంధించిన వార్తలు',
      'తెలంగాణ రైతుల సంఘం ప్రకటన',
      'తెలంగాణలో ఎండరుకున్న సమస్యలకు సంబంధించిన వార్తలు',
      'తెలంగాణ ప్రభుత్వ వార్తలు',
      'తెలంగాణలో పంటల సంబంధించిన వార్తలు',
      'తెలంగాణలో వ్యాపార వార్తలు',
      'తెలంగాణ పార్టీల ప్రకటనలు',
      'తెలంగాణలో వ్యాపార కేంద్రాల సమాచారం',
      'తెలంగాణలో మాజీ అధికారుల ప్రకటనలు',
    ],
    kannada: [
      "ಕರ್ನಾಟಕದ ಸುದ್ದಿಗಳು",
      "ಕರ್ನಾಟಕದ ಕೃಷಿ ಸುದ್ದಿಗಳು",
      "ಕರ್ನಾಟಕದ ತಾಜಾ ಸುದ್ದಿಗಳು",
      "ತಾಜಾ ಸುದ್ದಿಗಳು",
      "ಕರ್ನಾಟಕದ ತಾಜಾ ಕೃಷಿ ಸುದ್ದಿಗಳು",
      "ಕರ್ನಾಟಕದ ಕೃಷಿ ತಾಜಾ ಸುದ್ದಿಗಳು",
      "ಕರ್ನಾಟಕದ ನ್ಯೂಸ್",
      "ಕರ್ನಾಟಕದ ತಾಜಾ ಸ",
    ],
    malayalam: [
      "കൃഷി വാർത്തകൾ മലയാളത്തിൽ",
      "ഭാരതത്തിലെ കൃഷി വാർത്തകൾ മലയാളത്തിൽ",
      "കേരളത്തിലെ കൃഷി വാർത്തകൾ മലയാളത്തിൽ",
      "കൃഷി ന്യൂസ് മലയാളത്തിൽ",
      "കൃഷി സമാചാരം മലയാളത്തിൽ",
      "ഇന്ത്യയിലെ കൃഷി വാർത്തകൾ മലയാളത്തിൽ",
      "കൃഷി വാർത്തകൾ മലയാളത്തിൽ ഇന്ന്",
      "കൃഷി വാർത്തകൾ മലയാളത്തിൽ ഇന്നത്തെ വാർത്തകൾ",
      "കൃഷി ന്യൂസ് മലയാളത്തിൽ ഇന്ന്",
      "നവീനതാ കൃഷി വാർത്തകൾ മലയാളത്തിൽ",
    ],
    bengali: [
      "ভারতে কৃষি সংবাদ",
      "বাংলাদেশে কৃষি সংবাদ",
      "কৃষি সংবাদ বাংলা",
      "বাংলাদেশে শেষ কৃষি সংবাদ",
      "কৃষি সংবাদ ভারতে",
      "আজকের কৃষি সংবাদ",
      "কৃষি খবর বাংলাদেশে",
      "কৃষি সংবাদ তাজা",
      "কৃষি সংবাদ শেষ",
      "কৃষি খবর আজকে",
    ],
  };

  const queries = queriesByLanguage[language];
  const randomQuery = queries[Math.floor(Math.random() * queries.length)];

  useEffect(() => {
    !tagsQuery && !searchQuery && dispatch(getArticlesFromSearch(randomQuery));
  }, []);

  const NewsLoading = () => (
    <>
      <div className={classes.newsCard}>
        <div className={classes.newsContent}>
          <Skeleton animation="wave" variant="circle" width={28} height={28} />
          <Skeleton animation="wave" variant="rect" width={300} height={30} />
        </div>
        <Skeleton animation="wave" variant="text" />
      </div>
      <Divider />
    </>
  );

  const NewsList = () =>
    articles.length === 0 ? (
      <div>No News Found</div>
    ) : (
      articles.map((newsItem, i) => (
        <div key={i}>
          <div className={classes.newsCard}>
            <div className={classes.newsContent}>
              <img src={newsItem.image_url || agroFamLogo} alt="news-source favicon" />
              <a href={newsItem.link} target="_blank">
                <h3>{newsItem.title}</h3>
              </a>
            </div>
            <a href={newsItem.link} target="_blank">
              {newsItem.link.substring(0, 40)}...
            </a>
          </div>
          <Divider />
        </div>
      ))
    );

  return (
    <>
      {tagsQuery || searchQuery ? (
        <Typography variant="h5">🔍 Results From Web</Typography>
      ) : (
        <Typography variant="h5">📰 Latest News</Typography>
      )}
      <div className={classes.newsContainer}>
        {isLoadingNews ? (
          <>
            <NewsLoading />
            <NewsLoading />
            <NewsLoading />
            <NewsLoading />
            <NewsLoading />
          </>
        ) : (
          <NewsList />
        )}
      </div>
    </>
  );
};

export default News;
