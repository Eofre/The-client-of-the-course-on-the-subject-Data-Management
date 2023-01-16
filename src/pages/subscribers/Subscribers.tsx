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
import Pagination from "../../components/pagination/Pagination";

function Subscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  const [modalCreateSubscriber, setModalCreateSubscriber] =
    useState<boolean>(false);
  const [modalDeleteSubscriber, setModalDeleteSubscriber] =
    useState<boolean>(false);
  const [modalUpdateSubscriber, setModalUpdateSubscriber] =
    useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<boolean>(false);

  const [fullName, setFullName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [initialFullName, setInitialTFullName] = useState<string>("");
  const [initialAddress, setInitialAddress] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const [limit, setLimit] = useState<number>(8);
  const [message, setMessage] = useState<string>("");

  const [isSubscribersLoading, setIsSubscribersLoading] =
    useState<boolean>(false);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  useEffect(() => {
    fetchSubscribers();
  }, [currentPage, searchQuery]);

  async function fetchSubscribers() {
    setIsSubscribersLoading(true);
    const data = await Service.getAll(
      "subscribers",
      currentPage,
      limit,
      searchQuery.toLowerCase()
    );
    setSubscribers(data.subscribers);
    setPageCount(parseInt(data.numberOfPages));
    setIsSubscribersLoading(false);
  }

  async function createSubscriber() {
    setMessage(
      await Service.createItem("subscribers", {
        fullName,
        address,
      })
    );
    setModalMessage(true);
  }

  async function deleteSubscriber() {
    setMessage(await Service.deleteItem("subscribers", id));
    setModalMessage(true);
  }

  async function updateSubscriber() {
    setMessage(
      await Service.updateItem("subscribers", { id, fullName, address })
    );
    setModalMessage(true);
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

  function handleOpenModalDeleteSubscriber(item: Subscriber) {
    setModalDeleteSubscriber(true);
    setId(item.ID);
  }

  function handleOpenModalUpdateSubscriber(item: Subscriber) {
    setId(item.ID);
    setFullName(item.FullName);
    setAddress(item.Address);

    setInitialAddress(item.Address);
    setInitialTFullName(item.FullName);

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
        visible={modalDeleteSubscriber}
        setVisible={setModalDeleteSubscriber}
      >
        <h3>Message</h3>
        <p>Are you sure you want to delete this entry?</p>
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
        <form>
          <div>
            <label>
              <p>Name:</p>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </label>
            <label>
              <p>Address:</p>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
          </div>
          <div className={cl.modalBtns}>
            {address === "" || fullName === "" ? (
              <Button disabled onClick={(e) => handleCreateSubscriber(e)}>
                Create
              </Button>
            ) : (
              <Button onClick={(e) => handleCreateSubscriber(e)}>Create</Button>
            )}
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
          <div>
            <label
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <p>Name:</p>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </label>
            <label>
              <p>Address:</p>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
          </div>

          <div className={cl.modalBtns}>
            {fullName === "" ||
            address === "" ||
            (fullName === initialFullName && address === initialAddress) ? (
              <Button disabled onClick={() => handleUpdateSubscriber()}>
                Update
              </Button>
            ) : (
              <Button onClick={() => handleUpdateSubscriber()}>Update</Button>
            )}
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
        <div className={cl.table}>
          <Table
            data={subscribers}
            headers={["ID", "Full name", "Address"]}
            deleteItem={handleOpenModalDeleteSubscriber}
            updateItem={handleOpenModalUpdateSubscriber}
            isLoading={isSubscribersLoading}
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

export default Subscribers;
