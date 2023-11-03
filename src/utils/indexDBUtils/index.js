/**
 * @deprecated 引入dexie 代替工具类
 * 
 * @description 打开数据库
 * @param {object} dbName 数据库的名字
 * @param {string} storeName 仓库名称
 * @param {string} version 数据库的版本
 * @return {object} 该函数会返回一个数据库实例
 */
export function openDB(dbName, storeName, version = 1) {
  return new Promise((resolve, reject) => {
    //  兼容浏览器
    const indexedDB =
      window.indexedDB ||
      window.webkitIndexedDB;

    let db;
    // 打开数据库，若没有则会创建
    const request = indexedDB.open(dbName, version);
    // 数据库打开成功回调
    request.onsuccess = function (event) {
      db = event.target.result; // 数据库对象
      resolve(db);
    };
    // 数据库打开失败的回调
    request.onerror = function (event) {
      console.log("数据库打开报错");
    };
    // 数据库有更新时候的回调
    request.onupgradeneeded = function (event) {
      // 数据库创建或升级的时候会触发
      db = event.target.result; // 数据库对象
      // 创建存储库
      db.createObjectStore(storeName, {
        keyPath: 'folderkey', // 这是主键
        // autoIncrement: true // 实现自增
      });

      //加入所需字段
      //...
    };
  });
}

/**
 * @deprecated 引入dexie 代替工具类
 * 
 * @description 新增数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} data 数据
 */
export function upsertData(db, storeName, data, onSuccess, onError) {
  const request = db
    .transaction([storeName], "readwrite") // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
    .objectStore(storeName) // 仓库对象
    .put(data);

  request.onsuccess = function (event) {
    if (onSuccess) onSuccess();
  };

  request.onerror = function (event) {
    if (onError) onError();
  };
}

/**
 * @deprecated 引入dexie 代替工具类
 * 
 * @description 通过主键读取数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} key 主键值
 */
export function getDataByKey(db, storeName, key) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName]); // 事务
    const objectStore = transaction.objectStore(storeName); // 仓库对象
    const request = objectStore.get(key); // 通过主键获取数据

    request.onerror = function (event) {
      console.info("读取indexedDB失败");
    };

    request.onsuccess = function (event) {
      resolve(request.result);
    };
  });
}

/**
 * @deprecated 引入dexie 代替工具类
 * 
 * @description 通过主键删除数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {object} id 主键值
 */
function deleteDB(db, storeName, id) {
  const request = db
    .transaction([storeName], "readwrite")
    .objectStore(storeName)
    .delete(id);

  request.onsuccess = function () {
    console.log("数据删除成功");
  };

  request.onerror = function () {
    console.log("数据删除失败");
  };
}

/**
 * @deprecated 引入dexie 代替工具类
 * 
 * @description 关闭数据库
 * @param {object} db 数据库实例
 */
export function closeDB(db) {
  db.close();
}