# Swagger UI generated server

## Overview
This server was taken from the `dist` folder in [Swagger-UI](https://github.com/swagger-api/swagger-ui) project. You can easily get a server stub.

### Running the server
To run the server, put this swagger folder in your web server. If your server is a common apache instalation, you can see the Swagger UI:

```
open http://localhost/swagger
```

### Test API online
To view the Swagger UI interface:

```
open http://138.68.9.12:8080/
```

Note: You should first call `/auth` service to get access token for rest of API endpoints. This access token must be sent as a HTTP header:

```
Authorization: Bearer <ACCESS_TOKEN>
```

Read Swagger Specification [here](https://swagger.io/specification/).
