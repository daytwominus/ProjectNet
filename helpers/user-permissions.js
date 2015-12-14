
normalizeArray = function(arr) {
    arr.forEach(function(entry) {
        entry = entry.toLowerCase();
    });
}

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

isUserAdmin = function(user){
    if(!user)
        return false;
    normalizeArray(user.roles);
    if(!user.roles)
        return false;
    normalizeArray(user.roles);

    if(user.roles &&
        //user.roles.indexOf('admin') != -1 )
        contains(user.roles, 'admin'))
        return true;

    return false;
}

canEditCourses = function(user){
    if(!user.roles)
        return false;
    normalizeArray(user.roles);

    if(isUserAdmin(user))
        return true;

    return false;
},

module.exports = {
    getPermissions: function(user){
        var perm = {}
        if(!user)
            return perm;
        perm.canEditCourses = canEditCourses(user);
        perm.canEditUsers = canEditCourses(user);
        perm.isAdmin = isUserAdmin(user);
        return perm;
    }
}
