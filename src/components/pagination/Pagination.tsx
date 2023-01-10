import { FC } from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  onChangePage: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  pageCount,
  onChangePage,
}) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={pageCount}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
