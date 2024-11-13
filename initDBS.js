
import {connect,end, pool} from './dist/db/index.js';
/**
 *@param sql - 输入sql语句返回promise
 */


const connectionQuery = (sql) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      conn.query(sql, (err,res) => {
        conn.release();
        if(res)console.log("建表成功！！！",res);
      });
    });
  });
};

const  tbOpus=`
CREATE TABLE opus  (
  id int NOT NULL AUTO_INCREMENT,
  userId int NOT NULL,
  time varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  title varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  src varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  intro int NULL DEFAULT NULL,
  collection int NULL DEFAULT 0,
  favor int NULL DEFAULT 0,
  PRIMARY KEY (id) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;
`
const tbComment = `
CREATE TABLE comment  (
  id int NOT NULL AUTO_INCREMENT,
  userId int NOT NULL,
  opusId int NULL DEFAULT NULL,
  level int NULL DEFAULT NULL,
  content varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  time varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  parentId int NULL DEFAULT NULL,
  PRIMARY KEY (id) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;
`
const tbUser=`
CREATE TABLE user  (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  intro varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  avatorUrl varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  vip int NULL DEFAULT 0,
  email varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  password varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  area varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  sex int NULL DEFAULT NULL,
  birthday varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (id) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;
`
connect();
connectionQuery(tbOpus);
connectionQuery(tbComment);
connectionQuery(tbUser);
end()