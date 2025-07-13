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
import { DiagnosticModel } from './diagnostic.model';

@Table({
  timestamps: true,
})
export class DiagnosticMetricModel extends Model {
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

  @Column
  units: string;

  @Column
  min_age: number;

  @Column
  max_age: number;

  @Column
  gender: string;

  @Column
  standard_lower: number;

  @Column
  standard_higher: number;

  @Column
  everlab_lower: number;

  @Column
  everlab_higher: number;

  @ForeignKey(() => DiagnosticGroupModel)
  @Column
  diagnostic_group_id: number;

  @ForeignKey(() => DiagnosticModel)
  @Column
  diagnostic_id: number;

  @BelongsTo(() => DiagnosticGroupModel)
  diagnostic_group: DiagnosticGroupModel;

  @BelongsTo(() => DiagnosticModel)
  diagnostic: DiagnosticModel;
}
