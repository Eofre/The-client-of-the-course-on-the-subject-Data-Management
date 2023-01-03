import React, { useEffect, useState } from "react";
import Table from "../../components/UI/table/Table";
import Container from "../../components/сontainer/Container";
import cl from "./Subscribers.module.scss";
import Input from "../../components/UI/input/Input";
import { Publication, Subscriber } from "../../types/types";
import axios from "axios";

function Subscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    fetchPublications();
  }, []);

  async function fetchPublications() {
    try {
      const response = await axios.get<Subscriber[]>(
        "http://localhost:5000/subscribers"
      );
      setSubscribers(response.data);
      console.log(response.data);
    } catch (e) {
      alert(e);
    }
  }

  return (
    <section>
      <Container>
        <h1>Subscribers</h1>
        <div>
          <Table data={subscribers} headers={["ID", "Full name", "Address"]} />
        </div>
      </Container>
    </section>
  );
}

export default Subscribers;
