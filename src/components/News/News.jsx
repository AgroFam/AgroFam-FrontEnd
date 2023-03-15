import React, { useEffect } from 'react';
import { Divider, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getArticlesFromSearch } from '../../actions/posts';
import useStyles from './styles';

const newsResults = [
  {
    image_url:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAABRElEQVR4AY2RA2IEQRREc5/oBrFt27Zt27Zt27Zt204q1mLael0fNM+kyunNJRrJK9KATpGZcZkOUSBjKEc2S9i+hiN7NJ8QgNfy2bK6RRxq+WKEAO4ETgDi6RxohACuBAEAzDEcgikCZIGt8wNYXDRRfH1/F9EVLp4uTxfEgQW2OMQVHnwDFdMdMAMfv4+LR+sh7d4QweL9kCdRFGp49q2gUaAFi3EqkKxgWOo6ubswsTNlWOolkqqOQ1whyn99KBxJ0kpQ9qqy3zidXlyqXTpow8K53gnmZY/GknB6b2osXZx1uiLr6viwWFuqrz4fh81LvYwhIhhJR6nF373RywqLheb6pjCXr6yTDuuXCBSGclIhgsjAE8SKUh5SlaVgFaTaY4NhVXK/LzBKwGh5cZQIC0w62dqAeZXTEdQzDcO+F//KC74yhy+G0TmxAAAAAElFTkSuQmCC',
    link: 'https://werindia.com/agriculture',
    title: 'Latest Agriculture News in India - WeRIndia'
  },
  {
    image_url:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFSElEQVR4AaVXA7QrSRCdtW3vhmMkgzcvz1rbtm3bNg/Xtm3byfQE37b9q96+znayk87u/jknvqm6fav6do2A188DA2sEknkNSWklIhrzg5SeJ4p1/nfZ41YSIq6im7MD0XgNcNODtD6DpI23/jT91ijskn33XYEomTMh9u+DsZPaMMh1E/F2XLuaHH78NthOWlL/IKL1FgaoSW56OwUxeW49thCTF4Radg8We4VwxfKhZL4YFRty/lLs61tHwJVHAapANXsiDTjC91crxJUxDfFxZfKE3G5rUXyo2IdxY0vm7QLIWOKBQLJvyDayhQ/4w8lcLDxC0Tqb4iH2J1x8Sh8nBGljHpdlXJkVas6Hgw8pk29KQDIDigdFpnPxMXkJKvAnf0X6u9X6Wy19zQgQ09ud4qHpXuFioSGFUM2cyw/YcjAN+N1xx60UJNViQ2xCHVHuOmJVikcy3NhK9kphSVfXilDbN6LlV2cT2ZJpwGFtbesB65+wLP/AxpRZ0Nl/jB0Y2LhKwHJ9wM+K3gX6+2THHVcZBD4DWy3QMsdDOb7G4PD6Lq68aOd2glVVfgMSQ8m/KxreBSWrdRuSNu8jSXVEIaGOIaL5UOh3JULZPoWk9V+RBCYHQiMqbqdPdG8f9IogocyAGN+HavZUXLhQf1Vs3wJZPmS/C+3cjkgCkv2IydnfiJQ5s2i6l9fggQT2FU1eg5etl8uO38l+xyVAZYet+Ac8JqESfAJUdnUCkmDL0ZTACH/f1UqmdzJYbL6UbR34LptdiZWdKkFJkNaeOMj6CNjsc0W3N4XfsbKz5fgQ5C5afm8gmj+FpnsefLdGrbdr3k6kzuEgWRFW/TMrOyWBiQGziMEvDkXj+XrZkQQ022+gSFDrmPIEotm7D+1tOFhi0txoa1Vn592O7ViyYN0vcKz1JRZb8Hu2CBLRZoRnR8Hw2sCIjNf4zmbcX03e1hvDlfPwxMkpjBHdysWm9Q8EkGgq190S2khstr8e1iNcLD5E40mKhxKW+LHVeXAW6Fy/JrDPsdPxATvk2WYEgORLVXxKG96EwHxU4A0eCE2m2qxeRxIbjocvee060y93NCnBR0JZb/HgVJofCQB7RYfDYExdn+MErGnC0OnYqtGJSLaTFoaG1z0IxC0BckxiAWiz6O24lRDD7vMQdgJVglHqbdYn8Ao058ggpRH8vm53TQ11+wCBvfK77bYWMdyzYI8HRG/ZrdzVtSqaCJoJkmBNBvHEa5ex4cDdXqKys2aFyaG8BdLVtSUeOoHh7hKm9Z8Dw7kUR7F/bcVIAm0V7RWT86yYITGGJPUAky/zWUBXjiRQiWYEhlZeokrwCbDTq5I9PMQZLq7gmP1KaLh7srKz5UCHK4rWrbDPy/AYAaW4q5jNbc3KXlMO0925AA0KFjwVfv8SFnkMjgDVub3h6JzUZrOyIwn09kh7hW4HMoSVHUnABDW94cgPB54Ap9kZ3L2qufvSgHiqkYRW4BjLMGy4vw85eye+zWcuBiMyfuePzsY71RVl3J6mTqg7u1I8lPLFJkZUQdBcHgjqNgOAL+MD5P+Rh6V3PBQPBjf134zlZS4oqf8AsneSbcXOIG2e24xAmPUvLXf3d+IDXPNLPll9PPh15kZuUDV7GpV09K67rg6dPb4hFhyONRmi2kfzD67MPUI+l1sLTOPHRqMzjmY1e1nzdsdhIsrb6+11yRVXLA+qvR6trPoHjnyDQLxVLsrWrVC3MbCdMHGFyJnL2Y5mr9D0W6F070HXz4XHPDzVYIzvisLiLX5BzlwE+NJQ7HGhaN1Fky8FfVhfLxA7JXcAAAAASUVORK5CYII=',
    link: 'https://m.bizcommunity.com/CompanyNews/100/472.html',
    title: 'Agriculture News in India - Bizcommunity'
  },
  {
    image_url:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAZlBMVEVHcEzmACLnCynmACLmACPmACPmACPmACPmACPmACHjACDmACLmABvsUGLmACPmABrmABDlAAHrN07zkp76xs3////94ub3tr7uZnP2p7H+7vH82uDpK0LsS1z6ztPwe4b/9/npETQSvJBdAAAAFXRSTlMAJUybvur/9sYgD4ujGdH///////pX1IjeAAABh0lEQVR4AW1TBwKDMAiMK7Z1ENS45/8/2QDGzuvmrmzUC0EYxYnW6S0K7+oXj8yRHkl+/6H1F7LHO1+U+gflmyJM9R+k4eX/5MEgItDrVBQnf/o3Vd1Yh7brNbxHkfwAh9F6TDNKpsTfhV9aR4yrA+tqUZCLnL/hSNZFG6OXmhSLOV3cE47fuNgVggRbnHqs6EcSqJBtZFoMVcDyjdyxi1BFHGCwdkCYh32VgK1zwdpI3dgw2b0HHPwfDaXB8WKVssBVdoCxDh36GJKEkiKtXTVUlj18CDQLxIMIDvCCgymVnEmNC4Dl1HwO/C1VsTcMiCN3UJK2K3+7qejqAye5UQpwXH2IpFHa9HbHxZl7IH6leYE0KkhEsdU4cJUGsfGudHL309bGwMqTrofxNc2c9kULoGqdAyuotcA5uFxAT6Ut09ROw4HnavuV86WuCHqeDwOfi13IPBpf5LXWj4+1l4n+rr2PQoL143CKz9MjQW9+T+/CPW9W9GzyQ3OuYXRLHRlHYfCyPgEPdSsJLTPFFAAAAABJRU5ErkJggg==',
    link: 'https://in.pinterest.com/pin/433753007838726524/',
    title: 'Latest Agriculture News in India | Farming technology ...'
  },
  {
    image_url:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACWklEQVR4AezRA4ydQRiF4bec2ubUdpzUboMyRm3bCGrbCGrbtt1F6t7a9tdvk7Uv1jvJE/7nzMn8iEicSh4Q9wN+/PiB4pt6q176e+/vo5IgKVSqSKRUKH4H63gXrPe1+qJ++MNaS0FVVHWyttoya7vvsXaql7Wr7lm7/bG1h/9Ze1qsvayuq7vqTjjuqlvqijr/zdoTmj+gtty0dsVua6dod6++1taqaG2K/NZiFQA5IOM2WPUP/gpITLsCR8tCEQBSQ4qDsEpAYpMXnMgMaWkENQT+KIltLaEe46GvgMSFmTCStbAwrgbshNWcgR1OBXPnFhk+XCR7drcHnIGD+MJppwf8/i3i6yvSqpVbAx7BFbzgplPBXLlEXr+WwLNhg0jJki4NeAbeeIG3WwP8zvv3IoMGiaRN69QABzzBG7zcHhBwrl4Vad482l3P4Rn33XuBsC/RpUu0u17CM7w8NWDpUpGCBZ39BQ684LZbAy5dEmnQQASc5oB7+MA5pwf8+iXy6ZPI0KEixoiAS57BDS7BHqeCefOKrFghUr68CLjlEpxgAyxzKpgypQh4xGHYwGQYIiBxYSFMpBXUiqsBXaAVGSHNddgf25c/h9uFIDMAFaDgLTgRW5c74FY9qACAMQZUHmNS9zem7WZj5p0zZrfDmHPPjLn7xpiHYswz9Vq9V5+i8M7/22d+Wb8O7TqvnXt3GrNkjDHtSxiTGWMwigcPHqDwVdfUDeWlHOrZgwep3jx4kF4ePMiqcqq8qkAU8vh/m0Wz6fw6HP6dN/3v8FYP/P3faM9o1AEAa00uUOyK7dUAAAAASUVORK5CYII=',
    link: 'https://m.youtube.com/playlist?list=PLLa3m0QctHstxQMKWOjpwCsI6YXT9xwvE',
    title: 'Agriculture News in India, Agriculture News in Hindi,ANN ... - YouTube'
  },
  {
    image_url:
      'data:image/png;base64,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',
    link: 'http://www.agricindia.com/news',
    title: 'Agriculture News in India'
  },
  {
    image_url:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFG0lEQVR4AcVVA7QkSwyttW3z2bbNtW3btm3bNp5trG3b5v2Zqq+e6be93pyTaVUlNze3MoyV9MI3ewlPsGIeYIXcwAq6imtRD/H+W2P9eQCVAqHolblTEnfaYCc8v4sIUNYXrLS3AMHsyW3FvdinGFsZQNVgEZACF6lZBz7BAzBo+HKsWBOC/YdSERl9DCFhGVi/OQojx61FncYjUUavgQCS11nsr/w9AKr8s8AaeSv6o3e/+bh54wG+xp4/e4mRo1eijFYdvl/E+wYAAnEAr8LOtRNOn7mO77G7957C0rE9xbHJuiVZ0s6sYO/RDT/D7Ny7ChAUVxlAlSCw3M4oVC0YHz5D1rZuj0WdekNgbNcW1U2bQceiBbz8e2PGzC2Qs/efgEIUl2upshIA6rdK5YtXhUDOGrcYA5bDkdZYguWkawFXsDzOotfkptatcPrsDajblDk7hDArBigAoKBadu0gZ0FNRiE7MwMr5S2Y0hBtAH23QAWjxlC3yKij4riW8VEAQFV067cA6nYwJJ0zQwGkNMq0MBux02fQYkTHnUCXHrNg7dIZRWrUhqhekwEp/bmcsHj5Qahb07YTBe2UQHFolfcDq0CxyvlBtMZeDC2xVxRBToxIAIiXNNniEk5C3fSoLdQemaTyLIgk3qLi0nSfj7SSjfbncRFMkNM6NQA033Nq18WdO48kyZ88eYH82vX4d8Xk5XzBCrsTWGeRsIBQfn7LFqgY1A+6nabCbuJ6eK8+jKDdCc+lAOiYlCEBvX//UQLg6LFL4nspL81hVYYSFnIXyXI58+ccxo1R3K0zKtUZCKMeM+EwZSN81oUheF+SKil81ofBbck+uMzfpQagoCvKGTfBp0+fJACSU8+KnpbwFNTmJzqZg6CT3uc2aYoyvj2h024irEathMey/QjYHoPAPYkI3BUP73WhcFu8V5VQ4poACruhhEFDvH7zXgLg3Pkbokpmy6vOS4OnfEBf6HacApsJ6+C18hCvLHhvInw2RcKdALgs2K2ZUB5AAP71gm48UUbaOQmAVy/ewIpOQek242FHCb3XhPBkQXuIzg3hcF+6nwd0/V9wZ3KneTuhDCA30Shc0KtbDwcjMqFuU9PPg1Fin/XhUjpl3HPhHljR5Cs4bROyT90Em7k74LZAHgCdul5QuW6HybAavxZsznaEnLwKdVtHQ4XRdw8K/qXk7kR9sWmb0XjFQexNP4dem6OgN3Mr2KT1MKfYBE4KwHPFwefUPy4Y7w0RYDO2YiKpVd3uPn4O67k7eVVZgOBV2tIaRm0KpZPzjx2/cgfr4k+i/rID0J+1TQqA+vf8/0GMZ2/nQV68fqs5z09cAaMzXIhAuEsp5c+WRDsbswrjqQA5a0SsVKUCJQBUP2oU8iSzQtIgZ+EnLnOAtIZoJZ+8QTg956F+jyI25WxL0mm+RgJcE4BwK+oVo2DxZ65Bzp68eI1NiacwJyQdY6l1qpYtizqKjIu3IGfX7z/hzKq04PYVAHiPy07fDG3q1/lbD/Aj9vDZSy48RtNQCFARgHBazNVsTn3dQ2r+Hsu4dAsePPkGSXIFABIQJJotFGATOtD8pmPF6Vcw3rqB22KhQ5QXI8FqJlcGIBGlE11JE9z9aQgN2BaDeaHp2JBwEjtTz2B7yhmsij2OcXuT0JL+5SoTaJUwLUhLCnNDAYDkjIvxSkISYIT6VfeS5wqkHbt5OyVq/04Ayu78jyutVQCAP+kqALdUSP6Q3/oL+4uLoayi4+4AAAAASUVORK5CYII=',
    link: 'https://www.consultancy.in/news/industry/agriculture',
    title: 'Agriculture news in India - Consultancy.in'
  },
  {
    image_url:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKCgsJCYxJx8fLTEtJSkrLi4uIx8zODMsNygtLisBCgoKDQwFFQoPEisZFRkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIACAAIAMBIgACEQEDEQH/xAAaAAADAAMBAAAAAAAAAAAAAAADBAYBAgUA/8QAKRAAAgIBAgMIAwEAAAAAAAAAAQIDBBEABSExQRJRU1SRkpPRE2GBBv/EABYBAQEBAAAAAAAAAAAAAAAAAAABA//EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8Ahknl8R/cdGSaXxH9x0mh129gfb0lL30DEcVDHC8uf7I7tbVSyTS5wZH9ToyTSeI/qdF3e9BcnBrxdkLkFsAdr+dNKK2g0/zlyCju0Nm1kxIHzjnkqQMcD1I49NUFTdYZbCW7NUxA3IZiAmcxqpBJOOJJxnvJ1KLt97yVn4W+tMivuZQIa1sqBgAxtgD00uUVVTeKSblYv7hUlQBEgRAoclSTlmJAGSBjv46mbH4lsSiBi0QchGIwSM8Djpw15oNzlLGSC2xYAEmNjkDl01gUbvk7HxH61JJFf//Z',
    link: 'https://pipanews.com/tag/agriculture-news-in-india/',
    title: 'agriculture news in india | PiPa News'
  },
  {
    image_url:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD30lEQVR4AayShW4cMRCGLQgzHArKDK9xor5KnyDMSZmZmZmZRWWuKMy8e3y7U8/KvXG6PlR+6dM3Wtv/tElYulnzHXI918HnvQZ7PNfgGfdvz1XQEJzFtz14B++y+crCO+D2XoG97ssw475swhwuGWSOK26T3zX24luWbZbehTxe1uS+YOiuCzGwOB+3mA2yAvcFU8cO7Mrsf30R3Lz4nfMcL+eglZyNkm3QGXZhJ0snzrOw3nE61uc4zQs4wmKOxC3PaIszZA4/I2On6zSsY8ni4P9Kx6loX/WJMCCOk5G47dCZ+r79HLtxR8LfueN45F318TDEORYiW4TJHBcvbf8QhT/TJoRiJkQME2bCJvRpJnwaM8TbuX24Q/k3wS82VR0JwRwOB8nSjF5xJgRvhgxIEtEj3kngLibHcQzc1YdDetWhICSj8iD5UW8MUsX+PoBGdNzJ/qXqQHBv5f4AVHCEBX4yp1LMG26EIJ2I+2hpFn18J8OsuQi5lXv9MxV7/ZAul35HIY0k7cCduJtV7tN95bt0sNgdt5g1sjR/GrX/+E9+j8DyI35xV7eh6q/cpftY2Q5tDwfSoVxYj5jwf5Yf4qV0j+bknXtY2bbZZxxIh9KtlkERfjaD52QFcgdSvl17xkq3zP4u3TwDSAlZAZ2pgmeZgrtZ6aZpraRrGpR0kuVZFTpXv1eBu1lpx5RW3DEFFu1kmWzSM21AiehC04wWc/uUxorbpn4XtU6CiuLWKcvZ5HVPxN7ZQkZwNytqnnxW1DwBSGETWSabnPsSkjuV4G5W2DC+hwPJyCZdL/22ngLJYt7DihonfAW1Y2BRR5bJJhtvaeL9OFoJ7mZrGiC3sHb8b6vlcdswFATRL2ZCDagAX12H+3DOOWe7A8d2fFQZlsRMXpzu6z8kVnGdPcDgDbRJ5InP/nFB3lFOTMlck1TVuW8gD8wzcRO3FeQfFvfeQUbeQU5M2K0yOGBJXlVjcmaO1HFTsernecPZTd/c3ZQ0CeTM7M+S3L0MNWbpT/a94abql7ebXDrburidECiZa5LsspZUZO+kzNI2Z31r9JPsmlx7M2namzHZG7J1vaQkp6qBff09csYN3FKS6jt5w1mPA2stos8sCb/b6zFzIPMcduOG+kzORjpurUaBtRKRuRwSsz8LqnpWQuaoV8MAu9V3VF/MG9Zi2DQXAxrwUlhSENeZA7aWwyY/+bc1tkKu/hOXxkLwZswHVLlTUlINNW0mjFnswC71W+FtGLOd+9ps+7k2qw/MtEmSrlNZB+c6z5jBrPo3nZNjzXQm1FTrjgSp6dYDakr3oFd9U+9y1lO9tTZT6gAAAABJRU5ErkJggg==',
    link: 'https://www.facebook.com/LOFPCL/posts/1006576643058028/',
    title: 'Lanja Organic Farmers Producer Company Limited - Facebook'
  },
  {
    image_url:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAkFBMVEXl5eXL08tli2YxZzMqYixQfVKywbM8bz6Bn4KGpIFPfkqqu6pBckPP1c+805mZxFeuy4Bfh2CMp43I2K+fxmK3xbjZ3dmbsZyix2hvnnRgoGqMuHqxzYORvHVWm2FZkmCpxa5Mllesx6pNjlU8hkaeuKFPfFFKeEtFdUZ7m3yVrZVzlXSxwbJrkGzJ18n2+Pez3433AAAA/ElEQVR4AdTNVWLEIBQF0ItkoIUYDY9xt1i7/9VF6v4/J8Gf4OYwLmQ0+eddKX13Lw3+wm2cpFmu8BfhHtKi8NLjdyRDNi1S9neP2XyxXM3XG4Y/bHfr/W6+m+ML/2Fy2Mxmx+PJf4bzSFyGSV7PSo27YVF2vJQXcQZgXGy9MxA5aWdjAE6XFXBlgl0BVLWJ1MXUQTW8HAKYMfUY4FX1EpADQYZhLRkTzpq8tpchoGxV/RLACU46EKfyKp0tH5/42MLi8trCRy23URt5gNVjhTaMATpXrwEgzQVjhEEILTEGE4IBa4jHNQaexxXhH87jf8aB8K/6rNGPABgFANLtFqc43+hNAAAAAElFTkSuQmCC',
    link: 'https://krushinama.com/krushinama-privacy-policy/',
    title: 'Privacy Policy - Agriculture News, Krushinama'
  },
  {
    image_url:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB4UlEQVR4AWIYDADQPj3AbNmGARj+bf/Ztm3bNqeG3Izc2BTnGrNt27Ztu96749uezA/ze27HjBvXFS9evD/JSKYkyMjf/Edq0pGRLGQnF7nJxB98xweNYBe7k2AnU1jBFrazi70c4DBH2M1sepCWdxrJI0ISPWEBuwhvecFdLvGIwENmkJfXZWA0a9jKIwIXWc+ayC6eEuM061jDYuoynvCW7TSmLBOJEXjOBP7kdb/xHyU5SeA0vUjLf9TlOjEO0ZnU/MOvjCO8ZT6/kFAz7hMiFynNB2XlACGyhn9IqDxXCZHp/EZCP33hAGW5Rog8pBkflIGdhMgG/v3EAWbz+1ceoD53CJE71OF131Oc9hwmRA7Qmvr053YiDrCS3BRmMi8IkY1k4nX52ck9nhMiz7nHXR4QS8QBHnCAkzwjEOMYzfiO15XgNOFLEnGA59znHrc4xkQq8wPv9AuDeEh4yzNucp3bvEjEAbbTjmbUJA+/8clSM+69Q+yhOqXozs3ED2HiSsVgLvCUOfz1lVsw/v0D8CuJ7heq0Y9CfPeFA/xIZTYQ3nKEvjQgDYnuW94uDyt5/N4BCrCCc5wH4Cz7aESy+46sDGA5ffmRX8lF3k/Iw1+kWN/zLz99Ey9evHgp0EsWxPzo6SeB8QAAAABJRU5ErkJggg==',
    link: 'https://marathipaper.com/tag/agriculture-news-in-india/',
    title: 'Agriculture News In India | MarathiPaper'
  },
  {
    image_url:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAMAAAB61OwbAAABU1BMVEVHcEz77t7///7////99Ob++u7//////vf///////////////////////////3///7////////////55cz54873y8b///////////+g+KyZ0aSFyI/i5u/qTztet2zw7Mz+7c613bntdnmj1ahrvXjypKfqVlDtZmfuhYb75dFQs1/tkm/xmp3scG17xIXwkpTtbEjN4r3/8uH+/f7x7+z94sHtgl/31rbI0p9DrlP04saMzZep+bf9+fHu8Nu+48T2yrPqXVv1s7TjBwX+7NzNzd27xuiLoNjpPy2V56DnNgXi8s/yt5v0wKvI0OyntuLxpobi27bxm3zF+s/vd1Tg4sX2wb+arN3W2q7bypnyrJHnJyL2umvY7NfthHX40tC0v+Gm3LScw32t2K/M6M2M3ZH4zJXR/Nq4zZQ2qEbi1tGW7aGZyJq5v4XtYDbosIdogsucQ2Q4AAAAGXRSTlMA56tvyNM+vygFUQpfHJ+Xko1i3e/ghBGHT9cyjQAAAtFJREFUKJFtU2dT21AQNGAwmJYAk0RPvXdbsiVbltx7r9jGmGJ6h/z/T3mUEBiyn9683bnbm9vz+f5hfW3Dv73tn19Y9/0Pa4vN2JEghHN4rDm38IVemlP1MK8xOsPkwtJRTA5+5r+3BFETHrtZ247v71b1PNOd/8jPd5m8oMrghMAs7gSk+1OG3138wKsFpu6ecAR3GI1iHEeAtJGbxgJ/+a0uL+EmehM6JynbpshDNIHSuzyjfnvlV2RRq5oKylJUaVZuj0syRYeUzCMvZJdfGxhh3CVY2rY6bctKYb+xmW16oUb9GH+xsRoXw6qnhOxyxaIi6XTEtSqd+L2CPolM87nEQmwEDaBuB4tEBmwtmRykiu0xhQIa541NKAjkNONEOaMqFpm8GA6dMwRJp8q3pgJUBp+Dgh0hvM/RDlYmr5DMZfzSQZArsj3bA6GJKGVXfStZJhcnElQZI5GLaKRHpvbuYAlMJhRSn+4v+1ZaYfGBBr0K1kBqB5cZkDq4rh1GOjJ6flrl+0tQkBN7CqxgNRDWtmlueBCnG6WxTBCmwDwLsqI4AazThi2uZTfFHt7XEBLr9ADYg+7gnDs686Rw5m2ZGjwcRNMXNWjSLZeGBDHJ8dCkL4CPjAwBemOMZK9rdwiCJMlSRwYcq+ZfxtyKSeLpmTIsVlLFQRJiEEmPLTJBo4aGP69rxS1U+1zC2ytVZlSk0ShSpQrW8wilWSi0Xra1aRxPeywbcm6j0eORXIxiRQd4Z2aVr74lQq6O6uwNS5iT4iifPy5OzAR94xmann2Ld7Ap5PFzlEMJNuo4KToBODQT0zX1x3tk+2Ied0DGS4QgEmgGOIYk7b5Hzufb6Ar5aewUzdCeR597p6ogaUcfeBiKLM5rotGNuy6MPXzrzY3Ph7G82IeHEy7U6wVJYnLq3NLX2/K3VP1ZcCS1/Gtf6Jd0Bn8F/H7/ZvDnh88/FEqV4lupmawAAAAASUVORK5CYII=',
    link: 'https://www.pjtsauvaarichenukaburlu.com/organisation-committe/',
    title: 'నిర్వహణ బృందం'
  },
  {
    image_url:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEE0lEQVR4Ae1WA7TsOhTtt21bs+a2SfvMTpN+27Zt27aX3rdt2zamSUbftrH3up3HmWe/l7WyTnp6crR30npTx2Q5po6bPW+6D1ZW802wBP7zvGmyQO06QbtgpN5onAexfmldykwkvTKpL/poxXj+8ZtAqK/MZLLGu4XCjEhgWxPpuajnMyGoB8lizVmT6aIfyt6Lkh+jHbASaOlCtbrzS93LQbKqFclRdpVkKVZeXn75mZDESR+H/VahTRaqQ5mcleqgvEP7QG5vA7X1u4V49tGrWCb9UPXrNlSnWKGvsFI/YoOkG+SdNky3dkKfZ2Syu5Pp7rC7FzZPGKwhb8b7h2hvinEXI9R+o992qR9AVTtBvo1Kd3NC3Y5gn8HpJQh0VAXYV6UqIJlzHRLjswv1HSbUj2PPx64QLwz7h4Yb5NMont8IvSXmcUaqY9HqTcrLd5+T74xfUrVistwHIl7a+KmqBrrPe4We81pZCmC/FrtkltVzZR2l6DPZdwH6KUNWAIORcRfXEa9cDVeNWgZ2Ip4bWV+KoI8Rs8xPEqw1KjsY+udRwdH/DUYiVL9dhklZEWpPrgHBHibQOxh0wEh9uAnUgdAdhneHfgzu8LllAszMivRFGKzN58yPi3DwHub1H67Ue47jPW9aI+Es1DdzTSIhyPFMCvoTYHcaEr3HQUcICFNFpGtaoQaAB11gdxdgOhXypJYJWJk+hQ4IEgqYvQb5L4jzHyeC/oh5r5Nqc1blMG1RLfRxqFd5t6CXZPIOkBCm91fpuwgrLfvx4oQyK8TLl/1kHRSx6Of+qrORAxXYtCaYUEfmQTH1r5AvIrF6U4f1H/+heiT35Ec4295wRrWjzzyZSLeHn99wKr5xvu7Bozoihj+aB3uRFVLHdrPigd0A6XjLsRPt/JCcsP2b9oNPR51UG7fc1Mng9B8aVtBa6niDuaXjmfPkns4781C1Qy2LBK5rW4jQV9KWHLKB3tSGyTrw/WSnTp3epvp0QLP1TR1a9wlJxrUJ0/OblVT8fsvA/u5WfvgOlf5sABcLoA7EXtEsG81FOOHvc/JgmI28oYgxA3BDp7MkrOOM5x14gu8gn6czkrVlIWB/nugHOa9S3gVc80LiO4crud3H5dq8dc82BvuhwAk4gKeCs4oLhrr/2nxUuA/2VRaTFfstURY6fsKLp3910WhWcKkBHx+9x6LaZH9Qnj2T+IlHE0mZwU5BeST/BU5rdgEwbuGEWh9deIa6jJC2GzwmnR+Z9PehGYzM3+eHZ2QSeBUQYU+txSn4lF0ZNjAuECPUGcj2BlR8M7J9EXhlBhXj+UPId4HlNWQ3ErmQN9+rXjTDMIGjaIZMJLtksIHdVYb+ZHoLWn8b/UJ3NeIcwe9Jc8/UMXVMHf8DT7Z5A1MvJ7IAAAAASUVORK5CYII=',
    link: 'https://www.tractorjunction.com/agriculture-news/',
    title: 'Latest Agriculture News - Tractor Junction'
  },
  {
    image_url:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAMAAAB61OwbAAABTVBMVEVHcEz+/v7////7+/v9/f3+/v7+///5+fn7+/v7+/v8/Pz8/Pz+/v77+/v8/Pz9/f39/f39/f37+/v8+/v8/Pz9/v78/Pz9/f38/Pz////8+vbq07nw6Nr09PT+/vz18ez2pSf+9+v31bpVuEX72VrY2Njq7ejW0Mzx8d78zRLl3cvMwb7k4N/76JH0r5Tf1tX3sxtcuktnvFj3jRb7vwm9yYdwwGjzpID2yqn65NeYzI+8u7r4wCbv4NTJoX727Mz833u/4Lyi05+0sbCamJj2xJjJ0aLX3bjwvkals23v1pmlwkH/7xzQ583snVH0123xumG7qZi4zWn877TivJ/68trr0YHG1nb7qhChxIXY45TvYTJMtTZ/xXnb6taopaXtuXr81kHghV/vpEi/i2Lqcl/4++DxfkaBlzi2uZjlrWnpyGfCtK2okYWbQBuJ3uitAAAAGXRSTlMAyPgftdHrBRgPWk7ALHqTm6omN4ndh6KKeN10hgAAAmdJREFUKJF9U2d3okAUtaGiRk3b3QsIAio2RI299xZNbye9Z/v//7iDGpM1e/ZygGHuneG9efcZDEuw2WzLU2/cmsNjMRqNlg2n/R807XCZ8AqrZ2V5tZMCBAY4AjieSExu+j1v94KQwi14P/BdJEPAYn7jzUYg2oWvUi3ssuwdg1uigXERiZnSN00KewF2dPjj5Hhv1CB78FidJ0S7wOyI7MnhbjjEsmyUqzc4qb5H1jhmgi9kKGSqjTq7s6Xj4UhQTxp6MtQ00HUIEtiRyu1s+XWcPZz5o88jiSmIcOoJrgJs8nhXIFzSn8wM4sqvTIatBwLHgJcIVsjx8FJAHCQrlUqkth/VfsYGkQhXlEjiFAnTDa4gdNV6JkJQiWmKL6741IgqJQrdopVkagGqg4aoBgjuYvH9kKbEY4fjMVcsiiACelMP97qUk+XcVSsWD2kxDZo6Hov5LnSB3Ur45qWcm7RyqcsSmtfa9VUrncq1miFgk54J0nKJ3Cm5NSnJcuoyVZows6paDDNBSQ41U+mcjzzS6asJmWESRV3gJsdAzS3A8ws3oIA8uXiYdFd4gYPz7dPT/il5nW8/518uXhIXT4n8hTSrlhNMtp/NZnsH2exwO1xMFJ6k+3spn0+AX5/WkkLv6zA6DPd70d4Q1cfftdpj7YivMdiYFdNBTEb+2w8z38JhZT9KPjhOqHJwzU1n+0zouNIJIthBKNhGMBjvBH2gFpazuwDlphzDTRtKuYNyu10u+1zvLWlByPea4nzg/as1aPdbS0xBOZf7a8VjXbAml4M2fITd+Wnadx7H2n+682Pn/gEpU23gDar6nQAAAABJRU5ErkJggg==',
    link: 'https://fasalkranti.in/ShowInformation/Agriculture-News-in-India--Agriculture-News-in-India-120800',
    title: 'तीन हजार एकड़ में होती परवल की खेती - Fasal Kranti'
  },
  {
    image_url:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEEUlEQVR4Ab3XA4xkSxgG0PHq2bZt2/batm3btm3btm3bNk4nPUlnlv1UyYka/1f3FiPCavW/iKU4y3g94v9sCkbxOfPITUzCr1yYFxHLXSQligj458UjeZfRlCbZlb6m0C3UYhCleJJHuI/If9LzD+hJJpIQcZUAkXzGOs4ymJ/oyLNEcc1iAUl4jS+4j09oyWdEXy+vAjH8whRWkIH51OMzbuGqxe+mEmvZw0Ca8BI39AiD7/xB/qIgGRlNBzqSiairvecXSEF6mrGQvtxHRBgB7qAW29jNJPIzn5HcTWTC3j9PT+ZTkyq04jjZgwHCCXE3mSnBH5RgE+NJyZ2hAW6hJStZwHx6kp29lA0GCCdEIlLTnwXMYBKFGct7oQEe5GdeJj8tOUgFOvBjaICTfb4NSMTt3EkSIq/yFCoylDpUpx2H+YnI+FGfg1E0pBN5mE97XuO2kMK38AftmMlcepKZe0k4Ld+jKi3pymJW8h2PBgJ8zTa2MpZxbKAuVYkhvvj9NOcQFxM4QX+eJ+GArM92ljGG3ylNgUCAwtTnV6pQkmN05EXiH3syGnKai1dxnoHcE/IUkvInJUhBCQqxgSaBAO+Tk6q0JAv16EKykN5/wR4uXscJshMZDBBFOjawmcGM5kD8EyjJETYyj0M04ycSB3sfTTUucPEG9CZxyDj4hOqMDupKDjIHAkxkOQ1pxE728hORwQBxdOPiDZrKHcEAAb+zgJb8QRHSMD8i+Ki/IxP5KEFXiicI0CGMABO5NSTAs8zgHCPowTZWBAJ8SwPGs5idDOQHooIBIinCuRsofoHWxIa8gtQUZDqLmckmSgQCpOEIo2lNb2ZQm5uDAQJeYtUNBNjD98T3PpZazCA5JcjMV/wVCJCdlfxFPTJRkRTcHrL6xZCNvdcofoxqJAl5/O9SieMMoC5lGEGzQICPyUN2prKBE8zmvZBxEJCYTCziVMisOMM6SnEb8cXjKEx3+jKDcRxiE98FAiTlHdaxiqbkpTC/EJtgD4jmCTJSkzrk5mViQ1bBW/mLovFznnqkpTw/ERe/Gb3CZppRjwFsYTJfcYUDRDAQXGk7/oQ55GYtw6lFSgryAsHmwEE7yrCAwbSiGhm4PbytGIU4QV1KMZs9HKYtt4ZuxzG8QW/2UYYcdKYdnxIdZoDXWcMkqvInjajIw1x2HoyhMispzAymMY/OvEQ4TyGWUsxjGB0owyfEXu1Q+hz1qc1KstCBsjwXxsE0ms9pQEZGMoni3MM17wCP8CeryMkaTtKD+7neo09MGlrzClHcxh1Eo93Y3SAjf5GRJeynOomucxquQFde+Ce3oYBobiWWx/mO37jlKsVvowHDeC6M4uGEgisEiKM4c3gHxf/HFiy6kkJEh/PbS1ZDJ8IFy+xCAAAAAElFTkSuQmCC',
    link: 'https://www.krishakjagat.org/category/national-news/page/188/',
    title: 'National News (राष्ट्रीय कृषि समाचार) - Page 188 of ... - कृषक जगत'
  },
  {
    image_url:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEaklEQVR4Ab2XA5AsQRBEv23btm3btm3btm3btm3b9nE5m7+q4uZiznOYzYg8bKNeV+cqnFYA0pHHk++TPRB2MpGfkKeTs4bzTwCqk++QFRgnB/kxuRE5gu/iX+A8/SY3VYunJ9+C8/WMnJsBxhncdpjsFrhaPeFC9rCbodFiBrgHg+RmM2H9m9PocHUeml6chkYXpmDWkz1QJAqiDwzgAQNkdyhSLO+hXsh5sAdykbMf6IYZj3f7CGU4GKTnrp9Q5sRQ5DnUE/kP9xGQPORd7y9BK8MADn++ibIE0O7KXJQ4Nog7IECP/31wDsD574+w4uUxNDw/BTkOdkeRo/2x/OVRvhrjABSHA6psVGjfx6sYcW89pjzajtPf7sOi2EAKHMCuKFiy+yC6zViAnrMWofuMhZi2cTs8zWao+vb7D2Zu3onuMxfyHPnda/Zi7D1/GTY7ZZxAzt99gL7zlqKH15yL9x6BFDTAbxdXFO3UF1HL1EL08nUQuXRNNBo5CVa7XU549s59VOk7HLEq1kP0crURhealqd9aIP+4uuGvmztmbNqJ9A3b0ngdcdzKDXD06k19AA9fv0W6Bm2kQJxK9RGjfF1MXLsZf2nzyeu3Im39NvKYOl5z4GhcfvAYCnXuxpPnqDNkHD+ujsvvzE064MXHz/oA9l24gvhVGiI2LWbHo78HLlyBekPHe28YkwD41JPWbsHPfy5gvfv6HWNWbkDLcdMFUnuACr2GwMXDQx/AlA3bpAAvZnP7ElVrjJgV5NSITa7UZxjO3Lonp9YGkCP46cdP5G3Tned7AdRB1+kLeCxoAA5g6/EzZJEKwOaiDJWyTguMXL6OQvgXAenqo6dIXrs5YqtXQCDzd+wD9ABwAIt36cf02uK0ST2U6T5QgsSn5nZPpU49//AJvrXuyEnIOllbH4mqN8aJ67f1AWgDqBZPXqu5ZOAjtZY7dPjKDZTsOoC7JPf9j1Kv1ZDFq2RMzUsWCuBLCqAuAH4eawPI9z9v+17v5/bsrbu5vdwhhpPxiRREBmOZLFZ+FjCAJoBD4erhqQ9g0rqt/NyWe+M7T123Fe69fA1V64+cQpIaTSGBJHOBZLWaYcfpC4AE8BfytPYZwG4zJIBBA3CKudXZmnVCzpZdkL15Z9QePBa/6GmmymqzY8KazcjRojPPUefRqcfi4/efOHDxKhJXb+IjgIt2HQBJXwd+/P2HD99/yGb8+/ufv9J6rUwWi+SB57A5kLefvcTm42dQqENvKirF5XeGRu1w78VrPQAh182nL1Cq2wC5Gj6xGl7O0LjVm6AoDmMBlu87IllQi/L986tn7zlL5H2BFCSAJ0IuKRSlTE1E90p+gXY9sWTPIbh5mqBDDgZ4jBDKYrVJcKv2G4Gu0+dj7eETeP/tB/QLXxhgOpOE9GuOu8kMT7NFwhoCrWaArORHcL7ekgur344akX/DeXIjd9R+N4xAbkp+DuP1jouTI/n3DTkXeTH5o1xx2OoreQ25EDm8WvM/6Ja6zF2+ANQAAAAASUVORK5CYII=',
    link: 'https://hindi.krishijagran.com/tags/?id=Agriculture%20News%20in%20India',
    title: 'Agriculture News in India - Krishi Jagran Hindi'
  },
  {
    image_url:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACSklEQVR4Ae3WAwggWxiA0fts27Zt27ZtpWfb1tq2bdu2bevfUy1nbVanJn9znSJig9oasDVgwUfHE05Y2xpSn7QMay3gLPYhZQxl8LoOuJuWpCza0HJdBpzBSP7hJq7i2nmuoi+9uWae3dZ2wKUczaXEShjEsSsbcBY/04yW/MRZpIyjGUyspA9XJuBHYhl+JnEVZQlYOwHb8D/BFApwyzwFmU7wId8Qq+Gb5QVcSTCJl0kcxMEkXmYqwXW0IVZSbwpw9vICShH8R+Ip5hA8R+J/gs/4kFgJn/AkeSjNS8sKGE9wDnsTGftwFkE1PiBYno95iKAptQgaLC1gLMHpHEBkHMCpBB25i5pUJ6sGOXmO4DV24mCuIvg7G1CV4FsS7xHzfETiO4K6pJXQgOYkhjKbg/mKGdmAOwiGcD+JoziaxH0MI7iNtBI6UYadiHnO5jkiG7At5Qj68BWncDJf05+gEtuTVsLXBGdxIlezH0HtZR1EhYhlKMlOpJW0Pa0JPuJVgpkcuvQAuI3yDGUwZbmVtJr+ZCjDKc7BpKUtwvZUILEHF3E0aZ4LeIPfSRzNniR25UAKU4n72JGd2IHEnhxCYodswP0ED9OS6vzEMJ4jL2UYwQw+oAdF+JQB9GUAD/MEhSnHbxSgN23JQ8lswNFM43xm8ym/MJ5gEjuTk7I0oDJlCKrwDh35kjl0ZSANmMlX5GAaw7IBJ9CQS/mfq2lLGz4kJ+V4gzb8Rjvy8B9fkKhGA37gD3ryBxU4k3sZSN2tz/Jga8DWgLlRQIwJgt88AwAAAABJRU5ErkJggg==',
    link: 'https://tractorguru.in/news/agriculture-news',
    title: 'Agriculture News - Tractor Guru'
  },
  {
    image_url:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAxlBMVEX/9//v//r5//n/+f//+v3+/Pn4//r4/v/9/f3///7++/v9/vn2/////fX1//b+//T/////8fb/5+v/7uz/9ez7z9LcaWnicm3pbm/wbWv56uPwq5rhSEjsJy7rQEHpbmzvtLP5ubvkAAD2AADvAAD7AAD0vbX/9/TwkpvcJSz/AgDrAADbNjz4vLf+AwD6no3oaGL9AwXzfYj0mpvZEAz+zdLxChLkHR3rcXn/4N3jVl3/5dvpkI77yr/XAAD72MznnJHvvcWe/fxJAAAB3klEQVR4AcXS1WLcMBAFUEcjGIEh3HDi0QS8WXcVZvj/n6qWy33sfbElHbGKYkUASKUNoBYr1jkJOdIY9ApzCtAeTMBSSScLsKKqtA7BKe+lmwCFMgOD4LXW4645IdjSa4MTIMC4svaNKFWhtXGra2vrG7WFAsIUaDCbW9tfdna+bILZ3dvePzg4ODw6Xm2kUnNw0hJFjqdn5xeRuGOKcXA5rO10BAlhOOgpk6+jyCkR96nvmdurwqBHVyjTDNueKfWDQR9jbk6JOYvBNYbKQwY2gyy63Jdo/JeTsri51WIBODfE8fR39zct5fG6rB9KgXIOUkcxtaPh4/rjyVPbjXv0F89WujmgPHp8qRtjjFo/ihkkal8t4HINTEclujPlK/N8z9wlor0lyKJ7ew8QDBoEt0U9c08fDfg5yLk8kx4naV5ilzJ4aewCMPPTElzH/hdAPHKo/wiYiUYKxQL8OkUGDv0/gPwbSDxSUv0RMHMG+F9B/zeQn1z3O9BNgQz+5I2YeDDasDiNv26ZiNoXH+QYvG99+bL9Zeuj9DNgPx++bD88PByXBopcq7yTKJ2at6NBiY0EVwoni8qB9AhgAjo0U6DKaiUEHYJVvtBQuEo4JarxODNQCwmojcRKfAMVyVxTSnEL9QAAAABJRU5ErkJggg==',
    link: 'https://www.newsncr.com/knowledge-utility/rose-became-rocket-before-rose-day-lovers-will-get-shock-of-price/',
    title: "Rose became 'rocket' before Rose Day, lovers will get shock ..."
  },
  {
    image_url:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAolBMVEX/ABf+ABf9ABf8ABf7ABf6ABf5ABb2ABbzABb1FSnvHzHtABXxABb5l6D84OP7yM3ySFfwCh74q7L////+8vPlABX3o6rqDiLzq7L+9/jxZ3TgBRjonqXlk5rwwMX5wcbqABX55+jRKDfFABLKHCzqL0DecHrrUF7KABLdZXDrXmvmO0rSMT/NEyTcWmX4z9PiFyntfojVKDjbR1XbABToJziPkPBEAAABTElEQVR4AX2T14ICIQxFVQYSBXvvjL13///XNpNxMQ/s3td7UgkFoWKugpQ0S0ERiFyVaG2M0Von6ssEX2kDgJkAwOgkEMGHcuWjskVCVKkoAQ2uWvuoXm00EbQkispgs9UO6lQrGfEFSgm4LgFf9foI1IeoYLsDCQxHFo0SANoxA8PJdMbEvO9CCgIM+hxIF8sVE+naog6AksByw6m2nmrEgN1uzzVG3v0PHLrURByY8iqO3kEsw+l8Sduk6y3ew/B67XCF+zgCCM1vXQuxMXMN54+uzxZViAHDdLa/jSlBqCCBzubyfNxe3a5Fw5uOjPl6jbveIncQAR6vF9kODZ3DHwCHGz7KGLAee0e2kj4/t/0FuD1hh4v6AG8vDkUCttsakmpveWryaNGvt6Rj38r5RJdgfTeTXJCskRh01ntekKwgvx6gc5hvQHo/I6sr9lCjzicAAAAASUVORK5CYII=',
    link: 'https://presswire18.com/inflation-relief-news-heavy-fall-in-the-prices-of-flour-pulses-today-know-how-much-the-prices-of-wheat-gram-and-lentils-fell/',
    title: 'Inflation Relief News: Heavy fall in the prices of flour, pulses ...'
  },
  {
    image_url:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEpUlEQVR4AWJwL/AZUEy0Qh1A7+UYJVkSROH17/2zaqNcY9u2bdu20bY1tm00x7ZtG93fvhi+U42qM417zn2OjPsyIyIzw4y/K6yn0F9hksK7Ct9+4d0vz/y/fPN7TgkQx38qnKTwvkJs5EOxEdvsCBDnrb78HT9IsW1lqwC1418VhigkhxgibVoToHa+QiE5zBXSti0CAhWSSwzKSoA4b6mQXGZLtU/LaL+XmWHH1e1ZenwxlcLLZ1fAPfGVkYBJWRm2X9QGwc0nN+gwvw35Qm13WigiPwXCzepnk9QCxPkf1vK8fkxtBLce3OTFm+c0CWtgs4BuqzpTIMCkfnZffKoF1LPWSFH/gjx585izN06zaf8GEUFxj8JWe6LNqlYsO7wEo6cWc7BB/a6eWkCANQFiPDcpljTS8F/tzdGLR/Dd6IXBU5OpTcsVzTh1/yTz42PRzXDD6KtVvw9UC0hQG5aPKE3fTb2pEFmGIpEFvz2v4FsaEbD72E68Vszk5NVjmCZoMAXqv32TP8xEwyX1iToSwcPXDxEMieuP80gHSwGJagHq8adpdEMEL9+/JP7yHvos6UmFmLLIux7RXUhNS2VU3FA2HVxH/pEGzIoACbQe67ux+uxKnr97jkDEPnv9jBrjKuM41A6Tvx51HKgFvFMLKB5SmNO3T6HG8RtHaR/XFqOHjglLx+G9chZTl07EMEJDWb+SbLywgdcfXvMVIvL8rbNs2LcOly72aMY7WcbAu0wFCHvO7YLg1dtXqDF17WQMU7QUHmumyPj8VPOowNnbZ7BE/PG9HLlwiO4+Hfm3598Zxcq7TIdAaPLVsTx5CRdunufR84eoMWhef7TT3TDM1LD+2Fossf90Mgu3zWVV4nKcujviNtoRc4Cq+zMYgsSMorjIrAKsO7CGdUmruH7vGl9x58lNCkw1U8KnCO8+vkONg+f2M2P+ZCVLDlF2ZAns+/+LYZZ7RumaaDUNzSEGikzLT8B6X8I3BJNyOomvaObbiBq+lVFj64HNDA8dyOELB2nh0Ri73v+gm+iCOUhPBu0H2lSIJMVMU3R0D+/EuHnDid4cztMXT/BYMYNasz8LuPfkLn7LPBgU1Adx3s6vJQ59/0EzxgkZykzarm9Zih9mJUIKSanpRak1qyrNZzegi197JBAnLB/DkPB+iIDE03upP7MW0u3i3OilVXd95qXYlslIUkgKiQhxUYJKCosI8lj/uSCFbg6i0Egz9gPt0Ixzzsq5cJLt07GaoZ+FyLlmYDXuPr/D0pRF1JldHacB/+E81A7dZFfp9qyc3xdf2VqQtFnekuuPr9IjtgvaMa44DPpPUk3SUqqiNftW1pZkQVk1IHND/PW9eK2fjQyFyzA79FPdVH+dJYOyvShtsLgu155clWCU+i45Luma/UWprcvy5suaImNfeVI5XMc7S45na1lufWNiEZgyK155dIXJi8ahmeZmy/qvVU5szSYrfPh1vp+9aQYfUz/QPaoz5UJLUTyiCBXiylJnUU058+XbyWKbG5vTgGLehY4nXIx//+r9K5Iux6cF7PV7NXP3tMvjdoxZ03xx03ZSZLKxOc1b/g9Vr2PljcnOPAAAAABJRU5ErkJggg==',
    link: 'https://www.digishivar.in/agrowon/11596/',
    title: "संत्रा बागांवर 'लाल्या'चा प्रादुर्भाव, फळं काळी पडल्यानं शेतकऱ्यांचं ..."
  },
  {
    image_url:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAKlBMVEXtGjvtGjvtGjvsBCXtEzXqAAv4o6r//f3zaHT1g43819zvNEv6vcLxR1vCLd5RAAAAAnRSTlPv7XHOvN4AAAEOSURBVDiNtZPtdsMgCIaNIoLg/d/uXkiytlvW/OkwJ4DnCV+aUsr2RspW6nspd8BthE8BhJUvLAozdVg7QK333iA9JXQ6jRIgWuzMCmF3nx6a1cdgEBGBqszhZmstHcOlrjnUYM/W9hSt8+A9NM8KYw5BKnE7gRZAC1IYHgFAEaZGdBQJAPsmVg1YAijQHl1kim66Yv8EHm1GCscHykj6FKE+R5gqoOga2Ivs5l7/joAu0MJLDT8iRBfL6BogzrEiVJWFNNc15KCMpfVfQK8+/Bz1SkCDPwCqxhNHJyI4Qm8N/aLrLOcAloQoHsUsa1ii6xuI2vYrkur0XuawX7NQlO6x9clb/a9Aufn7y/YFhXMOhjjjNLcAAAAASUVORK5CYII=',
    link: 'https://m.economictimes.com/news/economy/agriculture',
    title: 'Agriculture India | Economy News - The Economic Times'
  },
  {
    image_url: null,
    link: 'http://amrutkamal.com/agriculture-news-in-india.php',
    title: 'Untitled'
  }
];

const News = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = 'Agriculture News In India';

  useEffect(() => {
    dispatch(getArticlesFromSearch(query));
  }, []);

  return (
    <>
      <Typography variant='h4'>📰 Latest News</Typography>
      <div className={classes.newsContainer}>
        {newsResults.map((newsItem, i) => (
          <div key={i}>
            <div className={classes.newsCard}>
              <div className={classes.newsContent}>
                <img src={newsItem.image_url} alt="news favicon" />
                <a href={newsItem.link}>
                  <h3>{newsItem.title}</h3>
                </a>
              </div>
              <a href={newsItem.link}>{newsItem.link.substring(0, 40)}...</a>
            </div>
            <Divider />
          </div>
        ))}
      </div>
    </>
  );
};

export default News;
