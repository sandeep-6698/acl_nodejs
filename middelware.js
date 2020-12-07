const acl = require("./acl");

//check that user have permission for this route and method
exports.isAuth = (req, res, next) => {
  console.log(req.method);
  if (req.body.role !== undefined) {
    const groupPermission = getPermission(req)[0];
    if (groupPermission.resource == req.originalUrl || groupPermission.resource=='*') {
        if(groupPermission.methods.includes(req.method) || groupPermission.methods == '*' )
        {
              next()  
        }
        else {
            throw {status: 403, message: 'Permission denied'};
        }
    } 
    else {
        throw {status: 403, message: 'Permission denied'};
    }
    } 
  else {
    throw {status: 403, message: 'Permission denied'};
  }
};

//get permission from acl file
const getPermission = (reqest) => {
  let group = acl.permissions.filter((permission) => {
    return permission.role == reqest.body.role;
  });
  if(group.length != 0)
  return group[0].permissions.filter(permission => (permission.resource == reqest.originalUrl || permission.resource=='*'));
  else{
      return new Array({permission: []})
  }
};
