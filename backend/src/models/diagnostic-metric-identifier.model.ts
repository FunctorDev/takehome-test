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
import { DiagnosticMetricModel } from './diagnostic-metric.model';

export enum TYPE {
  ORU_SONIC = 'oru_sonic',
  SYSTEM = 'system',
}

@Table({
  timestamps: true,
})
export class DiagnosticMetricIdentifierModel extends Model {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @Column({
    type: DataType.ENUM({
      values: Object.values(TYPE),
    }),
    allowNull: false,
  })
  type: string;

  @Column
  code: string;

  @Column
  unit: string;

  @ForeignKey(() => DiagnosticMetricModel)
  @Column
  diagnostic_metric_id: number;

  @BelongsTo(() => DiagnosticMetricModel)
  diagnostic_metric: DiagnosticMetricModel;
}
