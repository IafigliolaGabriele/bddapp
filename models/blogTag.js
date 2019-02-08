module.exports = (sequelize, type) => {
    return sequelize.define('blog_tag', {
        text: type.STRING
    })
}