
 import Dexie from 'dexie';


 export const db = new Dexie("favoritesFolder");
 
 export const createDb =()=>{
    db.version(1).stores({
       "favoritesFolder":'++id, typeName'
    });
    db.version(1).stores({
        "favoritesItem":"++id, forderId, url, name , cover, typeName",
    });
 }

 export const upsertFavoritesFolder = (data)=>{
    try{
        db["favoritesFolder"].put(data);
    }catch(error){
        console.info("Error: DB insert",error);
    }
 }

 export const upsertFavoritesItem = (data)=>{
    try{
        db["favoritesItem"].put(data);
    }catch(error){
        console.info("Error: DB insert",error);
    }
 }

 export const deleteFavoritesItem = (key)=>{
    try{
        db["favoritesItem"].delete(key);
    }catch(error){
        console.info("Error: DB delete",error);
    }
 }

 export const deleteFavoritesFolder = (key)=>{
    try{
        db["favoritesFolder"].delete(key);
    }catch(error){
        console.info("Error: DB delete",error);
    }
 }