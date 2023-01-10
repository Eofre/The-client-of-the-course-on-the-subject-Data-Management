import React, { useEffect, useState } from "react";
import Table from "../../components/UI/table/Table";
import Container from "../../components/сontainer/Container";
import cl from "./Subscriptions.module.scss";
import Input from "../../components/UI/input/Input";
import Service from "../../API/Serviсe";
import Tools from "../../components/tools/Tools";
import Modal from "../../components/UI/modal/Modal";
import Button from "../../components/UI/button/Button";

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [index, setIndex] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [monthOfSub, setMonthOfSub] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [modalCreateSubscription, setModalCreateSubscription] =
    useState<boolean>(false);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  async function fetchSubscriptions() {
    const subscriptions = await Service.getAll("subscriptions");
    setSubscriptions(subscriptions);
  }

  async function createSubscription() {
    await Service.createItem("subscriptions", {
      index,
      id,
      monthOfSub,
      startDate,
    });
  }

  async function handleCreateSubscription(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    await createSubscription();
    setModalCreateSubscription(false);
    await fetchSubscriptions();
  }

  function handleOpenModalCreateSubscription() {
    setId("");
    setIndex("");
    setMonthOfSub("");
    setStartDate("");
    setModalCreateSubscription(true);
  }

  function handleCreateSubscriptionCancel() {
    setModalCreateSubscription(false);
  }
  return (
    <section>
      <Modal
        visible={modalCreateSubscription}
        setVisible={setModalCreateSubscription}
      >
        <h3>Creating the new entry</h3>
        <form className={cl.form}>
          <label>
            Publication index:
            <Input value={index} onChange={(e) => setIndex(e.target.value)} />
          </label>
          <label style={{}}>
            Subscriber ID:
            <Input value={id} onChange={(e) => setId(e.target.value)} />
          </label>
          <label>
            Number of subscription months:
            <Input
              value={monthOfSub}
              onChange={(e) => setMonthOfSub(e.target.value)}
            />
          </label>
          <label>
            Subscription start date:
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="2023-01-07"
            />
          </label>
          <div className={cl.modalBtns}>
            <Button onClick={(e) => handleCreateSubscription(e)}>Create</Button>
            <Button onClick={() => handleCreateSubscriptionCancel()}>
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
        />
        <div>
          <Table
            data={subscriptions}
            headers={["Index", "ID", "Month of subscription", "Start date"]}
          />
        </div>
      </Container>
    </section>
  );
}

export default Subscriptions;
