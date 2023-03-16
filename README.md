# To Do List

## DEMO
https://elements.getpostman.com/redirect?entityId=17665982-369b7ba9-57d6-4b70-8569-683aa814d828&entityType=collection

http://194.163.180.21/documentation/

## Running

```
Start application - npm run start

Expose ./env/local.app.env and start application - npm run start:local

API documentation will be available on the endpoint GET http://localhost:3002/documentation

OR 

ACCESS 
http://194.163.180.21/api/
http://194.163.180.21/documentation
```
## Database

### MySql
![335956412_886576025760498_5589930675801656828_n](https://user-images.githubusercontent.com/87811387/224975091-cafffcaa-bda7-4a35-a36b-29663fbd4314.png)

![336019315_2333863846795026_6530746572192490288_n](https://user-images.githubusercontent.com/87811387/224975100-055f38cb-17b5-4239-88c7-c0b1f729245e.png)


### Redis
![336209303_594737415581906_8434204677259970474_n](https://user-images.githubusercontent.com/87811387/224975905-bada3c66-41c6-4426-97f9-9015e56beca1.png)




### Structure 
```

├── common
│   ├── apiResponse
│   │   ├── coreResponse.ts
│   │   └── index.ts
│   ├── code
│   │   └── index.ts
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
├── constants
│   ├── apiKey.ts
│   ├── pagination.ts
│   └── redis.ts
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
│   ├── jwt.guard.ts
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
└── modules
    ├── auth
    │   ├── auth.controller.ts
    │   ├── auth.module.ts
    │   ├── auth.service.ts
    │   ├── dto
    │   │   ├── createUser.dto.ts
    │   │   ├── index.ts
    │   │   └── refreshToken.dto.ts
    │   ├── entities
    │   │   ├── apiKey.entity.ts
    │   │   ├── index.ts
    │   │   └── user.entity.ts
    │   ├── interface
    │   │   ├── payloads
    │   │   │   ├── jwt.payload.ts
    │   │   │   └── user.payload.ts
    │   │   ├── requests
    │   │   │   └── requestUser.request.ts
    │   │   └── responses
    │   │       └── reponseLogout.response.ts
    │   ├── passport
    │   │   ├── apiKey.strategy.ts
    │   │   ├── index.ts
    │   │   ├── jwt.strategy.ts
    │   │   └── local.strategy.ts
    │   └── repository
    │       ├── apiKey.repository.ts
    │       ├── index.ts
    │       └── user.repository.ts
    └── todos
        ├── dto
        │   ├── index.ts
        │   ├── paginationParam.dto.ts
        │   └── todo.dto.ts
        ├── entities
        │   ├── index.ts
        │   └── todo.entity.ts
        ├── interface
        │   ├── payload
        │   │   └── updateTodo.payload.ts
        │   └── response
        │       └── TodoListPagination.ts
        ├── repository
        │   ├── index.ts
        │   └── todo.repository.ts
        ├── todos.controller.spec.ts
        ├── todos.controller.ts
        ├── todos.module.ts
        ├── todos.service.spec.ts
        └── todos.service.ts

```
