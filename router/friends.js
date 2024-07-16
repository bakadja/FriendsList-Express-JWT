const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};


// GET request: Retrieve all friends
router.get("/",(req,res)=>{

  // send the friends object as response
  res.send(friends)
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email",(req,res)=>{
  const { email } = req.params;

  console.log(email)
  const friend = friends[email];
  if(friend){
    res.send(friend);
  }
  else{
    res.status(404).send("Friend not found");
  }
});


// POST request: Add a new friend
 router.post("/", (req, res) => {

    // Check if email is provided in the request body
    if (req.body.email) {
        // Create or update friend's details based on provided email
        friends[req.body.email] = {
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "DOB": req.body.DOB
        };
    }
    // Send response indicating user addition
    res.send("The user" + (' ') + (req.body.firstName) + " Has been added!");
});



// PUT request: Update the details of a friend with email id
router.put("/:email", function(req, res) {
  // Extract email parameter from request URL
  const email = req.params.email;
  let friend = friends[email];  // Retrieve friend object associated with email

  if (friend) {  // Check if friend exists
      const {firstName, lastName, DOB}  = req.body;
    
      // Update DOB if provided in request body
      if(!firstName || !lastName || !DOB){
        return res.status(400).send("Please provide firstName, lastName and DOB");
      }

      // Update friend details
      friends[email] = {
          ...friend,
          firstName,
          lastName,
          DOB
      };
      res.send(`Friend with the email ${email} updated.`);
  } else {
      // Respond if friend with specified email is not found
      res.send("Unable to find friend!");
  }
});


// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
   const email = req.params.email;

    // Check if friend exists
    if (friends[email]) {
        delete friends[email];  // Delete friend
        res.send(`Friend with the email ${email} deleted.`);  // Send success response
    } else {
        res.status(404).send("Friend not found");  // Send failure response
    }
});

module.exports=router;
