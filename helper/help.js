var crypto =require('crypto')
var model = require('../models')

class role{
  constructor(menu){
   this.role=menu.role;
   this.menu=menu.menu;
  }
}

class help {
 static hasedPswd (pswd,salt){
    return crypto.createHmac('sha256',salt)
         .update(pswd)
         .digest('hex')
 }

 static isAuthenticated(user,password){
    if(help.hasedPswd(password,user.salt)==user.password){
      return true
    }else{
      false
    }
 }

 static rolemenu(inrole){
 let roles=[new role({role:'admin',menu:[{name:'manage user',link:'/users/manageuser'},{name:'browse',link:'/browse'},{name:'logout',link:'/users/logout'}] }),
            new role({role:'user',menu:[{name:'edit user',link:'/users/edit'},{name:'browse',link:'/browse'},{name:'logout',link:'/users/logout'}]}) ]
let index;
for (var i = 0; i < roles.length; i++) {
   if (roles[i].role==inrole){
     index=i;
     return roles[i].menu;
   }
}

}


}

//console.log(help.hasedPswd('asaadada','saees'));
module.exports = help;
