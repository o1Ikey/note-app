import AuthorModel from "../models/Auth";
import FolderModel from "../models/Folder";

export const resolvers = {
  Query: {
    folders: async (
      _parent: any,
      args: {
        uid: string;
      }
    ) => {
      const folders = await FolderModel.find({
        authorId: args.uid,
      }).sort({
        updatedAt: "desc",
      });
      console.log({ folders });
      return folders;
    },
  },
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
    addFolder: async (
      _parent: any,
      args: {
        uid: string;
        name: string;
      }
    ) => {
      const newFolder = new FolderModel({ ...args, authorId: args.uid });
      await newFolder.save();
      return newFolder;
    },
  },
};
