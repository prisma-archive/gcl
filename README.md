# GCL: GraphQL Configuration Language

GCL is intended to be a type-safe alternative to JSON, YAML (...) based on the `input` type syntax of GraphQL

## Advantages

* Autocompletion & validation for configuration files
* Out-of-the-box documentation for config DSLs
* Easy schema definition through SDL for tooling authors
* Leverages available GraphQL tooling (parsers etc) for cross-language adoption

## Example ([Demo](https://faker-beciuwtbrg.now.sh/?query=%7B%0A%20%20docker(gcl%3A%20%7B%0A%20%20%20%20%0A%20%20%20%20%23%20Notice%20that%20the%20%60docker(gcl%3A%20%7B%7D)%60%20wrapper%20should%20be%20left%20out%20when%20writing%20GCL%0A%20%20%20%20image%3A%20%22node%3A6.10%22%0A%20%20%20%20ports%3A%20%5B%2280%22%5D%0A%20%20%20%20networks%3A%20%5B%22frontend%22%5D%0A%20%20%20%20deploy%3A%20%7B%0A%20%20%20%20%20%20replicas%3A%202%0A%20%20%20%20%20%20update_config%3A%20%7B%0A%20%20%20%20%20%20%20%20parallelism%3A%202%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20restart_policy%3A%20%7B%0A%20%20%20%20%20%20%20%20condition%3A%20OnFailure%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20%0A%20%20%20%20%0A%20%20%7D)%0A%7D))

> This example shows a configuration [DSL for Docker images](https://docs.docker.com/compose/compose-file/#compose-file-structure-and-examples)

### Config File

Config files have the `.gcl` file extension

```
image: "node:6.10"
ports: ["80"]
networks: ["frontend"]
deploy: {
  replicas: 2
  update_config: {
    parallelism: 2
  }
  restart_policy: {
    condition: OnFailure
  }
}
```

### Schema

The schema is specified by `input` types. The `Root` type is the "root" of the configuration schema.

```
input Root {
  image: String
  ports: [String!]
  networks: [String!]
  depends_on: [String!]
  volumes: [String!]
  deploy: Deploy
}

input Deploy {
  replicas: Int
  update_config: DeployUpdateConfig
  restart_policy: DeployRestartPolicy
}

input DeployUpdateConfig {
  parallelism: Int
}

enum DeployRestartPolicyCondition {
  OnFailure
}

input DeployRestartPolicy {
  condition: DeployRestartPolicyCondition
}
```

## TODO

- [ ] Decide on "Add back top level curly brackets #1"
- [ ] PoC based on GraphiQL for auto-completion (removing the top-level query)
- [ ] Integrate with [graphql-language-service](https://github.com/graphql/graphql-language-service)


## GraphQL changes that would enhance GCL

* Multi-line strings ([PR](https://github.com/facebook/graphql/pull/327))
