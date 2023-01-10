import React, { useEffect, useState } from "react";
import Table from "../../components/UI/table/Table";
import Container from "../../components/сontainer/Container";
import cl from "./Publications.module.scss";
import Input from "../../components/UI/input/Input";
import Modal from "../../components/UI/modal/Modal";
import Button from "../../components/UI/button/Button";
import Service from "../../API/Serviсe";
import Tools from "../../components/tools/Tools";
import Pagination from "../../components/pagination/Pagination";
import { Publication } from "../../types/types";

function Publications() {
  const [publications, setPublications] = useState<Publication[]>([]);

  const [modalCreatePublication, setModalCreatePublication] =
    useState<boolean>(false);
  const [modalDeletePublication, setModalDeletePublication] =
    useState<boolean>(false);
  const [modalUpdatePublication, setModalUpdatePublication] =
    useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<boolean>(false);

  const [titlePublication, setTitlePublication] = useState<string>("");
  const [costPublication, setCostPublication] = useState<string>("");
  const [initialTitlePublication, setInitialTitlePublication] =
    useState<string>("");
  const [initialCostPublication, setInitialCostPublication] =
    useState<string>("");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [id, setId] = useState<string | number>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const [limit, setLimit] = useState<number>(8);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    fetchPublications();
  }, []);

  useEffect(() => {
    fetchPublications();
  }, [currentPage, searchQuery]);

  async function fetchPublications() {
    const data = await Service.getAll(
      "publications",
      currentPage,
      limit,
      searchQuery.toLowerCase()
    );
    setPublications(data.publications);
    setPageCount(parseInt(data.numberOfPages));
  }

  async function createPublication() {
    setMessage(
      await Service.createItem("publications", {
        titlePublication,
        costPublication,
      })
    );
    setModalMessage(true);
  }

  async function deletePublication() {
    setMessage(await Service.deleteItem("publications", id));
    setModalMessage(true);
  }

  async function updatePublication() {
    setMessage(
      await Service.updateItem("publications", {
        id,
        titlePublication,
        costPublication,
      })
    );
    setModalMessage(true);
  }

  async function handleCreatePublication(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    await createPublication();
    setModalCreatePublication(false);
    await fetchPublications();
  }
  function handleOpenModalCreatePublication() {
    setId("");
    setTitlePublication("");
    setCostPublication("");
    setModalCreatePublication(true);
  }

  function handleOpenModalDeletePublication(id: string | number) {
    setModalDeletePublication(true);
    setId(id);
  }

  function handleOpenModalUpdatePublication(
    id: string | number,
    title: string,
    cost: string
  ) {
    setInitialCostPublication(cost);
    setInitialTitlePublication(title);

    setId(id);
    setTitlePublication(title);
    setCostPublication(cost);

    setModalUpdatePublication(true);
  }
  console.log(initialCostPublication);
  async function handleDeletePublication() {
    await deletePublication();
    setModalDeletePublication(false);
    await fetchPublications();
  }

  function handleDeletePublicationCancel() {
    setModalDeletePublication(false);
  }

  function handleCreatePublicationCancel() {
    setModalCreatePublication(false);
  }

  async function handleUpdatePublication() {
    await updatePublication();
    setModalUpdatePublication(false);
    await fetchPublications();
  }

  function handleUpdatePublicationCancel() {
    setModalUpdatePublication(false);
  }
  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section>
      <Modal visible={modalMessage} setVisible={setModalMessage}>
        <h3>Message</h3>
        <p>{message}</p>
        <div className={cl.modalBtns}>
          <Button onClick={() => setModalMessage(false)}>Ok</Button>
        </div>
      </Modal>
      <Modal
        visible={modalDeletePublication}
        setVisible={setModalDeletePublication}
      >
        <h3>Message</h3>
        <p>Are you sure you want to delete this entry?</p>
        <div className={cl.modalBtns}>
          <Button onClick={() => handleDeletePublication()}>Delete</Button>
          <Button onClick={() => handleDeletePublicationCancel()}>
            Cancel
          </Button>
        </div>
      </Modal>
      <Modal
        visible={modalCreatePublication}
        setVisible={setModalCreatePublication}
      >
        <h3>Creating the new entry</h3>
        <form>
          <div>
            <label>
              <p>Title:</p>
              <Input
                value={titlePublication}
                onChange={(e) => setTitlePublication(e.target.value)}
              />
            </label>
            <label>
              <p>Cost:</p>
              <Input
                value={costPublication}
                onChange={(e) => setCostPublication(e.target.value)}
              />
            </label>
          </div>
          <div className={cl.modalBtns}>
            {costPublication === "" || titlePublication === "" ? (
              <Button disabled onClick={(e) => handleCreatePublication(e)}>
                Create
              </Button>
            ) : (
              <Button onClick={(e) => handleCreatePublication(e)}>
                Create
              </Button>
            )}
            <Button onClick={() => handleCreatePublicationCancel()}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      <Modal
        visible={modalUpdatePublication}
        setVisible={setModalUpdatePublication}
      >
        <h3>Update the entry</h3>
        <form>
          <div>
            <label>
              <p>Title:</p>
              <Input
                value={titlePublication}
                onChange={(e) => setTitlePublication(e.target.value)}
              />
            </label>
            <label>
              <p>Cost:</p>
              <Input
                value={costPublication}
                onChange={(e) => setCostPublication(e.target.value)}
              />
            </label>
          </div>
          <div className={cl.modalBtns}>
            {titlePublication === "" ||
            costPublication === "" ||
            (costPublication == initialCostPublication &&
              titlePublication === initialTitlePublication) ? (
              <Button disabled onClick={() => handleUpdatePublication()}>
                Update
              </Button>
            ) : (
              <Button onClick={() => handleUpdatePublication()}>Update</Button>
            )}
            <Button onClick={() => handleUpdatePublicationCancel()}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      <Container>
        <h1>Publications table</h1>
        <Tools
          openModalAdd={handleOpenModalCreatePublication}
          update={fetchPublications}
          setQuery={setSearchQuery}
        />
        <div className={cl.table}>
          <Table
            data={publications}
            headers={["Index", "Title", "Cost"]}
            deleteItem={handleOpenModalDeletePublication}
            updateItem={handleOpenModalUpdatePublication}
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
}

export default Publications;
