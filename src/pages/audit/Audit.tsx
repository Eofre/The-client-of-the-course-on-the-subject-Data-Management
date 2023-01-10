import { FC, useEffect, useState } from "react";
import Service from "../../API/Serviсe";
import Pagination from "../../components/pagination/Pagination";
import Tools from "../../components/tools/Tools";
import Table from "../../components/UI/table/Table";
import Container from "../../components/сontainer/Container";
import styles from "./Audit.module.scss";

interface AuditProps {}

const Audit: FC<AuditProps> = () => {
  const [auditList, setAuditList] = useState([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const [limit, setLimit] = useState<number>(6);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchAuditList();
  }, []);

  useEffect(() => {
    fetchAuditList();
  }, [currentPage, searchQuery]);

  async function fetchAuditList() {
    const data = await Service.getAll("audit", currentPage, limit, searchQuery);
    setAuditList(data.events);
    setPageCount(parseInt(data.numberOfPages));
  }

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <section>
      <Container>
        <h1>Audit table</h1>
        <Tools setQuery={setSearchQuery} />
        <div className={styles.table}>
          <Table
            data={auditList}
            headers={["ID", "Name", "Time", "Edited by"]}
          />
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            onChangePage={onChangePage}
          />
        </div>
      </Container>
    </section>
  );
};

export default Audit;
