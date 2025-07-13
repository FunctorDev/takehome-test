import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { DiagnosticModel } from './diagnostic.model';

@Table({
  timestamps: true,
})
export class DiagnosticGroupModel extends Model {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  name: string;

  @HasMany(() => DiagnosticModel)
  diagnostics: DiagnosticModel[];
}
