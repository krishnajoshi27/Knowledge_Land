const express = require("express");
const router = express.Router();
const Userlist = require("../models/Userlist");

router.get("/", async (req, res) => {
  try {
    const userlist = await Userlist.find();
    res.status(200).json({
      data: userlist,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userlist = await Userlist.findById(req.params.id);

    res.status(200).json({
      data: userlist,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const userlist = new Userlist(req.body);
    const newuserlist = await userlist.save();
    res.status(200).json({
      data: newuserlist,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});


router.post("/login",async (req, res)=>{
  try{
    const newUser=await Userlist.findOne({email:req.body.email})
    if(newUser){
      if(newUser.password===req.body.password){
        res.status(200).json({
          msg:"ok",
          data:newUser,
        })

      }else{
        res.status(200).json({
          msg:"inccorect password",
        })
      }
    }else{
      res.status(200).json({
        msg:"invalid user"
      })
    }
  }catch (err){
    console.log(err)
    res.status(500).send("server error")
  }
})

router.put("/:id", async (req, res) => {
  try {
    const userlist = await Userlist.findById(req.params.id);

    if (!userlist) {
      return res.status(400).json({ message: "Userlist does not exist" });
    }
     userlist.lastname = req.body.lastname || userlist.lastname;
    userlist.email = req.body.email || userlist.email;
    userlist.password = req.body.password || userlist.password;
    const updatedUserlist = await userlist.save();

    res.status(200).json({
      data: updatedUserlist,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Userlist.findByIdAndRemove(req.params.id);

    res.status(200).json({
      message: "Userlist is deleted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
