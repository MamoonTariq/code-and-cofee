import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDTO, RegisterDTO } from 'src/auth/auth.dto';
import { User } from 'src/types/user';
import * as bcrypt from 'bcrypt';
import { Payload } from 'src/types/payload';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModal: Model<User>) {}

  private sanitizeUser(user: User) {
    return user.depopulate('password');
  }

  async create(userDTO: RegisterDTO) {
    const { username } = userDTO;

    const user = await this.userModal.findOne({ username });
    if (user) {
      throw new HttpException('User Already Exist', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModal(userDTO);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  async findByLogin(userDTO: LoginDTO) {
    const { username, password } = userDTO;
    const user = await this.userModal.findOne({ username });
    if (!user) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }

    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async findByPayload(payload: Payload) {
    const { username } = payload;
    return await this.userModal.findOne({ username });
  }
}
