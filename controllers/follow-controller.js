const { prisma } = require("../prisma/prisma-client");

const FollowController = {
  followUser: async (req, res) => {
    const { followingId } = req.body;
    const userId = req.user.userId;

    if (followingId === userId) {
      return res
        .status(500)
        .json({ error: "Вы не можете подписаться на самого себя" });
    }

    try {
      const existingSubscription = await prisma.follows.findFirst({
        where: {
          AND: [{ followerId: userId }, { followingId }],
        },
      });

      if (existingSubscription) {
        return res.status(400).json({ error: "Подспика уже существует" });
      }

      await prisma.follows.create({
        data: {
          follower: { connect: { id: userId } },
          following: { connect: { id: followingId } },
        },
      });

      res.status(201).json({ message: "Подписка  успешно создана" });
    } catch (error) {
      console.error("Follow error", error);

      return res.status(500).json({ error: "Internal server error" });
    }
  },
  unfollowUser: async (req, res) => {
    res.send("unfollowUser");
  },
};

module.exports = FollowController;
