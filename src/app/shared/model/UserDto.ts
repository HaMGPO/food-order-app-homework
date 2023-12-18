export class UserDto{
  id!: number;
  tipoUsuario!: number;
  estado!: number;
  username!: string;
  password!: string;
  jwt?: string;
}
