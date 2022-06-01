import { ReactNode, useState } from "react";
import classnames from 'classnames';
import Cell, { CellProps } from "./Cell";

export type EditableCellProps = CellProps & {
  className?: string
  children: ReactNode,
  editComponent: ReactNode,
  onDoubleClick?: () => void;
  onBlur?: () => void;
}

export default function EditableCell(props: EditableCellProps) {
  const { children, editComponent, onDoubleClick, onBlur, ...rest } = props;
  const [isEdit, setIsEdit] = useState(false);
  const className = classnames('editable-cell', props.className, {
    'editable-cell-editing': isEdit
  })
  return <Cell
    {...rest}
    className={className}
    onDoubleClick={() => {
      setIsEdit(true)
      onDoubleClick?.();
    }}
    onBlur={() => {
      setIsEdit(false)
      onBlur?.()
    }}
  >
    <div >
      {isEdit ? editComponent : children}
    </div>
  </Cell>
}