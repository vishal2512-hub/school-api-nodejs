const express = require("express");
const router = express.Router();
const db = require("../db");

router.post('/addSchool', (req, res) => {
    const {name , address , latitude, longitude} = req.body;

    if( !name || !address || !longitude || !longitude ) {
        return res.status(400).json({ error : "All field are required"})
    }

    const query = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
    db.query(query , [name , address , latitude , longitude] , (err , result) => {
        if(err) return res.status(500).json({ error : err.message});
        res.status(201).json({ message: "School added successfully", schoolId: result.insertId });
    })
})

router.get("/listSchools", (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Latitude and Longitude are required" });
  }

  const query = `
    SELECT *, 
    (6371 * acos(
      cos(radians(?)) * cos(radians(latitude)) * 
      cos(radians(longitude) - radians(?)) + 
      sin(radians(?)) * sin(radians(latitude))
    )) AS distance 
    FROM schools 
    ORDER BY distance ASC
  `;

  db.query(query, [latitude, longitude, latitude], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

module.exports = router;











module.exports = router;
