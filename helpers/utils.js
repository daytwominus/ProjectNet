
function getUniqueNameForFile(original) {
    var date = new Date();
    console.log(JSON.stringify(date));
    console.log(guid());
    console.log(date.getUTCFullYear());
    console.log(x);
    var x =
        new Date().getTime() + '-' + original +
        '_' + guid();
    return x;
}

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


module.exports =
{
    getUniqueNameForFile : getUniqueNameForFile,
    guid : guid
}