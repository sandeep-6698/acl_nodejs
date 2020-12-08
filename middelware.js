const acl = require("./acl");
const url = require('url')
//check that user have permission for this route and method
exports.havePermission = (req, res, next) => {
  var url = req.originalUrl;

  if(url.substr(-1) === '/') 
    url = url.substr(0, url.length - 1);
 
  if(req.params)
    url = url.split('/').slice(0,-(Object.values(req.params).length)).join('/');

  if (req.body.role !== undefined) {
    const groupPermission = getPermission(url,req.body.role)[0];
    if (groupPermission.resource == url || groupPermission.resource=='*') {
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
const getPermission = (url,role) => {
  console.log(url,role)
  let group = acl.permissions.filter((permission) => {
    return permission.role == role;
  });
  if(group.length != 0)
  return group[0].permissions.filter(permission => (permission.resource == url || permission.resource=='*'));
  else{
      return new Array({permission: []})
  }
};
