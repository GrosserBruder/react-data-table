import { ReactNode, HTMLAttributes, forwardRef, ForwardedRef } from "react";
import classnames from 'classnames';

export type BodyProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode[] | ReactNode,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Body(props: BodyProps, ref: ForwardedRef<any>) {
  const { children, ...rest } = props;
  const className = classnames('body', props.className)
  return <tbody {...rest} ref={ref} className={className}>
    {children}
  </tbody>
}

const DefaultBody = forwardRef(Body);
DefaultBody.displayName = 'Body'

export default DefaultBody;