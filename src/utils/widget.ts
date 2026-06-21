import { Vector } from './DataType';



export interface WidgetAppearanceInfo {
  position_id: Vector;
  size_id: Vector;
  position: Vector;
  size: Vector;
  name: string;
}

export interface WidgetStateInfo {
  position: Vector;
  size: Vector;
}

export type WidgetInfo = WidgetAppearanceInfo & WidgetStateInfo;