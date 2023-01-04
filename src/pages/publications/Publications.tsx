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
  const [publications, setPublications] = useState<Publication[]>([]);
  const [title, setTitle] = useState<string>("");
  const [cost, setCost] = useState<string>("");

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

  async function deletePublication(id: string | number) {
    await Service.deleteItem("publications", id);
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
        <Modal visible={modal} setVisible={setModal}>
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
              Add a publication
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
