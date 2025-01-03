# Nest Interface Infrastructure

La idea de este repo es implementar una arquitectura que cumpla con los principios de inversión de dependencia (DIP) y el principio de acoplamiento bajo.


Como dice el DIP:

"Los módulos de alto nivel no deben depender de módulos de bajo nivel. Ambos deben depender de abstracciones. Además, las abstracciones no deben depender de detalles; los detalles deben depender de abstracciones."

---

En nuestro caso, implementamos una arquitectura en users que nos permite intercambiar fácilmente entre diferentes bases de datos y librerias de generación de IDs.
Para esto, es necesario utilizar abstracciones (interfaces) que establezcan los contratos que deben cumplir las implementaciones.
![alt text](/docs/files/image.png)

¿Qué problemas resuelve esto? 
- Mejor mantenimiento del código.
- Evita que cambios en un componente de bajo nivel (los repositorios) afecten a un componente de alto nivel (el userService)
- Fácil testeo. Se puede crear un repositorio mock para probar el funcionamiento de userService sin necesidad de conectarlo directamente a la base de datos.
- Menor acomplamiento. Al no depender directamente de una implementación, se puede cambiar por otra si el proyecto lo requiere, siempre y cuando cumpla el contrato de la abstracción (interface)

---

Nest facilita esta implementación. Aquí una serie de pasos para lograrlo de forma ordenada y clara:

1) Creamos la abstracción, es decir, la interface que contendrá los contratos que nuestras implementaciones deben cumplir:

```
export interface IUserRepository {
  registerUser: (dto: CreateUserRepositoryDto) => Promise<UserDto>;
  getById: (id: string) => Promise<UserDto>;
  updateById: (id: string, user: UpdateUserDto) => Promise<UserDto>;
  deleteById: (id: string) => Promise<void>;
}

```

2) Creamos una implementación, en este caso, un service que utiliza mongo como base de datos.

```
@Injectable()
export class UserMongoRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async registerUser(dto: CreateUserDto): Promise<UserDto> {
    return  await this.userModel.create(dto);
  }

  async getById(id: string): Promise<UserDto> {
    return await this.userModel.findById(id);
  }

  async updateById(id: string, user: UpdateUserDto): Promise<UserDto> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    }).exec();
    if (updatedUser) {
      updatedUser.password = undefined; // Elimina la contraseña del objeto retornado
    }
    return updatedUser;
  }

  async deleteById(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }
}
```


3) Dentro de `user.module.ts` tenemos que crear el proveedor que inyectará nuestra implementación:

```
 providers: [
    UsersService,
    { provide: 'UserRepository', useClass: UserMongoRepository }, 
    {provide:'IdGenerator',useClass:UuidService}
  ],
```
Si queremos utilizar otra implementación, solo cambiamos la clase que apuntamos en `useClass`

4) Inyectamos la implementación dentro de nuestro service para poder utilizarla

```
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
    @Inject('IdGenerator') private readonly idGenerator: IIdGenerator,
  ) {}

```
Como se puede observar, el tipado de `userRepository` y `idGenerator` son las abstracciones, no las implementaciones, esto es lo que nos dá la flexibilidad y el desacomplamiento de una implementación específica.
