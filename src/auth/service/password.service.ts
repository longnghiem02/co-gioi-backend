import * as bcrypt from 'bcrypt';

export class PasswordService {
  private salt = bcrypt.genSaltSync(10);

  async hashPassword(password: string) {
    const hash = await bcrypt.hash(password, this.salt);
    return hash;
  }

  async comparePassword(password: string, hash: string) {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }
}
