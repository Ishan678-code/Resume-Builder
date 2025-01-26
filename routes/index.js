const express = require("express");
const cors = require("cors");

// Import the route files
const userRoutes = require("../routes/userRoutes");
const userFetchRoutes = require("../routes/userfetchroute");
const userUpdateRoutes = require("../routes/userupdateroute");
const Resumeroute=require("../routes/Resumeroute");
const userDeleteRoutes=require("../routes/userdeleteroute");


const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());


app.use("/", userRoutes);         
app.use("/", userFetchRoutes);    
app.use("/", userUpdateRoutes);   
app.use("/",Resumeroute ); 
app.use("/",userDeleteRoutes ); 



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});






