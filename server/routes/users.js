const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");

//? Updating a user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSaltSync(10);
        req.body.password = await bcrypt.hashSync(req.body.password, salt);
      } catch (error) {
        res.status(500).send(error);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).send({ msg: "Account has been updated", ...user._doc });
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    return res.status(401).send("You can update only your account");
  }
});

//! Deleting a user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).send("User has been deleted successfully");
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    return res.status(401).send("You can delete only your account");
  }
});

router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username })
    !user && res.status(401).send("No user found");
    const { updatedAt, password, ...other } = user._doc;
    return res.status(201).send(other);
  } catch (error) {
    res.status(500).send(error);
  }
});


//! Get all friends
router.get('/friends/:userId', async (req, res)=>{

  try {
    const user = await User.findById(req.params.userId)
    const friends = await Promise.all(
      user.followings.map((friendId)=>{
        return User.findById(friendId)
      })
    )
    let friendList = []
    friends.map((friend)=>{
      const {_id,username, profilePicture} = friend
      friendList.push({_id,username, profilePicture})
    })
    res.status(200).send(friendList)
    
  } catch (error) {
    res.status(500).send(error.message)
    
  }
})




//* Following a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).send("User has been followed successfully");
      } else {
        res.status(403).send("You already followed this user");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(403).send("You can't follow yourself");
  }
});

//todo Unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).send("User has been unfollowed successfully");
      } else {
        res.status(403).send("You don't follow this user");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(403).send("You can't unfollow yourself");
  }
});

module.exports = router;
