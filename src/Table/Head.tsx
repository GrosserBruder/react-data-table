import { ReactNode, HTMLAttributes, forwardRef, ForwardedRef } from "react";
import classnames from 'classnames';

export type HeadProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode[] | ReactNode,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Head(props: HeadProps, ref: ForwardedRef<any>) {
  const { children, ...rest } = props;
  const className = classnames('head', props.className)
  return <thead {...rest} ref={ref} className={className}>
    {children}
  </thead>
}

const DefaultHead = forwardRef(Head)
DefaultHead.displayName = 'Head'

export default DefaultHead