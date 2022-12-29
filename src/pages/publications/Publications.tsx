import React from "react";
import Table from "../../components/UI/table/Table";
import Container from "../../components/сontainer/Container";
import db from "../../assets/db.json";
import cl from "./Publications.module.scss";
import Input from "../../components/UI/input/Input";

function Publications() {
  const data = db.publications;
  return (
    <section>
      <Container>
        <h1>Publications</h1>
        <div className={cl.tools}>
          <div>
            <label style={{ display: "flex", alignItems: "center" }}>
              Поиск:
              <Input type="search" />
            </label>
          </div>
          <button>Добавить</button>
        </div>
        <div>
          <Table data={data} headers={["ID", "Title", "Cost"]} />
        </div>
      </Container>
    </section>
  );
}

export default Publications;
