import { ReactNode, ThHTMLAttributes } from "react";
import classnames from 'classnames';
import Cell from "@grossb/react-table/dist/Cell";
import '../styles/HeadCell.scss';

export type HeadCellProps = ThHTMLAttributes<HTMLElement>
  & {
    children?: ReactNode,
    width?: number,
  };

export function HeadCell(props: HeadCellProps) {
  const { children, className: classNameProps, ...rest } = props;

  const className = classnames('head-cell', classNameProps)

  return <Cell component="th" {...rest} className={className}>
    <div className="head-cell__content">
      {children}
    </div>
  </Cell>
}

export default HeadCell;