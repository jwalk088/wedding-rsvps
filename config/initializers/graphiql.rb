
GraphiQL::Rails.config.headers['Authorization'] = -> (context) {
    "Token Graphiql"
}