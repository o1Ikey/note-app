import { GraphQLScalarType } from "graphql";
import AuthorModel from "../models/Auth";
import FolderModel from "../models/Folder";
import NoteModel from "../models/Note";

export const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.toISOString();
    },
  }),

  Query: {
    folders: async (
      _: any,
      args: {
        uid: string;
      }
    ) => {
      const folders = await FolderModel.find({
        authorId: args.uid,
      }).sort({
        updatedAt: "desc",
      });
      return folders;
    },
    folder: async (
      _: any,
      args: {
        folderId: string;
      }
    ) => {
      const folderId = args.folderId;
      const foundFolder = await FolderModel.findById(folderId);
      return foundFolder;
    },
    note: async (
      _: any,
      args: {
        noteId: string;
      }
    ) => {
      const noteId = args.noteId;
      const note = await NoteModel.findById(noteId);
      return note;
    },
  },

  Folder: {
    author: async (parent: {
      _id: string;
      name: string;
      authorId: string;
      createAt: Date;
      updateAt: Date;
    }) => {
      const authorId = parent.authorId;
      const author = await AuthorModel.findOne({
        uid: authorId,
      });
      return author;
    },
    notes: async (
      parent: {
        _id: string;
      } & {
        name: string;
        authorId: string;
        createAt: Date;
        updateAt: Date;
      }
    ) => {
      const notes = await NoteModel.find({
        folderId: parent._id,
      }).sort({
        updatedAt: "desc",
      });
      return notes;
    },
  },
  Mutation: {
    register: async (
      _: any,
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
      _: any,
      args: {
        uid: string;
        name: string;
      }
    ) => {
      const newFolder = new FolderModel({ ...args, authorId: args.uid });
      await newFolder.save();
      return newFolder;
    },
    addNote: async (
      _: any,
      args: {
        content: string;
        folderId: string;
      }
    ) => {
      const newNote = new NoteModel(args);
      await newNote.save();
      return newNote;
    },
    updateNote: async (
      _: any,
      args: {
        id: string;
        content: string;
      }
    ) => {
      const noteId = args.id;
      const note = await NoteModel.findByIdAndUpdate(
        noteId,
        {
          content: args.content,
        },
        {
          new: true,
        }
      );

      return note;
    },
  },
};
