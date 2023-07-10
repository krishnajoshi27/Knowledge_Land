const express = require("express");
const router = express.Router();
const Addstudents = require("../models/Addstudents");

router.get("/", async (req, res) => {
  try {
    const addstudents = await Addstudents.find();
    res.status(200).json({
      data: addstudents,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const addstudents = await Addstudents.findById(req.params.id);

    res.status(200).json({
      data: addstudents,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const addstudents = new Addstudents(req.body);
    const newaddstudents = await addstudents.save();
    res.status(200).json({
      data: newaddstudents,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});


router.post("/login", async (req, res) => {
  try {
    const newUser = await Addstudents.findOne({ email: req.body.email })
    if (newUser) {
      if (newUser.password === req.body.password) {
        res.status(200).json({
          msg: "ok",
          data: newUser,
        })

      } else {
        res.status(200).json({
          msg: "inccorect password",
        })
      }
    } else {
      res.status(200).json({
        msg: "invalid user"
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).send("server error")
  }
})

router.put("/:id", async (req, res) => {
  try {
    const addstudents = await Addstudents.findById(req.params.id);
    if (!addstudents) {
      return res.status(400).json({ message: "Addstudents does not exist" });
    }
    addstudents.name = req.body.name || addstudents.name;
    addstudents.email = req.body.email || addstudents.email;
    addstudents.password = req.body.password || addstudents.password;
    addstudents.grade = req.body.grade || addstudents.grade;
    addstudents.areaOfStudy = req.body.areaOfStudy || addstudents.areaOfStudy;
    addstudents.skills = req.body.skills || addstudents.skills;
    addstudents.language = req.body.language || addstudents.language;
    addstudents.qualification = req.body.qualification || addstudents.qualification;
    addstudents.specialization = req.body.specialization || addstudents.specialization;
    addstudents.teachingExp = req.body.teachingExp || addstudents.teachingExp;
    addstudents.type = req.body.type || addstudents.type;
    addstudents.addData = req.body.addData || addstudents.addData;
    addstudents.timing = req.body.timing || addstudents.timing;
    addstudents.videoLink = req.body.videoLink || addstudents.videoLink;
    addstudents.profilePhoto = req.body.profilePhoto || addstudents.profilePhoto;
    const updatedAddstudent = await addstudents.save();

    res.status(200).json({
      data: updatedAddstudent,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Addstudents.findByIdAndRemove(req.params.id);

    res.status(200).json({
      message: "Addstudents is deleted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
