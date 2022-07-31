const { exec } = require("../db/mysql.js");

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 ` // 占位，纺织author和keywrod都没有值时报错
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`

  // 返回promise
  return exec(sql)
};

const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then(rows => {
    return rows[0]
  })
};

const newBlog = (blogData = {}) => {
  // blogData是一个博客对象，包含title content属性
  const title = blogData.title
  const content = blogData.content
  const author = blogData.author
  const createtime = Date.now()

  let sql = `insert into blogs (title,content,author,createtime) values ('${title}','${content}','${author}',${createtime})`
  return exec(sql).then(insertData => {
    // console.log('insertData is ', insertData);
    return {
      id: insertData.insertId
    }
  })
};

const updateBlog = (id, blogData = {}) => {
  // id就是要更新博客的id
  // blogData是一个博客队象，包含title content属性
  const title = blogData.title
  const content = blogData.content

  const sql = `update blogs set title='${title}', content='${content}' where id=${id}`
  return exec(sql).then(updateData => {
    // console.log('updateData is ', updateData);
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })
};

const deleteBlog = (id, author) => {
  const sql = `delete from blogs where id=${id} and author='${author}';`
  return exec(sql).then(delData => {
    console.log('delData is ', delData);
    if (delData.affectedRows > 0) {
      return true
    }
    return false
  })
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog,
};
