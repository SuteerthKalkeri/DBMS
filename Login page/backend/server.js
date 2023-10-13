import express from "express";
import mysql2 from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "Suteerth@10",
  database: "ecommerce"
})

db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
  
    console.log('Connected to the database');
  });

  app.post('/signup', (req, res) => {
    // Query the database to find the highest customer ID
    const maxIDSQL = 'SELECT MAX(Customer_id) AS maxID FROM customer';
    db.query(maxIDSQL, (maxIDErr, maxIDResults) => {
        if (maxIDErr) {
            return res.json('Error getting max customer ID');
        }
        const maxCustomerID = maxIDResults[0].maxID;
        let nextCustomerNumber = 1;
        if (maxCustomerID) {
            const maxNumber = parseInt(maxCustomerID.substring(1), 10); 
            nextCustomerNumber = maxNumber + 1;
        }
        const paddedCustomerNumber = nextCustomerNumber.toString().padStart(6, '0');
        const newCustomerID = `C${paddedCustomerNumber}`;
        const sql = 'INSERT INTO customer(`Customer_id`, `Name`, `c_email`, `c_pass`, `Address`, `Phone_no`) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [newCustomerID, req.body.name, req.body.email, req.body.password, req.body.address, req.body.phone.toString()];

        db.query(sql, values, (err, data) => {
            if (err) {
                return res.json('Error');
            }
            return res.json(data);
        });
    });
});

app.post('/login', (req, res) => {
        const sql = 'SELECT * FROM customer WHERE `c_email` =  ? AND `c_pass` = ?';
        db.query(sql, [req.body.email,req.body.password], (err, data) => {
            if (err) {
                return res.json('Error');
            }
            if(data.length > 0) {
                return res.json("Success");
            } else{
                return res.json("Fail");
            }
        });
    });

app.listen(8081, () => {
    console.log("listening");
})