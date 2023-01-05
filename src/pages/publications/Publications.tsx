import React, { useEffect, useState } from "react";
import Table from "../../components/UI/table/Table";
import Container from "../../components/сontainer/Container";
import cl from "./Publications.module.scss";
import Input from "../../components/UI/input/Input";
import { Publication } from "../../types/types";
import Modal from "../../components/UI/modal/Modal";
import Button from "../../components/UI/button/Button";
import Service from "../../API/Serviсe";
import { FaSearch } from "react-icons/fa";

function Publications() {
  const [modal, setModal] = useState<boolean>(false);
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [modalUpdate, setModalUpdate] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [publications, setPublications] = useState([]);
  const [title, setTitle] = useState<string>("");
  const [cost, setCost] = useState<string>("");
  const [id, setID] = useState<string | number>("");
  const [itemDeleteId, setItemDeleteId] = useState<string | number>("");
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    fetchPublications();
  }, []);

  useEffect(() => {
    searchPublications();
  }, [query]);

  async function fetchPublications() {
    const publications = await Service.getAll("publications");
    setPublications(publications);
  }

  async function searchPublications() {
    const publications = await Service.search(
      "publications",
      query.toLowerCase()
    );
    setPublications(publications);
  }

  async function postPublication() {
    await Service.createItem("publications", { title, cost });
  }

  async function updatePublicationApi() {
    await Service.updateItem("publications", { id, title, cost });
  }

  async function deletePublicationApi(id: string | number) {
    await Service.deleteItem("publications", id);
  }
  function updatePublication() {
    updatePublicationApi();
    setModalUpdate(false);
    setTitle("");
    setCost("");
  }
  function deletePublication(id: string | number) {
    setModalDelete(true);
    setItemDeleteId(id);
  }

  function onClickDelete() {
    deletePublicationApi(itemDeleteId);
    setModalDelete(false);
    setItemDeleteId("");
  }
  function onClickCancel() {
    setModalDelete(false);
    setItemDeleteId("");
  }

  function createPublication(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    postPublication();
    setModal(false);
    setTitle("");
    setCost("");
  }

  return (
    <section>
      <Container>
        <h1>Publications</h1>
        <div className={cl.tools}>
          <div className={cl.search}>
            <FaSearch className={cl.searchIcon} />
            <Input
              className={cl.searchInp}
              type="search"
              placeholder="Enter a query (For example: Family)"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button className={cl.btn} onClick={() => fetchPublications()}>
            Update
          </Button>
          <Button className={cl.btn} onClick={() => setModal(true)}>
            Add
          </Button>
        </div>
        <Modal visible={modalDelete} setVisible={setModalDelete}>
          <h3>Are you sure you want to delete this entry?</h3>
          <div className={cl.modalBtns}>
            <Button onClick={() => onClickDelete()}>Delete</Button>
            <Button onClick={() => onClickCancel()}>Cancel</Button>
          </div>
        </Modal>
        <Modal visible={modal} setVisible={setModal}>
          <h3>Creating the new entry</h3>
          <form className={cl.form}>
            <label
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              Title:
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginTop: "7px",
              }}
            >
              Cost:
              <Input value={cost} onChange={(e) => setCost(e.target.value)} />
            </label>
            <Button
              style={{ marginTop: "15px" }}
              onClick={(e) => createPublication(e)}
            >
              Add the publication
            </Button>
          </form>
        </Modal>
        <div>
          <Table
            deleteItem={deletePublication}
            updateItem={updatePublication}
            data={publications}
            headers={["Index", "Title", "Cost"]}
          />
        </div>
      </Container>
      {/* <div className={cl.help}>
        <h3>Help</h3>
        <p>To change a cell, click on it twice with the left mouse button</p>
      </div> */}
    </section>
  );
}

export default Publications;
