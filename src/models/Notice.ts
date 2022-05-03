import mongoose, { Document, Schema } from "mongoose";

export interface INotice {
  title: string;
  description: string;
}

export interface INoticeModel extends INotice, Document {}

const NoticeSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<INoticeModel>("Notice", NoticeSchema);
