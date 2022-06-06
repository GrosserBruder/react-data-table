import { ReactNode, HTMLAttributes } from "react";
import classnames from 'classnames';

export type RowProps = HTMLAttributes<HTMLTableRowElement> & {
  children?: ReactNode[] | ReactNode,
};

export default function Row(props: RowProps) {
  const { children, ...rest } = props;
  const className = classnames('row', props.className)
  return <tr {...rest} className={className}>
    {children}
  </tr>
}