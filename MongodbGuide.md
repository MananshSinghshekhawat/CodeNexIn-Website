# MongoDB Guide for CodeNexIn Backend

## 1. Useful Links

- [MongoDB Cloud Login](https://account.mongodb.com/account/login?n=https%3A%2F%2Fcloud.mongodb.com%2Fv2%2F68d5f4c083d5ca4c5eee0df1&nextHash=%23metrics%2FreplicaSet%2F68d5f586a2fb152f4e3a4fa3%2Fexplorer%2Fcodenexin%2Fclients%2Ffind&signedOut=true)
- [MongoDB Database Tools Download](https://www.mongodb.com/try/download/database-tools)

---

## 2. Exporting Your Database (Backup)

To export your MongoDB database from Atlas (cloud):

```bash
mongodump --uri="mongodb+srv://arjunashokbgl_db_user:zVVOI4S0LyO7l3qZ@cluster0.c08tbxe.mongodb.net/codenexin" --out=./db_export
```

- This will create a folder `db_export` containing your database dump.

---

## 3. Restoring Your Database (Local Import)

To restore your database to a local MongoDB instance:

```bash
mongorestore --uri="mongodb://localhost:27017/codenexin" ./db_export/codenexin
```

- Make sure MongoDB is running locally before running this command.

---

## 4. Common MongoDB CLI Commands

- **Connect to MongoDB shell:**
  ```bash
  mongosh "mongodb://localhost:27017/codenexin"
  ```
- **Show databases:**
  ```js
  show dbs
  ```
- **Use a database:**
  ```js
  use codenexin
  ```
- **Show collections:**
  ```js
  show collections
  ```
- **Find documents:**
  ```js
  db.clients.find()
  ```

---

## 5. Useful MongoDB Resources

- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [MongoDB Compass (GUI)](https://www.mongodb.com/products/compass)

---

## 6. Notes

- Always keep your database credentials secure.
- Regularly backup your database using `mongodump`.
- Restore backups using `mongorestore` when needed.
- For production, use environment variables for sensitive connection strings.

---
