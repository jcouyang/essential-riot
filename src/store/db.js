function DB(){}

DB.prototype.getItems = function(){
  return new Promise((resolve, reject)=>{
    setTimeout(()=>resolve({
      title: 'I want to behave item!',
      items: [
        { title: 'Avoid excessive coffeine', done: true },
        { title: 'Hidden item', hidden: true },
        { title: 'Be less provocative' },
        { title: 'Be nice to people' }
      ]
    }), 3000);
  });
};

DB.prototype.login = function(prop){
  return new Promise((resolve, reject)=>{
    let res = false
    if(prop.username === 'oyang' && prop.password === 'lulu')
      res = true;
    setTimeout(()=>resolve({success: res, error:null}), 3000);
  });
}
module.exports = new DB;
