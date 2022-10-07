
/* types of links
    goal: youtube.com/embed/qjD_yHJTU_U
    links as possible input:
    youtube.com/embed/qjD_yHJTU_U
    https://www.youtube.com/watch?v=qjD_yHJTU_U
    https://youtube.com/watch?v=qjD_yHJTU_U
    https://youtu.be/qjD_yHJTU_U
    https://youtu.be/qjD_yHJTU_U?t=120
*/
function getVideoID(text) {
    if (!text.includes('http')) {
        var intro = "http://"
        text = intro.concat(text);
    }
    // regex from http://stackoverflow.com/a/5831191/1614967
    var re = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)[?=&+%\w.-]*/ig;
    var id = text.replace(re,'$1');
    if (id.includes('#')) {
        id = id.split('#')[0];
    }
    var embed = "youtube.com/embed/"
    id = embed.concat(id)
    return id;
    // alert('Testing Function')
}