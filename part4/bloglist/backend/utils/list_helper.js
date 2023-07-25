const dummy = (blogs) => {
  // ...
  return 1;
};

const totalLikes = (blogs) => {
  let initialValue = 0;
  return blogs.reduce(
    (accumulator, currentBlog) => accumulator + currentBlog.likes,
    initialValue
  );
};

const favoriteBlog = (blogs) => {
  let fav = blogs[0];
  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > fav.likes) {
      fav = blogs[i];
    }
  }
  return {
    title: fav.title,
    author: fav.author,
    likes: fav.likes,
  };
};

const mostBlogs = (blogs) => {
  const authorObj = {};
  for (let i = 0; i < blogs.length; i++) {
    if (authorObj[blogs[i].author]) {
      authorObj[blogs[i].author] = authorObj[blogs[i].author] + 1;
    } else {
      authorObj[blogs[i].author] = 1;
    }
  }
  return Object.keys(authorObj).reduce((a, b) =>
    authorObj[a] > authorObj[b]
      ? { author: a, blogs: authorObj[a] }
      : { author: b, blogs: authorObj[b] }
  );
};

const mostLikes = (blogs) => {
  const authorObj = {};
  for (let i = 0; i < blogs.length; i++) {
    if (authorObj[blogs[i].author]) {
      authorObj[blogs[i].author] = authorObj[blogs[i].author] + blogs[i].likes;
    } else {
      authorObj[blogs[i].author] = blogs[i].likes;
    }
  }
  const keys = Object.keys(authorObj);
  let mostLikes = {
    author: keys[0],
    likes: authorObj[keys[0]],
  };

  for (let i = 1; i < keys.length; i++) {
    if (authorObj[keys[i]] > mostLikes.likes) {
      mostLikes = {
        author: keys[i],
        likes: authorObj[keys[i]],
      };
    }
  }
  return mostLikes;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
