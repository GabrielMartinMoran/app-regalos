import { User } from '../models/user.js';
import { WebApiRepository } from './web-api-repository.js';

export class UserRepository extends WebApiRepository {
    
    _controller = '/users';

    async getAll() {
        const users = await this._get(`${this._controller}`)
        return users.map((user) => User.fromObject(user));
    }

    async getByUsername(username) {
        const user = await this._get(`${this._controller}/${username}`)
        return User.fromObject(user);
    }
}