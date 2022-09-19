class Command{
 constructor(json){
     this.jsonArray = json;
     this.tempJsonArray = [];
     
 }

 where(is_where,column_name,criteria){
     if(!is_where){
         this.tempJsonArray = this.jsonArray;

     }else{
         this.tempJsonArray = this.jsonArray.filter(item =>{
     return item[column_name] === criteria;
     })
    }
}

 doSelect(is_where, whereAttr,selectAttr){
    let newRes = [];
if (is_where) {
    this.where(whereAttr.column_name,whereAttr.criteria);
  }
if(selectAttr === '*'){
    return this.tempJsonArray
}


else if(Array.isArray(selectAttr)){
    for(let j  = 0; j < this.tempJsonArray.length;j++){
        let tempRecord = {};
        for(let i = 0; i < selectAttr.length;i++){
           
            tempRecord[selectAttr[i]] = this.tempJsonArray[j][selectAttr[i]];
           
        }
        newRes.push(tempRecord);
    }


}else{
    for(let j  = 0; j < this.tempJsonArray.length;j++){
        let tempRecord = {};
        tempRecord[selectAttr] = this.tempJsonArray[j][selectAttr];
        newRes.push(tempRecord);
    }
}


return newRes;

 }

 doInsert(values){
     console.log(this.jsonArray);
     let newRecord = values;
     newRecord._id = this.jsonArray.length;
    this.jsonArray.push(newRecord);
    return this.jsonArray;
 }
 doDelete(is_where, whereAttr){
    if (is_where) {
        this.where(is_where, whereAttr.column_name,whereAttr.criteria);
      }
      console.log(this.tempJsonArray);
      
      for(let i = 0;i < this.tempJsonArray.length;i++){
          this.tempJsonArray[i] = JSON.stringify(this.tempJsonArray[i])
      }
      
      this.jsonArray = this.jsonArray.filter(record => {
          record = JSON.stringify(record);
          console.log(record);
          
          return this.tempJsonArray.includes(record);
      })
      return this.jsonArray;
 }
 doUpdate(is_where, whereAttr , value){
     function update(file,value){
         for (let i = 0; i < file.length;i++) {
             file[i][value.column_name] = value.criteria;
         }
     }
     this.where(is_where,whereAttr.column_name,whereAttr.criteria);
     update(this.tempJsonArray,value);

     let resJson = this.jsonArray.map(item => {
         const data = this.isTheSameID(item, this.tempJsonArray);
         return data.element;
     })
     return resJson;
 }

isTheSameID(obj,arr){
    arr.forEach(element => {
        if(element._id === obj._id){
            return {status : true, element : element};
        }
    });
    return {status : false, element : obj};
}
}


module.exports = Command;