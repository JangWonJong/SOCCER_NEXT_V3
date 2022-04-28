import style from '@/styles/Layout.module.css'
import { Table, Pagination, Modal} from '@/components'

export function Layout({ children }){
  return (<div className={style.container}>
        <main className={style.main}>{children}</main>
        <Table></Table>
        <Pagination/>
        <Modal/>
      </div>
  );
}
