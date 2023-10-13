import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecludedDomain } from './model/secluded-domain.model';
import { SecludedDomainController } from './secluded-domain.controller';
import { SecludedDomainService } from './secluded-domain.service';

@Module({
  imports: [TypeOrmModule.forFeature([SecludedDomain])],
  controllers: [SecludedDomainController],
  providers: [SecludedDomainService],
})
export class SecludedDomainModule {}
