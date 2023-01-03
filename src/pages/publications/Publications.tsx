import React, { useEffect, useState } from "react";
import Table from "../../components/UI/table/Table";
import Container from "../../components/сontainer/Container";
import cl from "./Publications.module.scss";
import Input from "../../components/UI/input/Input";
import { Publication } from "../../types/types";
import axios from "axios";
import Modal from "../../components/UI/modal/Modal";
import Button from "../../components/UI/button/Button";
import { FaPlusSquare } from "react-icons/fa";

function Publications() {
  const [modal, setModal] = useState<boolean>(false);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [title, setTitle] = useState<string>("");
  const [cost, setCost] = useState<string>("");

  useEffect(() => {
    fetchPublications();
  }, []);

  async function fetchPublications() {
    try {
      const response = await axios.get<Publication[]>(
        "http://localhost:5000/publications"
      );
      setPublications(response.data);
    } catch (e) {
      alert(e);
    }
  }

  async function postPublication() {
    try {
      const response = await axios.post("http://localhost:5000/publications", {
        title,
        cost,
      });
    } catch (e) {
      alert(e);
    }
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
            Add a publication
          </Button>
        </div>
        <Modal visible={modal} setVisible={setModal}>
          <form className={cl.form}>
            {/* <h3 style={{ color: "#fff" }}>Добавление издания</h3> */}
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
          <Table data={publications} headers={["ID", "Title", "Cost"]} />
        </div>
      </Container>
    </section>
  );
}

export default Publications;
