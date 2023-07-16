const express = require("express");
const router = express.Router();
const Addcourse = require("../models/Addcourse");
const redis= require('redis');
const util = require('util');

const redisUrl = "redis://127.0.0.1:6379"
const client = redis.createClient(redisUrl)

client.set=util.promisify(client.set)
client.get=util.promisify(client.get)

router.get("/", async (req, res) => {
  try {
    const addcourse = await Addcourse.find();
    res.status(200).json({
      data: addcourse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
//Redis-Caching
const courseId = req.params.id;
    const cachedCourse= await client.get(`course-${courseId}`)
  if(cachedCourse){
    const course = JSON.parse(cachedCourse);
    return res.status(200).json({
      data: course,
    });
  }
  const course = await Addcourse.findById(courseId);
  if (!course) {
    return res.status(404).json({
      message: "Course not found",
    });
  }
  
  await client.set(`course-${courseId}`, JSON.stringify(course));

  //over
   res.status(200).json({
      data: addcourse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const addcourse = new Addcourse(req.body);
    const newaddcourse = await addcourse.save();
    res.status(200).json({
      data: newaddcourse,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});


router.post("/login",async (req, res)=>{
  try{
    const newUser=await Addcourse.findOne({email:req.body.email})
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
    const addcourse = await Addcourse.findById(req.params.id);

    if (!addcourse) {
      return res.status(400).json({ message: "Addcourse does not exist" });
    }
    addcourse.email = req.body.email || addcourse.email;
    addcourse.password = req.body.password || addcourse.password;
    const updatedAddcourse = await addcourse.save();

    res.status(200).json({
      data: updatedAddcourse,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Addcourse.findByIdAndRemove(req.params.id);

    res.status(200).json({
      message: "Addcourse is deleted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
