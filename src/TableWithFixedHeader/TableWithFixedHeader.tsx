import { ReactElement, memo } from 'react';
import { BodyProps, HeadProps, Table, TableProps } from "../"
import classnames from 'classnames';

export type TableWithFixedHeaderProps = TableProps & {
  children: ReactElement<BodyProps | HeadProps>[] | ReactElement<BodyProps | HeadProps>
  fixedTopTitle?: boolean
  fixedLeftColumn?: boolean
}

function TableWithFixedHeader(props: TableWithFixedHeaderProps) {
  const { children, className, fixedLeftColumn, fixedTopTitle, ...otherProps } = props;

  const containerClassname = classnames('table-with-fixed-header', className, {
    'table-with-fixed-header--fixed-top-title': fixedTopTitle,
    'table-with-fixed-header--fixed-left-column': fixedLeftColumn,
  })

  return <div className={containerClassname}>
    <Table
      containerProps={{
        className: "table-with-fixed-header__container",
      }}
      className="table-with-fixed-header"
      {...otherProps}
    >
      {children}
    </Table>
  </div>
}

export default memo(TableWithFixedHeader)