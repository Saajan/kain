const resolvers = {
  Query: {
    async Broadcasts(root, args, ctx) {
      const broadcasts = await ctx.db.select().from("broadcasts");
      return broadcasts;
    },
    async Broadcast(root, args, ctx) {
      const broadcast = await ctx.db("broadcasts").where("id", args.id);
      return broadcast[0];
    },
  },
  Mutation: {
    async addBroadcast(root, args, ctx) {
      const { title, description, type, date } = args.message;
      const [id] = await ctx.db("broadcasts").insert({
        title,
        description,
        type,
        date,
      });
      const newBroadcast = await ctx.db("broadcasts").where("id", id);
      return newBroadcast[0];
    },
  },
};

module.exports = resolvers;