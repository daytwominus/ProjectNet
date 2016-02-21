
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

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function asyncLoop(iterations, func, callback) {
    var index = 0;
    var done = false;
    var loop = {
        next: function() {
            if (done) {
                return;
            }

            if (index < iterations) {
                index++;
                func(loop);

            } else {
                done = true;
                callback();
            }
        },

        iteration: function() {
            return index - 1;
        },

        break: function() {
            done = true;
            callback();
        }
    };
    loop.next();
    return loop;
}




function traverseJson(o,func) {
    for (var i in o) {
        func.apply(this,[i,o[i]]);
        if (o[i] !== null && typeof(o[i])=="object") {
            //going on step down in the object tree!!
            traverseJson(o[i],func);
        }
    }
}


module.exports =
{
    getUniqueNameForFile : getUniqueNameForFile,
    guid : guid,
    clone: clone,
    asyncLoop : asyncLoop,
    traverseJson : traverseJson
}