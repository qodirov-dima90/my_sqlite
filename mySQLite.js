const csvToJson = require('convert-csv-to-json');
const hf = require('./hf');
const Command = require('./Command')
class MySQLiteRequest {
    constructor(){
this.requestState = {
    is_select : false,
    is_insert : false,
    is_where : false,
    is_delete : false,
    is_update : false
}
this.selectAttr = {};
this.whereAttr = {column_name : "", criteria : ""};
this.table_name = null;
this.value = {};

    }
    from(table_name){
      this.table_name = table_name;
      return this;
    }
    select(column_name){
      this.requestState.is_select = true;
      this.selectAttr = column_name;
      return this;
    }
    where(column_name, criteria){
        this.requestState.is_where = true;
        this.whereAttr.column_name = column_name;
        this.whereAttr.criteria = criteria;
        return this;
    }
    insert(table_name){
        this.requestState.is_insert = true;
        this.table_name = table_name;
        return this;
    }
    values(data){
    this.values = data;
        return this;
    }
   update(table_name){
       this.requestState.is_update = true;
       this.table_name = table_name;
       return this;
   } 
   set(data){
       this.value = data;
       return this;
   }
   delete(){
       this.requestState.is_delete = true;
       return this;
   }
   run(){
      let json = csvToJson.getJsonFromCsv(this.table_name);
      json = hf.makeJson(json);
      const command = new Command(json);
      let res = [];
      
      if (this.requestState.is_select) {
          //select
        res = command.doSelect(this.requestState.is_where,this.whereAttr,this.selectAttr);
      }
       else if (this.requestState.is_delete) {
        res = command.doDelete(this.requestState.is_where,this.whereAttr);
      }
       else if (this.requestState.is_update) {
          res = command.doUpdate(this.requestState.is_where, this.whereAttr, this.value)
      }
       else if (this.requestState.is_insert) {
          res = command.doInsert(this.value);
      }
      else{
          console.log("Command not found");
          
      }
      console.log(res);
    converter.json2csv(res,(err,csv) => {
        if(err){
            console.log(err);
            
        }
        else{
            const fs = require('fs');
            fs.writeFileSync(this.table_name, csv);
            console.log("succesfull update of file");
            
        }
    })
      
    }
}/*
let a = new MySQLiteRequest();
a = a.update('data.csv');
a = a.where('name', 'Akrom Umarov');
a = a.values({column_name : 'name',criteria : 'Updated'});
/*a = a.insert('data.csv');
a = a.values({name: 'Akrom Umarov',
    year_start: '1991',
    year_end: '1995',
    position: 'aa',
    height: '6-10',
    weight: '240',
    birth_date: '"Iyun 24',
    collage: ' 1969"',



});

a.run();*/

module.exports = MySQLiteRequest;
