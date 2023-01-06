import React, { useEffect, useState } from "react";
import Table from "../../components/UI/table/Table";
import Container from "../../components/сontainer/Container";
import cl from "./Subscribers.module.scss";
import Input from "../../components/UI/input/Input";
import { Publication, Subscriber } from "../../types/types";
import Tools from "../../components/tools/Tools";
import Service from "../../API/Serviсe";
import Button from "../../components/UI/button/Button";
import Modal from "../../components/UI/modal/Modal";

function Subscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [modalCreateSubscriber, setModalCreateSubscriber] =
    useState<boolean>(false);
  const [modalDeleteSubscriber, setModalDeleteSubscriber] =
    useState<boolean>(false);
  const [modalUpdateSubscriber, setModalUpdateSubscriber] =
    useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [id, setId] = useState<string | number>("");

  useEffect(() => {
    fetchSubscribers();
  }, []);

  useEffect(() => {
    searchSubscribers();
  }, [searchQuery]);

  async function fetchSubscribers() {
    const subscribers = await Service.getAll("subscribers");
    setSubscribers(subscribers);
  }

  async function createSubscriber() {
    await Service.createItem("subscribers", {
      fullName,
      address,
    });
  }

  async function searchSubscribers() {
    const subscribers = await Service.search(
      "subscribers",
      searchQuery.toLowerCase()
    );
    setSubscribers(subscribers);
  }

  async function deleteSubscriber() {
    await Service.deleteItem("subscribers", id);
  }

  async function updateSubscriber() {
    await Service.updateItem("subscribers", { id, fullName, address });
  }

  async function handleCreateSubscriber(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    await createSubscriber();
    setModalCreateSubscriber(false);
    await fetchSubscribers();
  }
  function handleOpenModalCreateSubscriber() {
    setId("");
    setAddress("");
    setFullName("");
    setModalCreateSubscriber(true);
  }

  function handleOpenModalDeleteSubscriber(id: string | number) {
    setModalDeleteSubscriber(true);
    setId(id);
  }

  function handleOpenModalUpdateSubscriber(
    id: string | number,
    fullName: string,
    address: string
  ) {
    setId(id);
    setFullName(fullName);
    setAddress(address);
    setModalUpdateSubscriber(true);
  }

  async function handleDeleteSubscriber() {
    await deleteSubscriber();
    setModalDeleteSubscriber(false);
    await fetchSubscribers();
  }

  function handleDeleteSubscriberCancel() {
    setModalDeleteSubscriber(false);
  }

  function handleCreateSubscriberCancel() {
    setModalCreateSubscriber(false);
  }

  async function handleUpdateSubscriber() {
    await updateSubscriber();
    setModalUpdateSubscriber(false);
    await fetchSubscribers();
  }

  function handleUpdateSubscriberCancel() {
    setModalUpdateSubscriber(false);
  }

  return (
    <section>
      <Modal
        visible={modalDeleteSubscriber}
        setVisible={setModalDeleteSubscriber}
      >
        <h3>Are you sure you want to delete this entry?</h3>
        <div className={cl.modalBtns}>
          <Button onClick={() => handleDeleteSubscriber()}>Delete</Button>
          <Button onClick={() => handleDeleteSubscriberCancel()}>Cancel</Button>
        </div>
      </Modal>
      <Modal
        visible={modalCreateSubscriber}
        setVisible={setModalCreateSubscriber}
      >
        <h3>Creating the new entry</h3>
        <form className={cl.form}>
          <label>
            Full name:
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </label>
          <label>
            Address:
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <div className={cl.modalBtns}>
            <Button onClick={(e) => handleCreateSubscriber(e)}>Create</Button>
            <Button onClick={() => handleCreateSubscriberCancel()}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      <Modal
        visible={modalUpdateSubscriber}
        setVisible={setModalUpdateSubscriber}
      >
        <h3>Update the entry</h3>
        <form className={cl.form}>
          <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            Full name:
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </label>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginTop: "7px",
            }}
          >
            Address:
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <div className={cl.modalBtns}>
            <Button onClick={() => handleUpdateSubscriber()}>Update</Button>
            <Button onClick={() => handleUpdateSubscriberCancel()}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      <Container>
        <h1>Subscribers table</h1>
        <Tools
          openModalAdd={handleOpenModalCreateSubscriber}
          update={fetchSubscribers}
          setQuery={setSearchQuery}
        />
        <div>
          <Table
            data={subscribers}
            headers={["ID", "Full name", "Address"]}
            deleteItem={handleOpenModalDeleteSubscriber}
            updateItem={handleOpenModalUpdateSubscriber}
          />
        </div>
      </Container>
    </section>
  );
}

export default Subscribers;
