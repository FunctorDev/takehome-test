import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { DiagnosticGroupModel } from './diagnostic-group.model';

@Table({
  timestamps: true,
})
export class DiagnosticModel extends Model {
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

  @ForeignKey(() => DiagnosticGroupModel)
  @Column
  diagnostic_group_id: number;

  @BelongsTo(() => DiagnosticGroupModel)
  diagnostic_group: DiagnosticGroupModel;
}
