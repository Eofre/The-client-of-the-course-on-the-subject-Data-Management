import React, { useEffect, useState } from "react";
import Table from "../../components/UI/table/Table";
import Container from "../../components/сontainer/Container";
import cl from "./Publications.module.scss";
import Input from "../../components/UI/input/Input";
import { Publication } from "../../types/types";
import Modal from "../../components/UI/modal/Modal";
import Button from "../../components/UI/button/Button";
import Service from "../../API/Serviсe";

function Publications() {
  const [modal, setModal] = useState<boolean>(false);
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [title, setTitle] = useState<string>("");
  const [cost, setCost] = useState<string>("");
  const [itemDeleteId, setItemDeleteId] = useState<string | number>("");

  useEffect(() => {
    fetchPublications();
  }, []);

  async function fetchPublications() {
    const publications = await Service.getAll("publications");
    setPublications(publications);
  }

  async function postPublication() {
    await Service.createItem("publications", { title, cost });
  }

  async function deletePublicationApi(id: string | number) {
    await Service.deleteItem("publications", id);
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
            data={publications}
            headers={["ID", "Title", "Cost"]}
          />
        </div>
      </Container>
    </section>
  );
}

export default Publications;
