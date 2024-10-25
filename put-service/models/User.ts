import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    password: string;
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

const User = model<IUser>('User', UserSchema);

export default User;
