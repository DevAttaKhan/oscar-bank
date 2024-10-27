import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  FindOneOptions,
  FindOptionsWhere,
  FindOptionsRelationByString,
  FindOptionsRelations,
} from 'typeorm';
import { User } from '@/database/entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(
    where: FindOptionsWhere<User> | FindOptionsWhere<User>[],
    relations?: FindOptionsRelationByString | FindOptionsRelations<User>,
  ) {
    return this.userRepo.findOne({ where, relations });
  }
  findByEmail(email: string, relations?: string[]) {
    return this.userRepo.findOne({
      where: { email },
      relations: relations, // Replace with actual relation names
    });
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
