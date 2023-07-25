import { User } from '../entities/user.entity';

export class UserDto {
  readonly email: string;
  readonly name: string;
  readonly address: string;
  readonly city: string;
  readonly phone_number: string;
  readonly image_url: string;

  constructor(user: User) {
    this.email = user.email;
    this.name = user.name;
    this.address = user.address;
    this.city = user.city;
    this.phone_number = user.phone_number;
    this.image_url = user.image_url;
  }
}
