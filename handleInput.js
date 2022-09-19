const MySQLiteRequest = require("./mySQLite");

class HandleInput {
    constructor(){
        this.request = new MySQLiteRequest();
    }

    proccess(array){
        if(array[0] === "SELECT"){

            let selectAttr = array[1].split(",");
            if(selectAttr.length === 1){
                selectAttr = selectAttr[0];
            }
            let tableName = array[3];
            let whereAttr = null;
            if(array.length >= 5){
                whereAttr = {};
                const whereData = array[5].split(".");
                whereAttr.column = whereData[0];
                whereAttr.criteria = whereData[1];
            }
            this.request.select(selectAttr);
            this.request.from(tableName);
            if(whereAttr !== null){
                this.request.where(whereAttr.column,whereAttr.criteria);
            }
        }

        else if(array[0] === "UPDATE"){
            this.request.update(array[1]);
        }
        else if(array[0] === "INSERT"){
            let table_name = array[2];
            let values = array[4].slice(1, array[4].length - 1).split(",");
            this.request.insert(table_name);
            this.request.values({name : 
                values[0], email : values[1],grade : values[2],blog : values[3]});
            
    }
    else if(array[0] === "DELETE"){
        this.request.delete();
        this.request.from(array[2]);
        let whereAttr = null;

        if(array.length >= 5){
            whereAttr = {};
            const whereData = array[4].split(".");
            whereAttr.column = whereData[0];
            whereAttr.criteria = whereData[1];
        }
        if(whereAttr !== null){
            this.request.where(whereAttr.column,whereAttr.criteria);
        }
    }
    this.request.run();
}
}
module.exports = HandleInput;