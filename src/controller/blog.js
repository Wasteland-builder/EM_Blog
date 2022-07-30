const getList = (author, keyword) => {
  // 先返回假数据
  return [
    {
      id: 1,
      title: "标题A",
      content: "内容A",
      createTime: 1659156124174,
      author: "ZhangSan",
    },
    {
      id: 2,
      title: "标题B",
      content: "内容B",
      createTime: 1659156124235,
      author: "LiSi",
    },
  ];
};

const getDetail = (id) => {
  // 先返回假数据
  return {
    id: 1,
    title: "标题A",
    content: "内容A",
    createTime: 1659156124174,
    author: "ZhangSan",
  };
};

const newBlog = (blogData = {}) => {
    // blogData是一个博客队象，包含title content属性
    return {
        id: 3
    }
}

const updateBlog = ((id, blogData = {}) => {
    // id就是要更新博客的id
    // blogData是一个博客队象，包含title content属性
    console.log('update blog', id, blogData);
    return true
})

const deleteBlog = ((id) => {
    return true
})

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog   
};
