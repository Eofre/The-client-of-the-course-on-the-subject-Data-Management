import React, { useEffect, useState } from "react";
import Table from "../../components/UI/table/Table";
import Container from "../../components/сontainer/Container";
import cl from "./Subscriptions.module.scss";
import Input from "../../components/UI/input/Input";
import { Publication, Subscriber, Subscription } from "../../types/types";
import Tools from "../../components/tools/Tools";
import Service from "../../API/Serviсe";
import Button from "../../components/UI/button/Button";
import Modal from "../../components/UI/modal/Modal";
import Pagination from "../../components/pagination/Pagination";

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);

  const [modalCreateSubscription, setModalCreateSubscription] =
    useState<boolean>(false);
  const [modalDeleteSubscription, setModalDeleteSubscription] =
    useState<boolean>(false);
  const [modalUpdateSubscription, setModalUpdateSubscription] =
    useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<boolean>(false);

  const [idSubscriber, setIdSubscriber] = useState<string>("");
  const [indexPublication, setIndexPublication] = useState<string>("");
  const [monthOfSub, setMonthOfSub] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [idEntry, setIdEntry] = useState<string>("");

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [initialIdSubscriber, setInitialIdSubscriber] = useState<string>("");
  const [initialIndexPublication, setInitialIndexPublication] =
    useState<string>("");
  const [initialMonthOfSub, setInitialMonthOfSub] = useState<string>("");
  const [initialStartDate, setInitialStartDate] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [pageCount, setPageCount] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [message, setMessage] = useState<string>("");

  const [isSubscriptionsLoading, setIsSubscriptionsLoading] =
    useState<boolean>(false);

  useEffect(() => {
    fetchSubscriptions();
  }, []);
  useEffect(() => {
    fetchPublications();
  }, []);

  useEffect(() => {
    fetchSubscriptions();
  }, [currentPage, searchQuery]);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  async function fetchSubscriptions() {
    setIsSubscriptionsLoading(true);
    const data = await Service.getAll(
      "subscriptions",
      currentPage,
      limit,
      searchQuery.toLowerCase()
    );
    setSubscriptions(data.subscriptions);
    setPageCount(parseInt(data.numberOfPages));
    setIsSubscriptionsLoading(false);
  }

  async function fetchSubscribers() {
    const data = await Service.getAll("subscribers", 1, 0, "");
    setSubscribers(data);
    console.log(data);
  }
  async function fetchPublications() {
    const data = await Service.getAll("publications", 1, 0, "");
    setPublications(data);
    console.log(data);
  }

  async function createSubscription() {
    setMessage(
      await Service.createItem("subscriptions", {
        indexPublication,
        idSubscriber,
        monthOfSub,
        startDate,
      })
    );
    setModalMessage(true);
  }

  async function deleteSubscription() {
    setMessage(await Service.deleteItem("subscriptions", idEntry));
    setModalMessage(true);
  }

  async function updateSubscription() {
    setMessage(
      await Service.updateItem("subscriptions", {
        indexPublication,
        idSubscriber,
        monthOfSub,
        startDate,
      })
    );
    setModalMessage(true);
  }

  async function handleCreateSubscription(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();

    await createSubscription();
    setModalCreateSubscription(false);
    await fetchSubscriptions();
  }

  function handleOpenModalCreateSubscription() {
    setIndexPublication(publications[0].Index);
    setIdSubscriber(subscribers[0].ID);
    setMonthOfSub("");
    setStartDate("");
    setModalCreateSubscription(true);
  }

  function handleOpenModalDeleteSubscription(item: Subscription) {
    setModalDeleteSubscription(true);
    setIdEntry(item.idEntry);
    console.log(item.idEntry);
  }

  function handleOpenModalUpdateSubscription(item: Subscription) {
    setIndexPublication(item.Index);
    setIdSubscriber(item.ID);
    setMonthOfSub(item.MonthOfSub);
    setStartDate(item.StartDate);

    setInitialIndexPublication(item.Index);
    setInitialIdSubscriber(item.ID);
    setInitialMonthOfSub(item.MonthOfSub);
    setInitialStartDate(item.StartDate);

    setModalUpdateSubscription(true);
  }

  async function handleDeleteSubscription() {
    await deleteSubscription();
    setModalDeleteSubscription(false);
    await fetchSubscriptions();
  }

  function handleDeleteSubscriptionCancel() {
    setModalDeleteSubscription(false);
  }

  function handleCreateSubscriptionCancel() {
    setModalCreateSubscription(false);
  }

  async function handleUpdateSubscription() {
    await updateSubscription();
    setModalUpdateSubscription(false);
    await fetchSubscriptions();
  }

  function handleUpdateSubscriptionCancel() {
    setModalUpdateSubscription(false);
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
        visible={modalDeleteSubscription}
        setVisible={setModalDeleteSubscription}
      >
        <h3>Message</h3>
        <p>Are you sure you want to delete this entry?</p>
        <div className={cl.modalBtns}>
          <Button onClick={() => handleDeleteSubscription()}>Delete</Button>
          <Button onClick={() => handleDeleteSubscriptionCancel()}>
            Cancel
          </Button>
        </div>
      </Modal>
      <Modal
        visible={modalCreateSubscription}
        setVisible={setModalCreateSubscription}
      >
        <h3>Creating the new entry</h3>
        <form>
          <div>
            <label>
              <p>Publications index:</p>
              <select
                value={indexPublication}
                onChange={(e) => setIndexPublication(e.target.value)}
              >
                {publications.map((item, index) => (
                  <option key={item.Index} value={item.Index}>
                    {item.Index} | {item.NamePublication} | {item.Cost}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <p>Subscribers id:</p>
              <select
                value={idSubscriber}
                onChange={(e) => setIdSubscriber(e.target.value)}
              >
                {subscribers.map((item, index) => (
                  <option key={item.ID} value={item.ID}>
                    {item.ID} | {item.FullName} | {item.Address}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <p>Subscription months:</p>
              <Input
                value={monthOfSub}
                onChange={(e) => setMonthOfSub(e.target.value)}
              />
            </label>
            <label>
              <p>Start date:</p>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
          </div>
          <div className={cl.modalBtns}>
            {idSubscriber === "" ||
            indexPublication === "" ||
            monthOfSub === "" ||
            startDate === "" ? (
              <Button disabled onClick={(e) => handleCreateSubscription(e)}>
                Create
              </Button>
            ) : (
              <Button onClick={(e) => handleCreateSubscription(e)}>
                Create
              </Button>
            )}
            <Button onClick={() => handleCreateSubscriptionCancel()}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      <Modal
        visible={modalUpdateSubscription}
        setVisible={setModalUpdateSubscription}
      >
        <h3>Update the entry</h3>
        <form className={cl.form}>
          <div>
            <label>
              <p>Publications index:</p>
              <select
                value={indexPublication}
                onChange={(e) => setIndexPublication(e.target.value)}
              >
                {publications.map((item, index) => (
                  <option key={item.Index} value={item.Index}>
                    {item.Index} | {item.NamePublication} | {item.Cost}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <p>Subscribers id:</p>
              <select
                value={idSubscriber}
                onChange={(e) => setIdSubscriber(e.target.value)}
              >
                {subscribers.map((item, index) => (
                  <option key={item.ID} value={item.ID}>
                    {item.ID} | {item.FullName} | {item.Address}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <p>Subscription months:</p>
              <Input
                value={monthOfSub}
                onChange={(e) => setMonthOfSub(e.target.value)}
              />
            </label>
            <label>
              <p>Start date:</p>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
          </div>

          <div className={cl.modalBtns}>
            {idSubscriber === "" ||
            indexPublication === "" ||
            monthOfSub === "" ||
            startDate === "" ||
            (idSubscriber === initialIdSubscriber &&
              indexPublication === initialIndexPublication &&
              monthOfSub === initialMonthOfSub &&
              startDate === initialStartDate) ? (
              <Button disabled onClick={() => handleUpdateSubscription()}>
                Update
              </Button>
            ) : (
              <Button onClick={() => handleUpdateSubscription()}>Update</Button>
            )}
            <Button onClick={() => handleUpdateSubscriptionCancel()}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      <Container>
        <h1>Subscriptions table</h1>
        <Tools
          openModalAdd={handleOpenModalCreateSubscription}
          update={fetchSubscriptions}
          setQuery={setSearchQuery}
        />
        <div className={cl.table}>
          <Table
            data={subscriptions}
            headers={[
              "Index",
              "ID",
              "Subscription months",
              "Start date",
              "ID entry",
            ]}
            deleteItem={handleOpenModalDeleteSubscription}
            updateItem={handleOpenModalUpdateSubscription}
            isLoading={isSubscriptionsLoading}
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

export default Subscriptions;
