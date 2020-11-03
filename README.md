# Employee CRUD

## Local running

you need the AWS amplify CLI installed first which is

```
npm install -g @aws-amplify/cli
```

then navigate to the root directory of the project folder and run

```
amplify init
```

with the default options selected. For local testing purposes, I'd create a local GraphQL server
to run the app against that instead of using the official appsync/amplify one. So run

```
amplify mock api
```

to get a local server running and then

```
npm start
```

and thats it! run queries directly with the localhost link they give you when creating
the local server to check against the frontend or just play around with the frontend, have fun!
