# To Do List
## Requirement
- API KEY : ApiKeyGCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj
## Database
### MySql
![335956412_886576025760498_5589930675801656828_n](https://user-images.githubusercontent.com/87811387/224975091-cafffcaa-bda7-4a35-a36b-29663fbd4314.png)

![336019315_2333863846795026_6530746572192490288_n](https://user-images.githubusercontent.com/87811387/224975100-055f38cb-17b5-4239-88c7-c0b1f729245e.png)


### Redis
![336209303_594737415581906_8434204677259970474_n](https://user-images.githubusercontent.com/87811387/224975905-bada3c66-41c6-4426-97f9-9015e56beca1.png)

### CI/CD 


### Structure 
```
.
├── common
│   ├── apiResponse
│   │   ├── coreResponse.ts
│   │   ├── index.ts
│   │   ├── messageApiResponse.ts
│   │   └── modelApiResponse.ts
│   ├── code
│   │   └── index.ts
│   ├── constants
│   │   ├── apiKey.ts
│   │   ├── pagination.ts
│   │   └── redis.ts
│   ├── exception
│   │   └── index.ts
│   ├── repositoryOptions
│   │   └── index.ts
│   ├── types
│   │   └── index.ts
│   └── utils
│       ├── assert.ts
│       ├── customRepository.util.ts
│       └── helper.ts
├── config
│   ├── api.config.ts
│   ├── index.ts
│   ├── jwt.config.ts
│   ├── rateLimiter.config.ts
│   ├── redis.config.ts
│   └── typeOrm.config.ts
├── decorators
│   ├── httpUser.ts
│   └── validator
│       ├── index.ts
│       ├── isBefore.ts
│       └── isEnumValue.ts
├── enums
│   ├── apiKey.enum.ts
│   └── todo.enum.ts
├── exceptionFilter
│   ├── httpExceptionFilter.ts
│   └── index.ts
├── guard
│   ├── apiKey.guard.ts
│   ├── index.ts
│   ├── jwtAccessToken.guard.ts
│   ├── jwtRefreshToken.guard.ts
│   └── local.guard.ts
├── interceptors
│   ├── httpLoggingInterceptor.ts
│   └── index.ts
├── loaders
│   ├── moduleLoad
│   │   ├── infrastructure.module.ts
│   │   ├── root.module.ts
│   │   └── service.module.ts
│   └── server.ts
├── main.ts
├── modules
│   ├── auth
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── documentation
│   │   │   ├── model
│   │   │   │   ├── accessToken.model.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── token.model.ts
│   │   │   │   └── user.model.ts
│   │   │   ├── request
│   │   │   │   ├── index.ts
│   │   │   │   └── login.request.ts
│   │   │   └── response
│   │   │       ├── accessToken.response.ts
│   │   │       ├── index.ts
│   │   │       ├── logout.response.ts
│   │   │       ├── register.response.ts
│   │   │       └── token.response.ts
│   │   ├── dtos
│   │   │   ├── createUser.dto.ts
│   │   │   ├── index.ts
│   │   │   └── refreshToken.dto.ts
│   │   ├── entities
│   │   │   ├── apiKey.entity.ts
│   │   │   ├── index.ts
│   │   │   └── user.entity.ts
│   │   ├── interfaces
│   │   │   ├── payloads
│   │   │   │   ├── jwt.payload.ts
│   │   │   │   └── user.payload.ts
│   │   │   ├── requests
│   │   │   │   └── requestUser.request.ts
│   │   │   └── responses
│   │   │       └── reponseLogout.response.ts
│   │   ├── passport
│   │   │   ├── apiKey.strategy.ts
│   │   │   ├── index.ts
│   │   │   ├── jwtAccessToken.strategy.ts
│   │   │   ├── jwtRefreshToken.strategy.ts
│   │   │   └── local.strategy.ts
│   │   └── repository
│   │       ├── apiKey.repository.ts
│   │       ├── index.ts
│   │       └── user.repository.ts
│   └── todos
│       ├── documentation
│       │   ├── model
│       │   │   ├── index.ts
│       │   │   ├── listToDoPagination.model.ts
│       │   │   ├── pagination.model.ts
│       │   │   └── todo.model.ts
│       │   └── response
│       │       ├── index.ts
│       │       ├── listTodoPagination.response.ts
│       │       └── todo.response.ts
│       ├── dto
│       │   ├── index.ts
│       │   ├── paginationParam.dto.ts
│       │   └── todo.dto.ts
│       ├── entities
│       │   ├── index.ts
│       │   └── todo.entity.ts
│       ├── interface
│       │   ├── payload
│       │   │   └── updateTodo.payload.ts
│       │   └── response
│       │       └── TodoListPagination.ts
│       ├── repository
│       │   ├── index.ts
│       │   └── todo.repository.ts
│       ├── todos.controller.spec.ts
│       ├── todos.controller.ts
│       ├── todos.module.ts
│       ├── todos.service.spec.ts
│       └── todos.service.ts

```
