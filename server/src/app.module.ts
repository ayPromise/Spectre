import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserResolver } from './graphql/resolvers/UserResolver';

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
  providers: [UserResolver],
  controllers: [],
})
export class AppModule {}
