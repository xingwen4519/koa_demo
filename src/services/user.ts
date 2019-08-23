import User from '../models/user';
import { promises } from 'fs';

export default class UserService {
    static findAll() {
        return  User.findAll();
    }
} 