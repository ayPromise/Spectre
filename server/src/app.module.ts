import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserResolver } from './graphql/resolvers/UserResolver';
import { AuthResolver } from './graphql/resolvers/AuthResolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // default apollo playground is going to be deprecated
      graphiql: true,

      // where to generate schemes
      autoSchemaFile: 'src/scheme.gql',
      sortSchema: true,
    }),
  ],
  providers: [UserResolver, AuthResolver],
  controllers: [],
})
export class AppModule {}
