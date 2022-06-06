import { forwardRef, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from "react";
import classnames from 'classnames';

export type CellProps = TdHTMLAttributes<HTMLElement>
  & ThHTMLAttributes<HTMLElement>
  & {
    children?: ReactNode,
    component?: 'td' | 'th',
    maxLength?: number,
  };

function Cell(props: CellProps, ref: any) {
  const { component: Component = 'td', children, ...rest } = props;
  const className = classnames('cell', props.className)
  return <Component ref={ref} {...rest} className={className}>
    {children}
  </Component>
}

export default forwardRef(Cell)