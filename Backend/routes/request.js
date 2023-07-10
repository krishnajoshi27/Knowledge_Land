const express = require("express");
const router = express.Router();
const Request = require("../models/Request");

router.get("/", async (req, res) => {
  try {
    const request = await Request.find();
    res.status(200).json({
      data: request,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    res.status(200).json({
      data: request,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const request = new Request(req.body);
    const newrequest = await request.save();
    res.status(200).json({
      data: newrequest,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});


router.post("/login", async (req, res) => {
  try {
    const newUser = await Request.findOne({ email: req.body.email })
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
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(400).json({ message: "Request does not exist" });
    }
    request.to = req.body.to || request.to;
    request.from = req.body.from || request.from;
    request.status = req.body.status || request.status;
    request.mode = req.body.mode || request.mode;
    request.ambience = req.body.ambience || request.ambience;
    request.course = req.body.course || request.course;
    const updatedRequest = await request.save();

    res.status(200).json({
      data: updatedRequest,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Request.findByIdAndRemove(req.params.id);

    res.status(200).json({
      message: "Request is deleted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
