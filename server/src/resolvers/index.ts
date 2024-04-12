import AuthorModel from "../models/Auth";

export const resolvers = {
  Mutation: {
    register: async (
      _parent: any,
      args: {
        uid: string;
        name: string;
      }
    ) => {
      const foundUser = await AuthorModel.findOne({ uid: args.uid });
      if (!foundUser) {
        const newUser = new AuthorModel(args);
        await newUser.save();
        return newUser;
      }
      return foundUser;
    },
  },
};
