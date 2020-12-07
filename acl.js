//for remove all permission, pass an empty arrya
//only * can define in string
exports.permissions = [
    {
      "role": "admin",
      "permissions": [
        {
          "resource": "*",
          "methods": "*"
        }
      ]
    },
    {
      "role": "user",
      "permissions": [
        {
          "resource": "/api/",
          "methods": ["POST","GET","PUT"],
        },
        {
            "resource": "/api/get",
            "methods": ["POST","GET","PUT"],
          }
      ]
    }
  ]
