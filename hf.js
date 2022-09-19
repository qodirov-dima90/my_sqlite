const makeJson = (jsonArray) =>{
    let newJsonArray = [];
    for(let i = 0;i < jsonArray.length;i++ ){
        let keys = Object.keys(jsonArray[i]);
        let values = jsonArray[i][keys[0]].split(",");
        keys = keys[0];
        keys = keys.split(",");
       
        let jsonObj = {};

        for(let i = 0; i < keys.length;i++){
           jsonObj[keys[i]] = values[i]; 

        }

        jsonObj._id = i;
        newJsonArray.push(jsonObj);
    }
    return newJsonArray;
}

module.exports = {
    makeJson
}