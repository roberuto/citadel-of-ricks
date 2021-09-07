# THE CITADEL OF RICKS

Demo application for talk https://uszanowanko.tsh.io/event/szacunek-ludzi-it-od-ponad-6-lat/
Two services (auth, characters) was build base on https://github.com/TheSoftwareHouse/express-boilerplate

## Install

Install dependencies in all services

```
npm install
```

```
npm run bootstrap
```

## Start

Start all services:

```
npm run start-services
```

Start API gateway

```
npm run start-gateway
```

## Start with composed supergraph

Generate subgraphs for each service

```
npm run schema-generate
```

Compose supergraph

```
npm run schema-compose
```

Set env to producion on API gateway

```
NODE_ENV=production
```

Fallow start section

## Start with apollo studio

Add env variables to each services from Apollo Studio

```
APOLLO_KEY= #access_token
APOLLO_GRAPH_REF= #graph_id
```

Enable manage mode in API gateway with env variable

```
ENABLE_MANAGED_FEDERATION=true
```

Push all subgraphs to Apollo Studio

```
npm run schema-upload
```

Fallow start section
