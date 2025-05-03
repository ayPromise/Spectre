import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserResolver } from './graphql/resolvers/UserResolver';
import { AuthResolver } from './graphql/resolvers/AuthResolver';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // to use .env vars globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // default apollo playground is going to be deprecated
      graphiql: true,

      // where to generate schemes
      autoSchemaFile: 'src/scheme.gql',
      sortSchema: true,
    }),

    // enabling jwt
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
        },
      }),
    }),
  ],
  providers: [UserResolver, AuthResolver],
  controllers: [],
})
export class AppModule {}
